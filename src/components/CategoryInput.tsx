import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../hooks";
import {
  addCategory,
  ICategoryState,
  setCategories,
} from "../features/categorySlice";
import { CATEGORIES } from "../ls-type";
import uuid from "react-uuid";

export interface ICategoryForm {
  name: string;
}

const CategoryCt = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form``;

export default function CategoryInput() {
  const dispatch = useAppDispatch();

  const { handleSubmit, register, setValue } = useForm<ICategoryForm>();
  const onSubmit = ({ name }: ICategoryForm) => {
    const result: ICategoryState = { id: uuid(), name };

    const categoriesLS = JSON.parse(localStorage.getItem(CATEGORIES) as any);
    localStorage.setItem(CATEGORIES, JSON.stringify([...categoriesLS, result]));

    dispatch(addCategory(result));

    setValue("name", "");
  };
  const onClickReset = () => {
    localStorage.setItem(CATEGORIES, JSON.stringify([]));
    dispatch(setCategories([]));
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
