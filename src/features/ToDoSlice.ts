import { createSlice } from "@reduxjs/toolkit";
import { IToDoForm } from "../components/ToDoInput";
import { TODO_LIST } from "../ls-type";

if (!localStorage.getItem(TODO_LIST)) {
  localStorage.setItem(TODO_LIST, JSON.stringify([]));
}
const initialState: IToDoForm[] = JSON.parse(
  localStorage.getItem(TODO_LIST) as any
);

export const toDoSlice = createSlice({
  name: "toDoSlice",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    endToDo: (state, action) => {},
    resetToDo: () => [],
  },
});

export const { addTodo, resetToDo } = toDoSlice.actions;

export default toDoSlice.reducer;
