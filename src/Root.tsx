import React from "react";
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
const MainCt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const Footer = styled.footer`
  position: fixed;
  z-index: -1;
  bottom: 0;
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
