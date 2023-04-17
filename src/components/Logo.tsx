import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Icon = styled.div`
  text-align: center;
  i {
    font-size: 58px;
    /* margin: 0.9em 0; */
    cursor: pointer;
  }

  &:hover {
    animation: ${blink} 0.7s 0.2s infinite ease-in-out alternate;
  }
`;
export default function Logo() {
  const { pathname } = useLocation();

  return (
    <>
      <Container>
        <Link to={pathname === "/" ? "main" : "/"}>
          <Icon>
            <i className="fa-solid fa-terminal"></i>
          </Icon>
        </Link>
      </Container>
    </>
  );
}
