import React from "react";
import styled from "styled-components";

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
  return (
    <PopUpBg>
      <PopUpCt>
        <Content>
          <h1>
            <span>D-7</span>
            <span>이력서 수정</span>
          </h1>
          <div>
            <span>~2023-04-08</span>
          </div>
          <p>
            - 포트폴리오 사진 기입 <br />- 자기소개서 내용 추가(리엑트관한)
          </p>
        </Content>
        <button>완료</button>
      </PopUpCt>
    </PopUpBg>
  );
}
