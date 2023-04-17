import React from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";

const CategoryCt = styled.div``;
const List = styled.ul``;
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function CategoryList() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.storeCategories);
  const onClickUpdate = () => {};
  const onClickDelete = () => {};
  return (
    <CategoryCt>
      <List>
        {categories.map((category, i) => (
          <Item key={uuid()}>
            <span>{i + 1}</span>
            <span>{category.name}</span>
            <button onClick={onClickUpdate}>수정</button>
            <button onClick={onClickDelete}>삭제</button>
          </Item>
        ))}
      </List>
    </CategoryCt>
  );
}
