import React from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { setPopUp } from "../features/popUpSlice";
import { dDay } from "../utils";
import { IToDoForm } from "./ToDoInput";

interface IToDoProps {
  toDoData: IToDoForm;
}

const ToDoCt = styled.li`
  display: grid;
  grid-template-columns: 20% 50% 30%;
  margin: 0.5em 0;
  font-size: 0.8em;
  span {
    display: block;
    place-self: center;
  }
`;

export default function ToDo({ toDoData }: IToDoProps) {
  const dispatch = useAppDispatch();
  return (
    <ToDoCt>
      <span>D-{dDay(toDoData.date)}</span>
      <span
        onClick={() => {
          dispatch(
            setPopUp({
              toggle: true,
              data: toDoData,
            })
          );
        }}
      >
        {toDoData.title}
      </span>
      <span>
        {toDoData.dateOption === "due" ? "~" + toDoData.date : toDoData.date}
      </span>
    </ToDoCt>
  );
}
