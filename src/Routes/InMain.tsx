import React from "react";
import styled from "styled-components";
import CategoryInput from "../components/CategoryInput";
import CategoryList from "../components/CategoryList";
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
  return (
    <InMainCt>
      <section>
        <CategoryInput />
        <CategoryList />
      </section>
      {JSON.stringify(categories) !== "[]" && (
        <>
          <section>
            <ToDoInput />
          </section>
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
