/// <reference lib="WebWorker" />
/// <reference types="vite/client" />

const CACHE_VERSION = "v0.0.1";
const CACHE_PREFIX = "cosmostars-cache";
const CACHE_NAME = `${CACHE_PREFIX}:${CACHE_VERSION}`;
const TIMEOUT = 4000;
// const URLS = import.meta.glob([
//   "/index.html",
//   "/src/**",
//   "!**/__snapshots__",
//   "!**/__mocks__",
//   "!**.test.tsx",
//   "!**.d.ts",
//   "!**/types.ts",
// ]);
// TODO: придумать, что можно сделать с этим безобразием, import.meta в prod не работает
const URLS = Object.assign({
  "/index.html": () => import("/index.html?import"),
  "/src/app/index.css": () => import("/src/app/index.css"),
  "/src/app/index.tsx": () => import("/src/app/index.tsx"),
  "/src/app/store/index.ts": () => import("/src/app/store/index.ts"),
  "/src/assets/images/bg-dark.png": () =>
    import("/src/assets/images/bg-dark.png?import"),
  "/src/assets/images/bg-light.png": () =>
    import("/src/assets/images/bg-light.png?import"),
  "/src/assets/images/game-model-enemy-projectile.png": () =>
    import("/src/assets/images/game-model-enemy-projectile.png?import"),
  "/src/assets/images/game-model-enemy.png": () =>
    import("/src/assets/images/game-model-enemy-1.png?import"),
  "/src/assets/images/game-model-explosion.png": () =>
    import("/src/assets/images/game-model-explosion.png?import"),
  "/src/assets/images/game-model-player-projectile.png": () =>
    import("/src/assets/images/game-model-player-projectile.png?import"),
  "/src/assets/images/game-model-player.png": () =>
    import("/src/assets/images/game-model-player.png?import"),
  "/src/assets/images/loose-modal-bottom-left.png": () =>
    import("/src/assets/images/loose-modal-bottom-left.png?import"),
  "/src/assets/images/loose-modal-top-right.png": () =>
    import("/src/assets/images/loose-modal-top-right.png?import"),
  "/src/assets/images/win-modal-bottom-left.png": () =>
    import("/src/assets/images/win-modal-bottom-left.png?import"),
  "/src/assets/images/win-modal-top-right.png": () =>
    import("/src/assets/images/win-modal-top-right.png?import"),
  "/src/assets/sounds/background.ogg": () =>
    import("/src/assets/sounds/background.ogg?import"),
  "/src/assets/sounds/explosion.wav": () =>
    import("/src/assets/sounds/explosion.wav?import"),
  "/src/assets/sounds/gameover.wav": () =>
    import("/src/assets/sounds/gameover.wav?import"),
  "/src/assets/sounds/shot.wav": () =>
    import("/src/assets/sounds/shot.wav?import"),
  "/src/assets/sounds/win.wav": () =>
    import("/src/assets/sounds/win.wav?import"),
  "/src/entities/game/controller/GameController/GameController.ts": () =>
    import("/src/entities/game/controller/GameController/GameController.ts"),
  "/src/entities/game/controller/GameLoop/GameLoop.ts": () =>
    import("/src/entities/game/controller/GameLoop/GameLoop.ts"),
  "/src/entities/game/controller/initGame.ts": () =>
    import("/src/entities/game/controller/initGame.ts"),
  "/src/entities/game/model/BaseObject/BaseObject.ts": () =>
    import("/src/entities/game/model/BaseObject/BaseObject.ts"),
  "/src/entities/game/model/EnemyGrid/EnemyGrid.ts": () =>
    import("/src/entities/game/model/EnemyGrid/EnemyGrid.ts"),
  "/src/entities/game/model/Player/Player.ts": () =>
    import("/src/entities/game/model/Player/Player.ts"),
  "/src/entities/game/model/ShootingObject/ShootingObject.ts": () =>
    import("/src/entities/game/model/ShootingObject/ShootingObject.ts"),
  "/src/entities/game/model/Star/Star.ts": () =>
    import("/src/entities/game/model/Star/Star.ts"),
  "/src/entities/game/model/store/gameSlice.ts": () =>
    import("/src/entities/game/model/store/gameSlice.ts"),
  "/src/entities/game/model/store/selectors.ts": () =>
    import("/src/entities/game/model/store/selectors.ts"),
  "/src/entities/game/ui/Canvas/Canvas.ts": () =>
    import("/src/entities/game/ui/Canvas/Canvas.ts"),
  "/src/entities/game/ui/GameListeners/GameListeners.ts": () =>
    import("/src/entities/game/ui/GameListeners/GameListeners.ts"),
  "/src/entities/game/ui/Sound/BufferLoader.ts": () =>
    import("/src/entities/game/ui/Sound/BufferLoader.ts"),
  "/src/entities/game/ui/Sound/Sound.ts": () =>
    import("/src/entities/game/ui/Sound/Sound.ts"),
  "/src/entities/game/ui/Sprite/Sprite.ts": () =>
    import("/src/entities/game/ui/Sprite/Sprite.ts"),
  "/src/entities/game/ui/Sprite/SpriteConfig.ts": () =>
    import("/src/entities/game/ui/Sprite/SpriteConfig.ts"),
  "/src/entities/leaderboard/api/api.ts": () =>
    import("/src/entities/leaderboard/api/api.ts"),
  "/src/entities/leaderboard/api/index.ts": () =>
    import("/src/entities/leaderboard/api/index.ts"),
  "/src/entities/leaderboard/api/types/backend.ts": () =>
    import("/src/entities/leaderboard/api/types/backend.ts"),
  "/src/entities/leaderboard/api/types/frontend.ts": () =>
    import("/src/entities/leaderboard/api/types/frontend.ts"),
  "/src/entities/leaderboard/api/types/index.ts": () =>
    import("/src/entities/leaderboard/api/types/index.ts"),
  "/src/entities/notification/config.ts": () =>
    import("/src/entities/notification/config.ts"),
  "/src/entities/notification/index.ts": () =>
    import("/src/entities/notification/index.ts"),
  "/src/entities/notification/notificationMiddleware.ts": () =>
    import("/src/entities/notification/notificationMiddleware.ts"),
  "/src/entities/notification/notificationSlice.ts": () =>
    import("/src/entities/notification/notificationSlice.ts"),
  "/src/entities/notification/selectors.ts": () =>
    import("/src/entities/notification/selectors.ts"),
  "/src/entities/user/model/api.ts": () =>
    import("/src/entities/user/model/api.ts"),
  "/src/entities/user/model/converters.ts": () =>
    import("/src/entities/user/model/converters.ts"),
  "/src/entities/user/model/user.ts": () =>
    import("/src/entities/user/model/user.ts"),
  "/src/features/AddTopic/AddTopic.tsx": () =>
    import("/src/features/AddTopic/AddTopic.tsx"),
  "/src/features/Auth/Logout/index.ts": () =>
    import("/src/features/Auth/Logout/index.ts"),
  "/src/features/Auth/Logout/ui.tsx": () =>
    import("/src/features/Auth/Logout/ui.tsx"),
  "/src/features/Auth/SignIn/index.ts": () =>
    import("/src/features/Auth/SignIn/index.ts"),
  "/src/features/Auth/SignIn/ui.tsx": () =>
    import("/src/features/Auth/SignIn/ui.tsx"),
  "/src/features/Auth/SignUp/index.ts": () =>
    import("/src/features/Auth/SignUp/index.ts"),
  "/src/features/Auth/SignUp/ui.tsx": () =>
    import("/src/features/Auth/SignUp/ui.tsx"),
  "/src/features/Auth/YanedxOAuth/index.ts": () =>
    import("/src/features/Auth/YanedxOAuth/index.ts"),
  "/src/features/Auth/YanedxOAuth/ui.tsx": () =>
    import("/src/features/Auth/YanedxOAuth/ui.tsx"),
  "/src/features/Auth/YanedxOAuth/utils.ts": () =>
    import("/src/features/Auth/YanedxOAuth/utils.ts"),
  "/src/features/Auth/schemas/sign-in/index.ts": () =>
    import("/src/features/Auth/schemas/sign-in/index.ts"),
  "/src/features/Auth/schemas/sign-up/index.ts": () =>
    import("/src/features/Auth/schemas/sign-up/index.ts"),
  "/src/features/GameModalImage/GameModalImage.tsx": () =>
    import("/src/features/GameModalImage/GameModalImage.tsx"),
  "/src/features/MenuLink/MenuLink.tsx": () =>
    import("/src/features/MenuLink/MenuLink.tsx"),
  "/src/features/MenuLink/types.tsx": () =>
    import("/src/features/MenuLink/types.tsx"),
  "/src/features/MuteSound/MuteSound.tsx": () =>
    import("/src/features/MuteSound/MuteSound.tsx"),
  "/src/features/Profile/change-avatar/index.ts": () =>
    import("/src/features/Profile/change-avatar/index.ts"),
  "/src/features/Profile/change-avatar/ui.tsx": () =>
    import("/src/features/Profile/change-avatar/ui.tsx"),
  "/src/features/Profile/change-password/index.ts": () =>
    import("/src/features/Profile/change-password/index.ts"),
  "/src/features/Profile/change-password/ui.tsx": () =>
    import("/src/features/Profile/change-password/ui.tsx"),
  "/src/features/Profile/change-profile/index.ts": () =>
    import("/src/features/Profile/change-profile/index.ts"),
  "/src/features/Profile/change-profile/ui.tsx": () =>
    import("/src/features/Profile/change-profile/ui.tsx"),
  "/src/features/Profile/schemas/change-avatar/index.ts": () =>
    import("/src/features/Profile/schemas/change-avatar/index.ts"),
  "/src/features/Profile/schemas/change-password/index.ts": () =>
    import("/src/features/Profile/schemas/change-password/index.ts"),
  "/src/features/Profile/schemas/change-profile/index.ts": () =>
    import("/src/features/Profile/schemas/change-profile/index.ts"),
  "/src/features/ThemeToggler/ThemeToggler.tsx": () =>
    import("/src/features/ThemeToggler/ThemeToggler.tsx"),
  "/src/features/TopicItem/TopicItem.tsx": () =>
    import("/src/features/TopicItem/TopicItem.tsx"),
  "/src/features/TypographyButton/TypographyButton.tsx": () =>
    import("/src/features/TypographyButton/TypographyButton.tsx"),
  "/src/main.tsx": () => import("/src/main.tsx"),
  "/src/pages/ForumPage/ForumPage.tsx": () =>
    import("/src/pages/ForumPage/ForumPage.tsx"),
  "/src/pages/ForumPage/index.ts": () =>
    import("/src/pages/ForumPage/index.ts"),
  "/src/pages/ForumTopicPage/ForumTopicPage.tsx": () =>
    import("/src/pages/ForumTopicPage/ForumTopicPage.tsx"),
  "/src/pages/ForumTopicPage/index.ts": () =>
    import("/src/pages/ForumTopicPage/index.ts"),
  "/src/pages/GamePage/GamePage.tsx": () =>
    import("/src/pages/GamePage/GamePage.tsx"),
  "/src/pages/GamePage/index.ts": () => import("/src/pages/GamePage/index.ts"),
  "/src/pages/LeaderboardPage/LeaderboardPage.tsx": () =>
    import("/src/pages/LeaderboardPage/LeaderboardPage.tsx"),
  "/src/pages/LeaderboardPage/index.ts": () =>
    import("/src/pages/LeaderboardPage/index.ts"),
  "/src/pages/MainPage/MainPage.tsx": () =>
    import("/src/pages/MainPage/MainPage.tsx"),
  "/src/pages/MainPage/index.ts": () => import("/src/pages/MainPage/index.ts"),
  "/src/pages/NotFoundPage/NotFoundPage.tsx": () =>
    import("/src/pages/NotFoundPage/NotFoundPage.tsx"),
  "/src/pages/NotFoundPage/index.ts": () =>
    import("/src/pages/NotFoundPage/index.ts"),
  "/src/pages/ProfilePage/index.tsx": () =>
    import("/src/pages/ProfilePage/index.tsx"),
  "/src/pages/sign-in/index.tsx": () => import("/src/pages/sign-in/index.tsx"),
  "/src/pages/sign-up/index.tsx": () => import("/src/pages/sign-up/index.tsx"),
  "/src/pages/tests/factories.tsx": () =>
    import("/src/pages/tests/factories.tsx"),
  "/src/router/Router.tsx": () => import("/src/router/Router.tsx"),
  "/src/router/index.ts": () => import("/src/router/index.ts"),
  "/src/router/modes/GuestMode/GuestMode.tsx": () =>
    import("/src/router/modes/GuestMode/GuestMode.tsx"),
  "/src/router/modes/GuestMode/index.ts": () =>
    import("/src/router/modes/GuestMode/index.ts"),
  "/src/router/modes/PrivateMode/PrivateMode.tsx": () =>
    import("/src/router/modes/PrivateMode/PrivateMode.tsx"),
  "/src/router/modes/PrivateMode/index.ts": () =>
    import("/src/router/modes/PrivateMode/index.ts"),
  "/src/shared/api/auth/auth.ts": () => import("/src/shared/api/auth/auth.ts"),
  "/src/shared/api/auth/index.ts": () =>
    import("/src/shared/api/auth/index.ts"),
  "/src/shared/api/auth/models.ts": () =>
    import("/src/shared/api/auth/models.ts"),
  "/src/shared/api/index.ts": () => import("/src/shared/api/index.ts"),
  "/src/shared/api/oauth/oauth.ts": () =>
    import("/src/shared/api/oauth/oauth.ts"),
  "/src/shared/api/utils.ts": () => import("/src/shared/api/utils.ts"),
  "/src/shared/api/yandexApi.ts": () => import("/src/shared/api/yandexApi.ts"),
  "/src/shared/config/index.ts": () => import("/src/shared/config/index.ts"),
  "/src/shared/constants/api.ts": () => import("/src/shared/constants/api.ts"),
  "/src/shared/constants/error-messages.ts": () =>
    import("/src/shared/constants/error-messages.ts"),
  "/src/shared/constants/formInitials.ts": () =>
    import("/src/shared/constants/formInitials.ts"),
  "/src/shared/constants/index.tsx": () =>
    import("/src/shared/constants/index.tsx"),
  "/src/shared/constants/leaderboard.ts": () =>
    import("/src/shared/constants/leaderboard.ts"),
  "/src/shared/constants/mocks.ts": () =>
    import("/src/shared/constants/mocks.ts"),
  "/src/shared/constants/validation-regex.ts": () =>
    import("/src/shared/constants/validation-regex.ts"),
  "/src/shared/constants/validationShemas.ts": () =>
    import("/src/shared/constants/validationShemas.ts"),
  "/src/shared/hooks/store.ts": () => import("/src/shared/hooks/store.ts"),
  "/src/shared/hooks/useAuth.ts": () => import("/src/shared/hooks/useAuth.ts"),
  "/src/shared/hooks/useBasicTheme.tsx": () =>
    import("/src/shared/hooks/useBasicTheme.tsx"),
  "/src/shared/layouts/BasicLayout.tsx": () =>
    import("/src/shared/layouts/BasicLayout.tsx"),
  "/src/shared/layouts/MainLayout.tsx": () =>
    import("/src/shared/layouts/MainLayout.tsx"),
  "/src/shared/ui/Card/index.tsx": () =>
    import("/src/shared/ui/Card/index.tsx"),
  "/src/shared/ui/Loader/index.tsx": () =>
    import("/src/shared/ui/Loader/index.tsx"),
  "/src/shared/ui/index.ts": () => import("/src/shared/ui/index.ts"),
  "/src/shared/utils/ErrorBoundary/ErrorBoundary.tsx": () =>
    import("/src/shared/utils/ErrorBoundary/ErrorBoundary.tsx"),
  "/src/shared/utils/configureUrl.ts": () =>
    import("/src/shared/utils/configureUrl.ts"),
  "/src/shared/utils/createThemeOptions.tsx": () =>
    import("/src/shared/utils/createThemeOptions.tsx"),
  "/src/shared/utils/functions.ts": () =>
    import("/src/shared/utils/functions.ts"),
  "/src/shared/utils/initServiceWorker.ts": () =>
    import("/src/shared/utils/initServiceWorker.ts"),
  "/src/widgets/AdditionalMenu/AdditionalMenu.tsx": () =>
    import("/src/widgets/AdditionalMenu/AdditionalMenu.tsx"),
  "/src/widgets/Forum/Forum.tsx": () => import("/src/widgets/Forum/Forum.tsx"),
  "/src/widgets/GameModal/GameModal.tsx": () =>
    import("/src/widgets/GameModal/GameModal.tsx"),
  "/src/widgets/GameModal/types.tsx": () =>
    import("/src/widgets/GameModal/types.tsx"),
  "/src/widgets/Leaderboard/Leaderboard.tsx": () =>
    import("/src/widgets/Leaderboard/Leaderboard.tsx"),
  "/src/widgets/Leaderboard/config.ts": () =>
    import("/src/widgets/Leaderboard/config.ts"),
  "/src/widgets/Leaderboard/index.ts": () =>
    import("/src/widgets/Leaderboard/index.ts"),
  "/src/widgets/Leaderboard/ui/PlayerInfo.tsx": () =>
    import("/src/widgets/Leaderboard/ui/PlayerInfo.tsx"),
  "/src/widgets/Leaderboard/ui/Table.tsx": () =>
    import("/src/widgets/Leaderboard/ui/Table.tsx"),
  "/src/widgets/Leaderboard/ui/TableBody.tsx": () =>
    import("/src/widgets/Leaderboard/ui/TableBody.tsx"),
  "/src/widgets/Leaderboard/ui/TableFooter.tsx": () =>
    import("/src/widgets/Leaderboard/ui/TableFooter.tsx"),
  "/src/widgets/Leaderboard/ui/TableHead.tsx": () =>
    import("/src/widgets/Leaderboard/ui/TableHead.tsx"),
  "/src/widgets/Leaderboard/ui/TableHeadCell.tsx": () =>
    import("/src/widgets/Leaderboard/ui/TableHeadCell.tsx"),
  "/src/widgets/Leaderboard/ui/TableRow.tsx": () =>
    import("/src/widgets/Leaderboard/ui/TableRow.tsx"),
  "/src/widgets/Leaderboard/ui/index.ts": () =>
    import("/src/widgets/Leaderboard/ui/index.ts"),
  "/src/widgets/Leaderboard/utils.ts": () =>
    import("/src/widgets/Leaderboard/utils.ts"),
  "/src/widgets/MainMenu/MainMenu.tsx": () =>
    import("/src/widgets/MainMenu/MainMenu.tsx"),
  "/src/widgets/Notification/Notification.tsx": () =>
    import("/src/widgets/Notification/Notification.tsx"),
  "/src/widgets/Notification/index.ts": () =>
    import("/src/widgets/Notification/index.ts"),
  "/src/widgets/Profile/Profile.tsx": () =>
    import("/src/widgets/Profile/Profile.tsx"),
});

const STATIC = Object.keys(URLS);

const AcceptedTypes = {
  HTML: "text/html",
  CSS: "text/css",
  IMAGE: "image",
  JS: "application/javascript",
};

const addResourcesToCache = async resources => {
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
    .filter(key => cacheKeeplist.indexOf(key) === -1)
    .map(cache => caches.delete(cache));

  return Promise.all(filteredKeyList);
};

const getFromNetwork = request =>
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

const getFromCache = async request => {
  try {
    const cache = await caches.open(CACHE_NAME);
    const matching = await cache.match(request);

    return matching;
  } catch (error) {
    return error;
  }
};

const fromNetworkFirst = async request => {
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

const fromCacheFirst = async request => {
  const cache = await getFromCache(request);
  if (cache) {
    return cache;
  }
  const responseFromNetwork = await getFromNetwork(request);
  return responseFromNetwork;
};

self.addEventListener("install", event => {
  console.log("Service Worker installing...");
  event.waitUntil(addResourcesToCache(STATIC));
});

self.addEventListener("activate", event => {
  console.log("Service Worker activating...");
  self.clients.claim();
  event.waitUntil(removeFromCache());
});

self.addEventListener("fetch", event => {
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
