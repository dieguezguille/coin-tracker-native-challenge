import coinGeckoReducer from "@/features/coin-gecko/coinGeckoSlice";
import myAssetsReducer from "@/features/my-assets/myAssetsSlice";
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
import { coinGeckoApi } from "@/features/coin-gecko/services/coinGeckoApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const persistCoinGeckoConfig = {
  key: "coinGecko",
  storage: AsyncStorage,
};

const persistMyAssetsConfig = {
  key: "myAssets",
  storage: AsyncStorage,
};

const persistedCoinGeckoReducer = persistReducer(
  persistCoinGeckoConfig,
  coinGeckoReducer
);

const persistedMyAssetsReducer = persistReducer(
  persistMyAssetsConfig,
  myAssetsReducer
);

export const store = configureStore({
  reducer: {
    [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
    coinGecko: persistedCoinGeckoReducer,
    myAssets: persistedMyAssetsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(coinGeckoApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
