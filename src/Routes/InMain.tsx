import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import CategoryInput from "../components/CategoryInput";
import ToDoInput from "../components/ToDoInput";
import ToDoList from "../components/ToDoList";

const Box = styled.div`
  margin-top: 1em;
  h1 {
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
  }
`;
const List = styled.ul``;
const Item = styled.li``;
export default function InMain() {
  const toDos = useAppSelector((state) => state.toDoList);

  useEffect(() => {
    console.log("InMain.tsx useEffect");
  }, []);
  return (
    <>
      <CategoryInput />
      <ToDoInput />
      <Box>
        <h1>~Ing</h1>
        <ToDoList st="ing" />
      </Box>
      <Box>
        <h1>End</h1>
        <List>
          <Item>
            <h1>Cmp</h1>
            <ToDoList st="cmp" />
          </Item>
          <Item>
            <h1>Failed</h1>
            <ToDoList st="fail" />
          </Item>
        </List>
      </Box>
    </>
  );
}
