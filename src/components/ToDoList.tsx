import React, { useEffect } from "react";
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
  padding: 0 1em;
  margin: 0 10px;
  h1 {
    font-size: 1.1em;
    margin: 1em 0;
    /* text-align: center; */
  }
  * {
    border: none;
    padding: 0.1em;
  }
`;
const InList = styled.ul`
  width: 300px;
  height: 350px;
`;
const InItem = styled.li`
  display: grid;
  grid-template-columns: 20% 50% 30%;
  margin: 0.5em 0;
  font-size: 0.8em;
  span {
    display: block;
    place-self: center;
  }
`;
export default function ToDoList() {
  const dispatch = useAppDispatch();

  const toDos = useAppSelector((state) => state.toDoList).filter(
    (todo) => todo.end === false
  );
  const categories = useAppSelector((state) => state.categories);

  const onClickReset = () => {
    localStorage.setItem(TODO_LIST, JSON.stringify([]));
    dispatch(resetToDo());
  };
  useEffect(() => {
    console.log("ToDoList.tsx useEffect");
  }, []);

  return (
    <>
      <button onClick={onClickReset}>투두리스트 리셋</button>
      <List>
        {categories.map((category) => (
          <Item key={uuid()}>
            <h1>{category}</h1>
            <InList>
              {toDos.map(
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
