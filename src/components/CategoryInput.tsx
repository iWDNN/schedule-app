import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../hooks";
import { addCategory, resetCategory } from "../features/categorySlice";
import { CATEGORIES } from "../ls-type";

interface ICategoryForm {
  categoryName: string;
}

const CategoryCt = styled.div`
  display: flex;
  button {
    border: none;
    padding: 0.7em 1em;
    border-radius: 7px;
  }
  button:first-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  button:last-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

const Form = styled.form`
  * {
    border: none;
  }
  input {
    padding: 0.64em 1em;
    outline: 1px solid #eee;
  }
`;

export default function CategoryInput() {
  const dispatch = useAppDispatch();

  const { handleSubmit, register, setValue } = useForm<ICategoryForm>();
  const onSubmit = ({ categoryName }: ICategoryForm) => {
    const result = categoryName.trim();

    const categoriesLS = JSON.parse(localStorage.getItem(CATEGORIES) as any);
    localStorage.setItem(CATEGORIES, JSON.stringify([...categoriesLS, result]));

    dispatch(addCategory(result));

    setValue("categoryName", "");
  };
  const onClickReset = () => {
    localStorage.setItem(CATEGORIES, JSON.stringify([]));
    dispatch(resetCategory());
  };
  return (
    <CategoryCt>
      <button onClick={onClickReset}>카테고리 리셋</button>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("categoryName")} placeholder="카테고리 이름" />
        <button>추가</button>
      </Form>
    </CategoryCt>
  );
}
