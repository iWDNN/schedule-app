import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setPopUp } from "../features/popUpSlice";
import { dDay } from "../utils";
import ToDoInput, { IToDoForm } from "./ToDoInput";
import { TODO_LIST } from "../ls-type";
import { setToDos } from "../features/toDoSlice";

const PopUpBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
const PopUpCt = styled.div`
  min-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 1em;
  background-color: #fff;
  border-radius: 7px;
`;
const Content = styled.div`
  span {
    display: block;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      span {
        font-weight: 600;
      }
      span:first-child {
        letter-spacing: 1px;
        margin-right: 1em;
      }
      span:last-child {
        font-size: 1.1em;
      }
    }
    & > span {
      display: flex;
      align-items: center;
      font-size: 0.9em;
      span {
        margin-left: 5px;
        font-size: 0.9em;
      }
    }
  }

  pre {
    line-height: 1.4;
    margin-top: 1em;
    padding: 1em;
    border: 1px solid #eee;
    font-size: 0.9em;
  }
`;
const BtnGrp = styled.div`
  margin-top: 1em;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 50%;
    }
  }
  button {
    width: 100%;
    border: 1px solid #fff;
    background-color: #eee;
  }
`;
const UpdateCt = styled.div``;

export default function PopUp() {
  //store
  const dispatch = useAppDispatch();
  const toDos = useAppSelector((state) => state.storeToDos);
  const { data } = useAppSelector((state) => state.storePopUp);

  //component
  const [updateTg, setUpdateTg] = useState(false);

  //event
  const onClickOut = () => {
    dispatch(
      setPopUp({
        toggle: false,
        data: null,
      })
    );
  };
  const onClickPopUp = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const onClickUpdate = () => {
    setUpdateTg(true);
  };
  const onClickDel = () => {
    const result = toDos.filter((todo) => todo.id !== data!.id);
    localStorage.setItem(TODO_LIST, JSON.stringify(result));
    dispatch(setToDos(result));
    onClickOut();
  };
  const onClickCmp = () => {
    if (data) {
      const targetIndex = toDos.findIndex((todo) => todo.id === data.id);
      const targetData = Object.assign({}, toDos[targetIndex]);
      const result = [
        ...toDos.slice(0, targetIndex),
        { ...targetData, cmp: true, end: true },
        ...toDos.slice(targetIndex + 1),
      ];
      localStorage.setItem(TODO_LIST, JSON.stringify(result));
      dispatch(setToDos(result));
    } else alert("no data ! reload please");
    dispatch(setPopUp({ data: {}, toggle: false }));
  };
  return (
    <PopUpBg onClick={onClickOut}>
      <PopUpCt onClick={onClickPopUp}>
        <Content>
          <header>
            <div>
              <span>D-{dDay(data?.date)}</span>
              <span>{data?.title}</span>
            </div>
            <span>
              {data?.date} <span>{data?.dateOption === "due" && "까지"}</span>
            </span>
          </header>
          <pre>{data?.content}</pre>
        </Content>

        {updateTg ? (
          <UpdateCt>
            <ToDoInput mode="update" updateData={data} />
          </UpdateCt>
        ) : (
          <BtnGrp>
            <div>
              <button onClick={onClickUpdate}>수정</button>
              <button onClick={onClickDel}>삭제</button>
            </div>
            <button onClick={onClickCmp}>완료</button>
          </BtnGrp>
        )}
      </PopUpCt>
    </PopUpBg>
  );
}
