import React from "react";
import styled from "styled-components";
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
export default function InMain() {
  return (
    <>
      <CategoryInput />
      <ToDoInput />
      <Box>
        <h1>~Ing</h1>
        <ToDoList />
      </Box>
      <Box>
        <h1>Cmp</h1>
        <ToDoList />
      </Box>
    </>
  );
}
