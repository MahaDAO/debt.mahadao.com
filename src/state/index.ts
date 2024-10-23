import { configureStore } from "@reduxjs/toolkit";
import { load, save } from "redux-localstorage-simple";
import { createLogger } from "redux-logger";

import { isProduction } from "../analytics/Mixpanel";
import application from "./application/reducer";
import transactions from "./transactions/reducer";
import token from "./token/reducer";

const PERSISTED_KEYS: string[] = ["transactions", "slippage"];

const store = configureStore({
  reducer: {
    application,
    transactions,
    token,
  },
  middleware: (getDefaultMiddleware: any) => {
    return isProduction
      ? getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(
          save({ states: PERSISTED_KEYS })
        )
      : getDefaultMiddleware({ serializableCheck: false, thunk: false })
          .concat(save({ states: PERSISTED_KEYS }))
          .concat(createLogger());
  },
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
