import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks";
import { setPopUp } from "../features/popUpSlice";
import { dDay, dTime } from "../utils";
import { IToDoForm } from "./ToDoInput";
// #f1696b
// #4BA083
interface IToDoProps {
  toDoData: IToDoForm;
}

const ToDoCt = styled.li`
  display: grid;
  grid-template-columns: 10% 50% 40%;
  margin: 0.5em 0;
  span {
    place-self: center;
    font-weight: 600;
  }
  span:nth-child(1) {
    font-size: 0.9em;
  }
  span:nth-child(2) {
  }
  span:nth-child(3) {
    place-self: start;
    font-size: 0.8em;
  }
`;

export default function ToDo({ toDoData }: IToDoProps) {
  const dispatch = useAppDispatch();

  return (
    <ToDoCt
      onClick={() => {
        dispatch(
          setPopUp({
            toggle: true,
            data: toDoData,
          })
        );
      }}
    >
      <span>D-{dDay(toDoData.date)}</span>
      <span>{toDoData.title}</span>
      <span>
        {toDoData.dateOption === "due" && "~"}
        {toDoData.date.slice(2)}{" "}
        {toDoData.time.slice(0, 5) === "23:59" ? "" : toDoData.time.slice(0, 5)}
      </span>
    </ToDoCt>
  );
}
