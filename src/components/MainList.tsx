import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import styled, { keyframes } from "styled-components";
import { useAppSelector } from "../hooks";
import { dDay, dTime } from "../utils";

interface ITime {
  deadline: string;
}

const sizeUpDown = keyframes`
  0%{
    border: 1px solid #eee;
    scale:1.4;
  }
  25%{
    border:1.2px solid red;
  }
  50%{
    scale:1.39;
  }
  75%{
    border:1.2px solid red;
  }
  100%{
    border: 1px solid #eee;
    scale:1.4;
  }
`;

const MainCt = styled.div`
  h1 {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 1em;
  }
`;
const List = styled.ul`
  & > li:nth-child(1) {
    animation: ${sizeUpDown} 3s infinite ease-in-out alternate;
  }
  li:nth-child(2) {
    scale: 1.2;
  }
  li:nth-child(3) {
    scale: 1.15;
  }
`;
const Item = styled.li`
  min-width: 560px;
  display: grid;
  grid-template-columns: 10% 15% 45% 20% 10%;
  margin: 1.5em 0;
  padding: 0.7em 1em;
  border-radius: 7px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  span {
    display: block;
    place-self: center;
  }
  span:nth-child(1) {
    font-size: 0.9em;
    font-weight: 700;
    letter-spacing: 1px;
  }
  span:nth-child(2) {
    font-size: 0.9em;
    font-weight: 500;
    letter-spacing: 2px;
  }
  span:nth-child(3) {
    font-weight: 600;
  }
  span:nth-child(4) {
    text-align: center;
    font-size: 0.85em;
  }
  span:nth-child(5) {
    font-size: 0.75em;
  }
`;
const TimeDisplay = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "red" : "#000")};
`;
const Icon = styled.i<{ priority: string }>`
  color: ${(props) => (props.priority === "2" ? "#f1696b" : "#EE9330")};
  margin-right: 2px;
`;

function Time({ deadline }: ITime) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(dTime(deadline));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TimeDisplay isActive={Number(dTime(deadline).slice(0, 2)) <= 24}>
      {value}
    </TimeDisplay>
  );
}

export default function MainList() {
  const sortToDos = useAppSelector((state) => state.storeToDos)
    .filter((toDo) => !toDo.end)
    .sort(
      (a, b) =>
        new Date(`${a.date} ${a.time}`).getTime() -
        new Date(`${b.date} ${b.time}`).getTime()
    );
  return (
    <MainCt>
      {JSON.stringify(sortToDos) !== "[]" && (
        <>
          <h1>Deadline ToDos</h1>
          <List>
            {sortToDos.map((hotToDo, i) => (
              <Item key={uuid()}>
                <span>D-{dDay(hotToDo.date)}</span>
                {i <= 2 ? (
                  <Time deadline={`${hotToDo.date} ${hotToDo.time}`} />
                ) : (
                  <span />
                )}
                <span>{hotToDo.title}</span>
                <span>
                  <span>
                    {hotToDo.dateOption === "due" && "~ "}
                    {hotToDo.date}{" "}
                  </span>

                  {hotToDo.time.slice(0, 5) !== "23:59" && (
                    <span>{hotToDo.time.slice(0, 5)}</span>
                  )}
                </span>
                <span>
                  {new Array(+hotToDo.priority).fill(0).map(() => (
                    <Icon
                      key={uuid()}
                      priority={hotToDo.priority}
                      className="fa-solid fa-star"
                    />
                  ))}
                </span>
              </Item>
            ))}
          </List>
        </>
      )}
    </MainCt>
  );
}
