import { createSlice } from "@reduxjs/toolkit";
import { IToDoForm } from "../components/ToDoInput";
interface IPopUpState {
  toggle: boolean;
  data?: IToDoForm;
}

const initialState: IPopUpState = {
  toggle: false,
};

export const popUpSlice = createSlice({
  name: "popUpSlice",
  initialState,
  reducers: {
    setPopUp: (state, action) => action.payload,
  },
});

export const { setPopUp } = popUpSlice.actions;
export default popUpSlice.reducer;
