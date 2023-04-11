import React from "react";
import uuid from "react-uuid";
import styled, { keyframes } from "styled-components";
import { useAppSelector } from "../hooks";
import ToDo from "./ToDo";

const sizeUpDown = keyframes`
  0%{
    border: 1px solid #eee;
    scale:1.4;
  }
  25%{
    border:1.2px solid red;
  }
  50%{
    scale:1.39;
  }
  75%{
    border:1.2px solid red;
  }
  100%{
    border: 1px solid #eee;
    scale:1.4;
  }
`;

const MainCt = styled.div`
  h1 {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 1em;
  }
`;
const List = styled.ul`
  & > li:nth-child(1) {
    animation: ${sizeUpDown} 3s infinite ease-in-out alternate;
  }
  li:nth-child(2) {
    scale: 1.2;
  }
  li:nth-child(3) {
    scale: 1.15;
  }
`;

export default function MainList() {
  const sortToDos = useAppSelector((state) => state.storeToDos)
    .filter((toDo) => !toDo.end)
    .sort(
      (a, b) =>
        new Date(`${a.date} ${a.time}`).getTime() -
        new Date(`${b.date} ${b.time}`).getTime()
    );
  return (
    <MainCt>
      {JSON.stringify(sortToDos) !== "[]" && (
        <>
          <h1>Deadline ToDos</h1>
          <List>
            {sortToDos.map((hotToDo, i) => (
              <ToDo key={uuid()} toDoData={hotToDo} idx={i} size={"md"} />
            ))}
          </List>
        </>
      )}
    </MainCt>
  );
}
