import React, { useEffect } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IToDoState, setToDos } from "../features/toDoSlice";
import { TODO_LIST } from "../ls-type";
import ToDo from "./ToDo";

interface IToDoListProps {
  st: string;
}

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
  background-color: #fff;
`;
const Item = styled.li`
  border: 1px solid #eee;
  padding: 0 0.5em;
  margin: 0 10px;
  h3 {
    margin: 1em 0;
    text-align: center;
  }
`;
const InList = styled.ul`
  width: 370px;
  height: 350px;
`;

export default function ToDoList({ st }: IToDoListProps) {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.storeCategories);
  const allToDos = useAppSelector((state) => state.storeToDos);
  const filteredToDos = allToDos
    .filter((todo) =>
      st === "ing"
        ? !todo.end && !todo.cmp
        : st === "cmp"
        ? todo.end && todo.cmp
        : st === "fail"
        ? todo.end && !todo.cmp
        : null
    )
    .sort(
      (a, b) =>
        new Date(`${a.date} ${a.time}`).getTime() -
        new Date(`${b.date} ${b.time}`).getTime()
    );

  const onClickReset = () => {
    const result = allToDos.filter((todo) => !filteredToDos.includes(todo));
    localStorage.setItem(TODO_LIST, JSON.stringify(result));
    dispatch(setToDos(result));
  };
  const updateToDo = () => {
    const result: IToDoState[] = [];
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
      <button onClick={onClickReset}>{st.toUpperCase()} 리셋</button>
      <List>
        {categories.map((category) => (
          <Item key={uuid()}>
            <h3>{category.name}</h3>
            <InList>
              {filteredToDos.map(
                (todo) =>
                  todo.category === category.name && (
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
