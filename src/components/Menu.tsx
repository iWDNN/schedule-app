import React from "react";
import styled from "styled-components";

const Ct = styled.div`
  padding: 1em 0;
`;
const List = styled.ul`
  display: flex;
  /* flex-direction: column; */
`;
const Item = styled.button`
  margin: 0 5px;
  border: 2px solid #eee;
  background-color: #fff;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

export default function Menu() {
  return (
    <Ct>
      <List>
        <Item>카테고리 추가</Item>
        <Item>할 일 추가</Item>
        <Item>관리 페이지</Item>
      </List>
    </Ct>
  );
}
