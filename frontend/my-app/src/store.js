import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/UserSlice";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import ExpenseReducer from './features/ExpenseSlice'
import CustomReducer from './features/CustomSlice'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const userPersistConfig = {
  key: "userDetail",
  storage,
  whiteList: ["userName", "token"],
};
const persistUserReducer = persistReducer(userPersistConfig, UserReducer);
const store = configureStore({
  reducer: {
    UserInfo: persistUserReducer,
    expenseInfo: ExpenseReducer,
    CustomInfo:CustomReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
