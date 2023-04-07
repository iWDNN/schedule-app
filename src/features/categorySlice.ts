import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES } from "../ls-type";

if (!localStorage.getItem(CATEGORIES)) {
  localStorage.setItem(CATEGORIES, JSON.stringify([]));
}
const initialState: string[] = JSON.parse(
  localStorage.getItem(CATEGORIES) as any
);

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addCategory } = categorySlice.actions;

export default categorySlice.reducer;
