import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks";
import { setPopUp } from "../features/popUpSlice";
import { dDay, dTime } from "../utils";
import uuid from "react-uuid";
import { IToDoState } from "../features/toDoSlice";
// #f1696b
// #4BA083
interface IToDoProps {
  toDoData: IToDoState;
  size?: "sm" | "md";
  idx?: number;
}
interface ITime {
  deadline: string;
}

const ToDoCt = styled.li<{ size?: string }>`
  min-width: ${(props) => (props.size === "sm" ? "100%" : "560px")};
  display: grid;
  grid-template-columns: ${(props) =>
    props.size === "sm" ? "15% 0% 50% 25% 10%" : "10% 15% 45% 20% 10%"};
  margin: ${(props) => (props.size === "sm" ? "1em" : "1.5em")} 0;
  padding: 0.7em 1em;
  border-radius: 7px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1)
    ${(props) => props.size !== "sm" && ", 0 10px 20px rgba(0, 0, 0, 0.06)"};
  font-size: ${(props) => (props.size === "sm" ? "0.8em" : "1em")};
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

export default function ToDo({ toDoData, size = "sm", idx }: IToDoProps) {
  const dispatch = useAppDispatch();

  return (
    <ToDoCt
      size={size}
      onClick={() => {
        dispatch(
          setPopUp({
            toggle: true,
            data: toDoData,
          })
        );
      }}
    >
      <span>D-{dDay(toDoData.date)}</span>
      {size === "sm" ? (
        <span />
      ) : size === "md" && idx! <= 2 ? (
        <Time deadline={`${toDoData.date} ${toDoData.time}`} />
      ) : (
        <span />
      )}
      {/* {idx === 0 || (idx && size !== "sm") ? (
        idx <= 2 && (
          <>
            <Time deadline={`${toDoData.date} ${toDoData.time}`} />
          </>
        )
      ) : (
        <span>aa{idx}</span>
      )} */}
      <span>{toDoData.title}</span>
      <span>
        {toDoData.dateOption === "due" && "~"}
        {toDoData.date.slice(2)}{" "}
        {toDoData.time.slice(0, 5) === "23:59" ? "" : toDoData.time.slice(0, 5)}
      </span>
      <span>
        {new Array(+toDoData.priority).fill(0).map(() => (
          <Icon
            key={uuid()}
            priority={toDoData.priority}
            className="fa-solid fa-star"
          />
        ))}
      </span>
    </ToDoCt>
  );
}
