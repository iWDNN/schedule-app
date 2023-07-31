import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CategoryInput from "../components/CategoryInput";
import ToDoInput from "../components/ToDoInput";
import ToDoList from "../components/ToDoList";
import { useAppSelector } from "../hooks";
const InMainCt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  section {
    margin: 1em 0;
  }
`;
const MenuList = styled.ul`
  display: flex;
  /* flex-direction: column; */
`;
const MenuItem = styled.button`
  margin: 0 5px;
  border: 2px solid #eee;
  background-color: #fff;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;
const List = styled.ul`
  h1,
  h2,
  h3 {
    margin: 1em 0;
    text-align: center;
    text-transform: uppercase;
  }
  h1 {
    font-weight: 700;
    font-size: 1.4em;
  }
  h2 {
    font-weight: 600;
    font-size: 1.2em;
  }
  h3 {
    font-weight: 500;
    font-size: 1em;
  }
`;
const Item = styled.li``;
export default function InMain() {
  const categories = useAppSelector((state) => state.storeCategories);
  const [categoryTg, setCategoryTg] = useState(false);
  const [todoTg, setTodoTg] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  return (
    <InMainCt>
      <MenuList>
        <MenuItem
          onClick={() => {
            setErrMsg("");
            setCategoryTg((prev) => !prev);
          }}
        >
          카테고리 추가.
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (JSON.stringify(categories) !== "[]") {
              setTodoTg((prev) => !prev);
            } else setErrMsg("카테고리를 먼저 추가해주세요");
          }}
        >
          할 일 추가
        </MenuItem>
      </MenuList>

      <section>{categoryTg && <CategoryInput />}</section>
      <section>{todoTg && <ToDoInput />}</section>
      <span>{errMsg}</span>

      {JSON.stringify(categories) !== "[]" && (
        <>
          <section>
            <List>
              <h1>Ing</h1>
              <ToDoList st="ing" />
              <h1>End</h1>
              <Item>
                <h2>Cmp</h2>
                <ToDoList st="cmp" />
              </Item>
              <Item>
                <h2>Failed</h2>
                <ToDoList st="fail" />
              </Item>
            </List>
          </section>
        </>
      )}
    </InMainCt>
  );
}
