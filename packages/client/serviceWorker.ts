/// <reference lib="WebWorker" />
/// <reference types="vite/client" />

export type {};
declare const self: ServiceWorkerGlobalScope;

const CACHE_VERSION = "v0.0.1";
const CACHE_PREFIX = "cosmostars-cache";
const CACHE_NAME = `${CACHE_PREFIX}:${CACHE_VERSION}`;
const TIMEOUT = 4000;
const URLS = import.meta.glob([
  "/index.html",
  "/src/**",
  "!/src/**/**/__snapshots__",
  "!/src/**/**/__mocks__",
]);
const STATIC = Object.keys(URLS);

enum AcceptedTypes {
  HTML = "text/html",
  CSS = "text/css",
  IMAGE = "image",
  JS = "application/javascript",
}

const addResourcesToCache = async (resources: RequestInfo[]) => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(resources);
  } catch (error) {
    console.log(`Add resources error: ${error}`);
  }
};

const canPutInCache = (request: Request, response: Response) => {
  const isNotOk = response.status !== 200;
  const isNotBasic = response.type !== "basic";
  const isHttp = request.url.startsWith("http");
  const isChrome = request.url.startsWith("chrome-extension");

  return !response || isNotOk || isNotBasic || isHttp || isChrome;
};

const putInCache = async (request: Request, response: Response) => {
  if (canPutInCache(request, response)) return;

  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const removeFromCache = async () => {
  const keyList = await caches.keys();
  const cacheKeeplist = [CACHE_NAME];
  const filteredKeyList = keyList
    .filter(key => cacheKeeplist.indexOf(key) === -1)
    .map(cache => caches.delete(cache));

  return Promise.all(filteredKeyList);
};

const getFromNetwork = (request: Request) =>
  new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(
      () => reject(new Error("Connection error!")),
      TIMEOUT
    );

    const fetchData = async () => {
      try {
        const response = await fetch(request);
        clearTimeout(timeoutId);
        fulfill(response);
      } catch (err) {
        reject(err);
      }
    };

    fetchData();
  });

const getFromCache = async (request: Request) => {
  try {
    const cache = await caches.open(CACHE_NAME);
    const matching = await cache.match(request);

    return matching;
  } catch (error) {
    return error;
  }
};

const fromNetworkFirst = async (request: Request) => {
  try {
    const responseFromNetwork = await getFromNetwork(request);
    await putInCache(request, (responseFromNetwork as Response).clone());

    return responseFromNetwork;
  } catch (error) {
    console.log(`Can't get data from nerwork. Reason ${error}`);
    const cache = await getFromCache(request);
    return cache;
  }
};

const fromCacheFirst = async (request: Request) => {
  const cache = await getFromCache(request);
  if (cache) {
    return cache;
  }
  const responseFromNetwork = await getFromNetwork(request);
  return responseFromNetwork;
};

self.addEventListener("install", (event: ExtendableEvent) => {
  console.log("Service Worker installing...");
  event.waitUntil(addResourcesToCache(STATIC));
});

self.addEventListener("activate", (event: ExtendableEvent) => {
  console.log("Service Worker activating...");
  event.waitUntil(removeFromCache());
});

self.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event;
  const acceptHeader = request.headers.get("Accept");

  if (
    acceptHeader?.includes(AcceptedTypes.HTML) ||
    acceptHeader?.includes(AcceptedTypes.CSS) ||
    acceptHeader?.includes(AcceptedTypes.JS)
  ) {
    event.respondWith(fromNetworkFirst(request));
  } else if (acceptHeader?.includes(AcceptedTypes.IMAGE)) {
    event.respondWith(fromCacheFirst(request));
  }
});
