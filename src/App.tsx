import React from "react";
import styled, { keyframes } from "styled-components";
import CategoryInput from "./components/CategoryInput";
import PopUp from "./components/PopUp";
import ToDoInput from "./components/ToDoInput";
import ToDoList from "./components/ToDoList";

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(50%, 50%);
  width: 100vw;
  height: 100vh;
  div {
    font-size: 58px;
    margin: 1em 0;
    /* animation: ${blink} 1.5s 1s infinite linear alternate; */
  }
`;

const Box = styled.div`
  margin-top: 1em;
  h1 {
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
  }
`;

function App() {
  return (
    <>
      <Container>
        <Logo>
          <div>
            <i className="fa-solid fa-terminal"></i>
          </div>
        </Logo>
        {/* <CategoryInput />
        <ToDoInput />
        <Box>
          <h1>~Ing</h1>
          <ToDoList />
        </Box>
        <Box>
          <h1>Cmp</h1>
          <ToDoList />
        </Box> */}
      </Container>
      {/* <PopUp /> */}
    </>
  );
}

export default App;
