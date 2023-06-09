import { createSlice } from "@reduxjs/toolkit";
import { IToDoForm } from "../components/ToDoInput";
import { TODO_LIST } from "../ls-type";

export interface IToDoState extends IToDoForm {
  id: string;
  cmp: boolean;
  end: boolean;
}

if (!localStorage.getItem(TODO_LIST)) {
  localStorage.setItem(TODO_LIST, JSON.stringify([]));
}
const initialState: IToDoState[] = JSON.parse(
  localStorage.getItem(TODO_LIST) as any
);

export const toDoSlice = createSlice({
  name: "toDoSlice",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      state.push(action.payload);
    },
    setToDos: (state, action) => action.payload,
  },
});

export const { addToDo, setToDos } = toDoSlice.actions;

export default toDoSlice.reducer;
