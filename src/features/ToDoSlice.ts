import { createSlice } from "@reduxjs/toolkit";

interface ToDoState {
  priority: number;
  todo: string;
  textArea: string;
  category: string;
  date: string;
  cmp: boolean;
}

const initialState: ToDoState[] = [];

export const ToDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
});
