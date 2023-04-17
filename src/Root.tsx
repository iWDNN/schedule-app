import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "./hooks";
import Logo from "./components/Logo";
import MainList from "./components/MainList";
import PopUp from "./components/PopUp";
import Menu from "./components/Menu";

const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const MainCt = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
`;
const Footer = styled.footer`
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
        <MainCt>
          <Logo />
          <Menu />
        </MainCt>
        {pathname === "/" && <MainList />}
        <Outlet />
        <Footer>| Github - iWDNN | Gmail - chansi2064@gmail.com |</Footer>
      </Container>
      {toggle && <PopUp />}
    </>
  );
}

export default Root;
