import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "./hooks";
import Logo from "./components/Logo";
import MainList from "./components/MainList";
import PopUp from "./components/PopUp";

const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Programmer = styled.span`
  /* position: fixed;
  bottom: 0; */
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.65);
`;

function Root() {
  const { pathname } = useLocation();
  const { toggle } = useAppSelector((state) => state.storePopUp);
  return (
    <>
      <Container>
        <Logo />
        {pathname === "/" && <MainList />}
        <Outlet />
        <Programmer>
          | Github - iWDNN | Gmail - chansi2064@gmail.com |
        </Programmer>
      </Container>
      {toggle && <PopUp />}
    </>
  );
}

export default Root;
