import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface IForm {
  priority: number;
  todo: string;
  textArea: string;
  category: string;
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
  const { handleSubmit, register } = useForm<IForm>({
    defaultValues: {
      // priority: 1,
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DateBox>
          <h1>D-Day</h1>
          <input type="date" />
        </DateBox>
        <select {...register("category")} size={3}>
          <optgroup label="카테고리">
            <option value={1}>매우 중요</option>
            <option value={2}>중요</option>
            <option value={3}>보통</option>
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
          <input placeholder="제목" {...register("todo")}></input>
          <textarea
            placeholder="내용"
            {...register("textArea")}
            rows={5}
            cols={20}
          ></textarea>
        </InputBox>
        <button>입력</button>
      </Form>
    </Header>
  );
}
