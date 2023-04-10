import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "../features/toDoSlice";
import categoryReducer from "../features/categorySlice";
import popUpReducer from "../features/popUpSlice";

export const store = configureStore({
  reducer: {
    toDoList: toDoReducer,
    categories: categoryReducer,
    popUpToggle: popUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
