import { reducer, store } from "./index";

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
