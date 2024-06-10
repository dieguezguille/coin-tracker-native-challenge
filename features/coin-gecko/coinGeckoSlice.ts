import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CoinGeckoState {
  apiKeyValue?: string;
}

const initialState: CoinGeckoState = {
  apiKeyValue: undefined,
};

export const coinGeckoSlice = createSlice({
  name: "coinGecko",
  initialState,
  reducers: {
    setApiKeyValue: (state, action: PayloadAction<string>) => {
      state.apiKeyValue = action.payload;
    },
  },
});

export const { setApiKeyValue } = coinGeckoSlice.actions;

export default coinGeckoSlice.reducer;
