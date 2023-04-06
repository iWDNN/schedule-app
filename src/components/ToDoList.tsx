import React from "react";
import styled from "styled-components";

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
  return (
    <>
      <List>
        <Item>
          <h1>취업</h1>
          <InList>
            <InItem>
              <span>D-5</span>
              <span>이력서 수정</span>
              <span>~2023/04/08</span>
            </InItem>
            <InItem>
              <span>D-5</span>
              <span>이력서 수정</span>
              <span>~2023/04/08</span>
            </InItem>
          </InList>
        </Item>
        <Item>
          <h1>게임</h1>
          <InList>
            <InItem>
              <span>D-5</span>
              <span>이력서 수정</span>
              <span>~2023/04/08</span>
            </InItem>
            <InItem>
              <span>D-5</span>
              <span>이력서 수정</span>
              <span>~2023/04/08</span>
            </InItem>
          </InList>
        </Item>
      </List>
    </>
  );
}
