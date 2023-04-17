import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToDo, IToDoState, setToDos } from "../features/toDoSlice";
import { TODO_LIST } from "../ls-type";
import { plusZero } from "../utils";

interface IToDoInputProps {
  mode?: "update" | "input";
  updateData?: IToDoState;
}

export interface IToDoForm {
  date: string;
  time: string;
  dateOption: string;
  category: string;
  priority: string;
  title: string;
  content: string;
}

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
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
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 4px;
  background-color: #fff;
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
    width: 100%;
    border: 1px solid #eee;
  }
  textarea {
    border: 1px solid #eee;
  }
`;

const AlertBox = styled.div<{ isActive: boolean }>`
  border: ${(props) => (props.isActive ? "1.5px solid red" : "none")};
  select {
    height: 100%;
    padding: 4px;
    outline: none;
    border: 1px solid #eee;
  }
`;

const now = new Date();

const defaultToDoData: IToDoForm = {
  date: `${now.getFullYear()}-${plusZero(
    String(now.getMonth() + 1)
  )}-${plusZero(String(now.getDate()))}`,
  time: "",
  dateOption: "due",
  category: "",
  priority: "0",
  title: "",
  content: "",
};

export default function ToDoInput({
  mode = "input",
  updateData,
}: IToDoInputProps) {
  // store
  const dispatch = useAppDispatch();
  const toDos = useAppSelector((state) => state.storeToDos);
  const categories = useAppSelector((state) => state.storeCategories);
  // component
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IToDoState>({
    defaultValues:
      mode === "update"
        ? { ...updateData, time: updateData?.time.slice(0, 5) }
        : defaultToDoData,
  });
  const onSubmit = (data: IToDoState) => {
    if (
      new Date(
        `${data.date} ${data.time === "" ? "23:59:59" : data.time}`
      ).getTime() -
        new Date().getTime() <
      0
    ) {
      setError("date", { type: "required" }, { shouldFocus: true });
    } else if (mode === "input") {
      data.id = uuid();
      data.time = data.time
        ? data.time + ":" + new Date().getSeconds()
        : "23:59:59";
      data.end = false;
      data.cmp = false;
      const result = data;
      const toDoListLS = JSON.parse(localStorage.getItem(TODO_LIST) as any);
      localStorage.setItem(TODO_LIST, JSON.stringify([...toDoListLS, result]));
      dispatch(addToDo(result));
      setValue("title", "");
      setValue("content", "");
    } else if (mode === "update" && updateData) {
      const targetIndex = toDos.findIndex((todo) => todo.id === updateData.id);
      const result = [
        ...toDos.slice(0, targetIndex),
        data,
        ...toDos.slice(targetIndex + 1),
      ];

      localStorage.setItem(TODO_LIST, JSON.stringify(result));
      dispatch(setToDos(result));
      setValue("title", "");
      setValue("content", "");
      setValue("category", "ㅎㅇ");
    }
  };
  return (
    <Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <AlertBox isActive={errors.date ? true : false}>
          <DateBox>
            <h1>D-Day</h1>
            <input {...register("date")} type="date" />
            <input {...register("time")} type="time" />
          </DateBox>
        </AlertBox>
        <AlertBox isActive={errors.dateOption ? true : false}>
          <select {...register("dateOption", { required: true })} size={2}>
            <optgroup label="날짜">
              <option value="due">까지</option>
              <option value="Dday">당일</option>
            </optgroup>
          </select>
        </AlertBox>
        <AlertBox isActive={errors.category ? true : false}>
          <select
            {...register("category", {
              required: true,
            })}
            size={3}
          >
            <optgroup label="카테고리">
              {categories &&
                categories.map((category) => (
                  <option key={uuid()} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </optgroup>
          </select>
        </AlertBox>
        <AlertBox isActive={errors.priority ? true : false}>
          <select {...register("priority", { required: true })} size={3}>
            <optgroup label="중요도">
              <option value="0">보통</option>
              <option value="1">중요</option>
              <option value="2">매우 중요</option>
            </optgroup>
          </select>
        </AlertBox>
        <InputBox>
          <AlertBox isActive={errors.title ? true : false}>
            <input
              placeholder="제목"
              {...register("title", { required: true })}
            ></input>
          </AlertBox>
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
