import { createSlice } from "@reduxjs/toolkit";
import { IToDoState } from "./toDoSlice";
interface IPopUpState {
  toggle: boolean;
  data?: IToDoState;
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
