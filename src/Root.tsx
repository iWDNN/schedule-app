import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "./app/hooks";
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

function Root() {
  const { pathname } = useLocation();
  const { toggle } = useAppSelector((state) => state.popUpToggle);
  useEffect(() => {
    console.log("Root.tsx useEffect");
  }, []);
  return (
    <>
      <Container>
        <Logo />
        {pathname === "/" && <MainList />}
        <Outlet />
      </Container>
      {toggle && <PopUp />}
    </>
  );
}

export default Root;
