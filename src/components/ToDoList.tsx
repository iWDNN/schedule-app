import React, { useEffect } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { resetToDo, setToDos } from "../features/toDoSlice";
import { TODO_LIST } from "../ls-type";
import ToDo from "./ToDo";
import { IToDoForm } from "./ToDoInput";

interface IToDoListProps {
  st: string;
}

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

export default function ToDoList({ st }: IToDoListProps) {
  const dispatch = useAppDispatch();

  const allToDos = useAppSelector((state) => state.toDoList);
  const noEndtoDos = useAppSelector((state) => state.toDoList).filter((todo) =>
    st === "ing"
      ? !todo.end
      : st === "cmp"
      ? todo.end && todo.cmp
      : todo.end && !todo.cmp
  );
  const categories = useAppSelector((state) => state.categories);

  const onClickReset = () => {
    localStorage.setItem(TODO_LIST, JSON.stringify([]));
    dispatch(resetToDo());
  };
  const updateToDo = () => {
    const result: IToDoForm[] = [];
    allToDos.forEach((toDo) => {
      const temp = Object.assign({}, toDo);
      if (
        new Date(`${toDo.date} ${toDo.time}`).getTime() -
          new Date().getTime() <=
        0
      ) {
        temp.end = true;
        result.push(temp);
      } else result.push(temp);
    });
    localStorage.setItem(TODO_LIST, JSON.stringify(result));
    dispatch(setToDos(result));
  };
  useEffect(() => {
    updateToDo();
  }, []);

  return (
    <>
      <button onClick={onClickReset}>투두리스트 리셋</button>
      <List>
        {categories.map((category) => (
          <Item key={uuid()}>
            <h1>{category}</h1>
            <InList>
              {noEndtoDos.map(
                (todo) =>
                  todo.category === category && (
                    <ToDo key={uuid()} toDoData={todo} />
                  )
              )}
            </InList>
          </Item>
        ))}
      </List>
    </>
  );
}
