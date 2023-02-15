import { store } from "./index";

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
