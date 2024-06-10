import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MyAssetsState {
  watchlist: Array<string>;
}

const initialState: MyAssetsState = {
  watchlist: [],
};

export const myAssetsSlice = createSlice({
  name: "myAssets",
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

export const { addAsset, removeAsset } = myAssetsSlice.actions;

export default myAssetsSlice.reducer;
