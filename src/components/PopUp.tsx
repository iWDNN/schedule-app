import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setPopUp } from "../features/popUpSlice";
import { dDay } from "../utils";

const PopUpBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
const PopUpCt = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  background-color: #fff;
  border-radius: 7px;
  button {
    margin-top: 1em;
    padding: 0.5em 0;
    border: none;
    border-radius: 7px;
  }
`;
const Content = styled.div`
  h1 {
    font-size: 1.2em;
    font-weight: 700;
    text-align: start;
    span:first-child {
      margin-right: 0.5em;
    }
    span:last-child {
    }
  }
  div {
    span {
      display: block;
      margin: 1em 0;
    }
  }
  p {
    margin-top: 1em;
    padding: 1em;
    border: 1px solid #eee;
    font-size: 0.9em;
  }
`;

export default function PopUp() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.storePopUp);
  const onClickBg = () => {
    console.log("bg");
    dispatch(
      setPopUp({
        toggle: false,
        data: null,
      })
    );
  };
  const onClickPopUp = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log("popup");
  };
  return (
    <PopUpBg onClick={onClickBg}>
      <PopUpCt onClick={onClickPopUp}>
        <Content>
          <h1>
            <span>{dDay(data?.date)}</span>
            <span>{data?.title}</span>
          </h1>
          <div>
            <span>~{data?.date}</span>
          </div>
          <p>{data?.content}</p>
        </Content>
        <button>완료</button>
      </PopUpCt>
    </PopUpBg>
  );
}
