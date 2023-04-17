import { createSlice } from "@reduxjs/toolkit";
import { ICategoryForm } from "../components/CategoryInput";
import { CATEGORIES } from "../ls-type";

export interface ICategoryState extends ICategoryForm {
  id: string;
}

if (!localStorage.getItem(CATEGORIES)) {
  localStorage.setItem(CATEGORIES, JSON.stringify([]));
}
const initialState: ICategoryState[] = JSON.parse(
  localStorage.getItem(CATEGORIES) as any
);

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    setCategories: (state, action) => action.payload,
  },
});

export const { addCategory, setCategories } = categorySlice.actions;

export default categorySlice.reducer;
