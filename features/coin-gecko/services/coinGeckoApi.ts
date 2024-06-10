import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CoinGeckoAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: string | null;
  last_updated: string;
  price_change_percentage_1h: number;
}

export interface GetAssetsWithMarketData {
  page?: number;
  perPage?: number;
  currency?: string;
  orderBy?: string;
  precision?: number;
}

export interface CoinGeckoAssetChartData {
  prices: Array<Array<number>>;
  market_caps: Array<Array<number>>;
  total_volumes: Array<Array<number>>;
}

export interface GetAssetWithMarketDataByIdParams {
  id: string;
  currency?: string;
  startAt?: number;
  endAt?: number;
}

export const coinGeckoApi = createApi({
  reducerPath: "coinGeckoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_COIN_GECKO_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAssetsWithMarketData: builder.query<
      Array<CoinGeckoAsset>,
      GetAssetsWithMarketData
    >({
      query: ({
        page = 1,
        perPage = 10,
        currency = "usd",
        orderBy = "market_cap_desc",
        precision = 2,
      }) =>
        `coins/markets?order=${orderBy}&per_page=${perPage}&precision=${precision}&vs_currency=${currency}&page=${page}`,
    }),
    getAssetChartDataById: builder.query<
      CoinGeckoAssetChartData,
      GetAssetWithMarketDataByIdParams
    >({
      query: ({ id, currency, startAt, endAt }) =>
        `coins/${id}/market_chart/range?vs_currency=${currency}&from=${startAt}&to=${endAt}`,
    }),
  }),
});

export const {
  useGetAssetsWithMarketDataQuery,
  useGetAssetChartDataByIdQuery,
} = coinGeckoApi;
