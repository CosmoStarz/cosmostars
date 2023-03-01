const CACHE_VERSION = "v0.0.1";
const CACHE_PREFIX = "cosmostars-cache";
const CACHE_NAME = `${CACHE_PREFIX}:${CACHE_VERSION}`;
const TIMEOUT = 4000;
const URLS = import.meta.glob(["/index.html", "/src/app/index.css", "./src/assets/images/*.*"]);
const STATIC = Object.keys(URLS);

const addResourcesToCache = async (resources) => {
    try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(resources);
    } catch (error) {
        console.log(`Add resources error: ${error}`);
    }
};

const canPutInCache = (request, response) => {
    const isNotOk = response.status !== 200;
    const isNotBasic = response.type !== "basic";
    const isHttp = request.url.startsWith("http");
    const isChrome = request.url.startsWith("chrome-extension");

    return !response || isNotOk || isNotBasic || isHttp || isChrome;
};

const putInCache = async (request, response) => {
    if (canPutInCache(request, response)) return;

    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response);
};

const removeFromCache = async () => {
    const keyList = await caches.keys();
    const cacheKeeplist = [CACHE_NAME];
    const filteredKeyList = keyList
        .filter((key) => cacheKeeplist.indexOf(key) === -1)
        .map((cache) => caches.delete(cache))
    
    return Promise.all(filteredKeyList);
};

const getFromNetwork = (request) => (
    new Promise((fulfill, reject) => {
      let timeoutId;
  
      const fetchData = async() => {
        try {
          const response = await fetch(request);
          clearTimeout(timeoutId);
          fulfill(response);
        } catch (err) {
          reject(err);
        }
      }
  
      timeoutId = setTimeout(() => reject(new Error("Connection error!")), TIMEOUT);
      fetchData();
    })
);

const getFromCache = async (request) => {
    try {
        const cache = await caches.open(CACHE_NAME);
        const matching = await cache.match(request);

        return matching;
    } catch (error) {
        return error;
    }
};

const fromNetworkFirst = async (request) => {
    try {
        const responseFromNetwork = await getFromNetwork(request);
        await putInCache(request, responseFromNetwork.clone());

        return responseFromNetwork;
    } catch (error) {
        console.log(`Can't get data from nerwork. Reason ${error}`);
        const cache = await getFromCache(request);
        return cache;
    }
};

const fromCacheFirst = async (request) => {
    const cache = await getFromCache(request);
    if (cache) {
        return cache;
    }
    const responseFromNetwork = await getFromNetwork(request);
    return responseFromNetwork;
};

this.addEventListener("install", (event) => {
    console.log("Service Worker installing...");
    event.waitUntil(addResourcesToCache(STATIC));
});

this.addEventListener("activate", (event) => {
    console.log("Service Worker activating...");
    event.waitUntil(removeFromCache());
});

this.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.headers.get("Accept").includes("text/html") || request.headers.get("Accept").includes("text/css")) {
        event.respondWith(fromNetworkFirst(request));
    } else if (request.headers.get("Accept").includes("image")) {
        event.respondWith(fromCacheFirst(request));
    }
});
