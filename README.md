## О проекте GALAXY SPACESHIP

Учебный командный проект, разработанный в рамках курса Мидл фронтенд разработчик
Реализация веб-игры, похожей на Space Invaders или Arkanoid

### Стек технологий

* TypeScript
* React
* React Router
* Material UI
* Formik
* Yup
* RTK Query
* Redux Toolkit
* Redux Persist
* Express
* Postgres
* Sequelize
* Axios
* Jest
* OAuth
* Docker
* Yandex Cloud
* Prettier
* Eslint
* Vite
* Service Workers
* SSR

### Используемые Web API
* `Canvas API` - основа игры
* `Web Audio API` - для звукового сопровождения игры
* `Fullscreen API` - для возможности играть в FullScreen режиме
* `Drag and Drop API` - для удобства загрузки аватара в профиль
* `Cache API` - кэширование файлов для работы offline

### Реализованный функционал

* Игра с ее механикой
* Бэкенд и фронтенд форума, возможность создавать топики и комментарии к ним, оставлять реакции
* Бэкенд и фронтенд темизации, возможность переключения темы и сохранение ее на сервере
* Авторизация и регистрация пользователя через backend Яндекса
* Возможность просмотра и извменения профиля через бэкенд Яндекса
* Просмотр и обновление рейтинга игроков
* Возможность играть offline

## Запуск проекта
### Как запускать через docker?

1. Убедитесь что у вас установлен `node` больше 16 версии и `docker`
2. Выполните команду `yarn bootstrap`
3. Выполните команду `docker compose build`
3. Выполните команду `docker compose up`
4. Вы великолепны!

### Как запускать SSR вручную?
Для development:
1. `cd packages/client`
2. `yarn build:ssr`
3. `yarn build`
4. `cd ../server`
5. `yarn dev`
Открыть в браузере http://localhost:8000/

Для production:
1. `cd packages/client`
2. `yarn build:ssr`
3. `yarn build`
4. `cd ../server`
5. `yarn build`
6. `yarn preview`
Открыть в браузере http://localhost:8000/

### Как запускать Backend вручную?

После 3 пункта верхних инструкций делаем следующее:
1. В корне проекта вызываем `docker compose up postgres`
2. Переходим в папку сервера `cd packages/server`
3. Накатываем миграции `node migrate up`
4. Далее следуем по верхним инструкциям


### Запуск тестов

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

Для тестирования введите команду ```yarn test```

Наши тесты написаны на снапшотах, поэтому если написано что-то новое (обычно в верстке) - необходимо обновить нужный снапшот.
Есть два варианта:
```cd packages/client```
```yarn test:file **/{название файла с тестом} -u```
Или в интерактивном режиме:
```cd packages/client```
```yarn test --watch```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```
