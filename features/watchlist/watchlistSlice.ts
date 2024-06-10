import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface WatchlistState {
  watchlist: string[];
}

const initialState: WatchlistState = {
  watchlist: [],
};

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<string>) => {
      if (!state.watchlist.find((id) => id === action.payload)) {
        state.watchlist.push(action.payload);
      }
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.watchlist = state.watchlist.filter((id) => id !== action.payload);
    },
  },
});

export const { addAsset, removeAsset } = watchlistSlice.actions;

export default watchlistSlice.reducer;
