import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../hooks";
import {
  addCategory,
  ICategoryState,
  setCategories,
} from "../features/categorySlice";
import { CATEGORIES, TODO_LIST } from "../ls-type";
import uuid from "react-uuid";
import { setToDos } from "../features/toDoSlice";

export interface ICategoryForm {
  name: string;
}

const CategoryCt = styled.div`
  display: flex;
`;

const Form = styled.form`
  input {
    border: 1px solid #eee;
    padding: 0.7em 1em;
  }
`;

export default function CategoryInput() {
  const dispatch = useAppDispatch();

  const { handleSubmit, register, setValue } = useForm<ICategoryForm>();

  const [notice, setNotice] = useState(false);

  const onClickReset = () => {
    if (!notice) {
      alert(
        "카테고리를 초기화 하면 카테고리 하위 내용들도 모두 초기화 됩니다. 한번 더 클릭하면 초기화 됩니다"
      );
      setNotice(true);
    } else if (notice) {
      dispatch(setCategories([]));
      dispatch(setToDos([]));
      localStorage.setItem(CATEGORIES, JSON.stringify([]));
      localStorage.setItem(TODO_LIST, JSON.stringify([]));
    }
  };
  const onSubmit = ({ name }: ICategoryForm) => {
    const result: ICategoryState = { id: uuid(), name };

    const categoriesLS = JSON.parse(localStorage.getItem(CATEGORIES) as any);
    localStorage.setItem(CATEGORIES, JSON.stringify([...categoriesLS, result]));

    dispatch(addCategory(result));

    setValue("name", "");
  };
  return (
    <CategoryCt>
      <button onClick={onClickReset}>카테고리 리셋</button>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="카테고리 이름" />
        <button>추가</button>
      </Form>
    </CategoryCt>
  );
}
