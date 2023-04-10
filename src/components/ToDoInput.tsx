import React from "react";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToDo } from "../features/toDoSlice";
import { TODO_LIST } from "../ls-type";
import { plusZero } from "../utils";

export interface IToDoForm {
  id: string;
  date: string;
  time: string;
  dateOption: string;
  category: string;
  priority: number;
  title: string;
  content: string;
  cmp: boolean;
  end: boolean;
}

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  * {
  }
  select {
    padding: 4px;
    outline: none;
    border: 1px solid #eee;
  }
  button {
    border: 1px solid #eee;
  }
`;
const DateBox = styled.div`
  padding: 4px;
  border: 1px solid #eee;
  h1 {
    font-weight: 700;
    font-size: 0.9em;
  }
  input {
    display: block;
  }
  div {
    display: grid;
    grid-template-columns: 50% 50%;
    button {
      margin: 1px;
    }
  }
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  input {
    border: 1px solid #eee;
  }
  textarea {
    border: 1px solid #eee;
  }
`;

export default function ToDoInput() {
  // store
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.storeCategories);
  // component
  const now = new Date();
  const { handleSubmit, register, setValue } = useForm<IToDoForm>({
    defaultValues: {
      date: `${now.getFullYear()}-${plusZero(
        String(now.getMonth() + 1)
      )}-${plusZero(String(now.getDate()))}`,
      dateOption: "due",
      priority: 1,
    },
  });
  const onSubmit = (data: IToDoForm) => {
    data.id = uuid();
    data.time = data.time
      ? data.time + ":" + new Date().getSeconds()
      : "23:59:59";
    data.end = false;
    data.cmp = false;
    const result = data;
    console.log(result);

    const toDoListLS = JSON.parse(localStorage.getItem(TODO_LIST) as any);
    localStorage.setItem(TODO_LIST, JSON.stringify([...toDoListLS, result]));

    dispatch(addToDo(result));

    setValue("title", "");
    setValue("content", "");
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DateBox>
          <h1>D-Day</h1>
          <input {...register("date")} type="date" />
          <input {...register("time")} type="time" />
        </DateBox>
        <select {...register("dateOption")} size={2}>
          <optgroup label="날짜">
            <option value="due">까지</option>
            <option value="Dday">당일</option>
          </optgroup>
        </select>
        <select {...register("category")} size={3}>
          <optgroup label="카테고리">
            {categories &&
              categories.map((category) => (
                <option key={uuid()} value={category}>
                  {category}
                </option>
              ))}
          </optgroup>
        </select>
        <select {...register("priority")} size={3}>
          <optgroup label="중요도">
            <option value={1}>매우 중요</option>
            <option value={2}>중요</option>
            <option value={3}>보통</option>
          </optgroup>
        </select>

        <InputBox>
          <input placeholder="제목" {...register("title")}></input>
          <textarea
            placeholder="내용"
            {...register("content")}
            rows={5}
            cols={20}
          ></textarea>
        </InputBox>
        <button>입력</button>
      </Form>
    </Header>
  );
}
