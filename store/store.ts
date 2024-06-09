import coinGeckoReducer from "@/features/coin-gecko/coinGeckoSlice";
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

const persistCoinGeckoConfig = {
  key: "coinGecko",
  storage: AsyncStorage,
};

const persistedCoinGeckoReducer = persistReducer(
  persistCoinGeckoConfig,
  coinGeckoReducer
);

export const store = configureStore({
  reducer: {
    coinGecko: persistedCoinGeckoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
