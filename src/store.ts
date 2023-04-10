import { configureStore } from "@reduxjs/toolkit";
import toDoSlice from "./features/toDoSlice";
import categorySlice from "./features/categorySlice";
import popUpSlice from "./features/popUpSlice";

export const store = configureStore({
  reducer: {
    toDos: toDoSlice,
    categories: categorySlice,
    popUpToggle: popUpSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
