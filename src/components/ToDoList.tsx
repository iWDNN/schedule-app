import React from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { resetToDo } from "../features/toDoSlice";
import { TODO_LIST } from "../ls-type";
import { dDay } from "../utils";

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
`;
const Item = styled.li`
  border: 1px solid #eee;
  padding: 1em;
  margin: 0 10px;
  h1 {
    font-size: 0.9em;
    /* text-align: center; */
  }
  * {
    border: none;
    padding: 0.1em;
  }
`;
const InList = styled.ul`
  width: 200px;
  height: 250px;
`;
const InItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5em 0;
  font-size: 0.8em;
`;
export default function ToDoList() {
  const dispatch = useAppDispatch();

  const toDoList = useAppSelector((state) => state.toDoList);
  const categories = useAppSelector((state) => state.categories);

  const onClickReset = () => {
    localStorage.setItem(TODO_LIST, JSON.stringify([]));
    dispatch(resetToDo());
  };
  return (
    <>
      <button onClick={onClickReset}>리셋</button>
      <List>
        {categories.map((category) => (
          <Item key={uuid()}>
            <h1>{category}</h1>
            <InList>
              {toDoList.map(
                (todo) =>
                  todo.category === category && (
                    <InItem key={uuid()}>
                      <span>D-{dDay(todo.date)}</span>
                      <span>{todo.title}</span>
                      <span>
                        {todo.dateOption === "due"
                          ? "~" + todo.date
                          : todo.date}
                      </span>
                    </InItem>
                  )
              )}
            </InList>
          </Item>
        ))}
      </List>
    </>
  );
}
