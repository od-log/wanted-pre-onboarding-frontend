import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import ToDoForm from "../components/toDoForm/toDoForm";
import ToDoItem from "../components/toDoItem/toDoItem";
import { TokenContext } from "../context/tokenContext";
import { useAxios } from "../hooks/useAxios";

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const { status, response, error, loading, fetchData } = useAxios();
  const { setToken } = useContext(TokenContext);

  const onLogout = (event) => {
    localStorage.removeItem("JWT");
    setToken(false);
  };

  useEffect(() => {
    fetchData({
      method: "GET",
      url: "/todos",
    });
  }, [refetch]);

  useEffect(() => {
    if (response) {
      setTodos(response);
    }
  }, [response]);

  return (
    <Wrapper>
      <header>
        <h2 className="title">My to do list</h2>
        <button onClick={onLogout}>로그아웃</button>
      </header>
      <ToDoForm setRefetch={setRefetch} />
      <ul>
        {todos &&
          todos.map((item) => {
            return (
              <ToDoItem key={item.id} item={item} setRefetch={setRefetch} />
            );
          })}
      </ul>
    </Wrapper>
  );
};

export default ToDo;

const Wrapper = styled.section`
  padding: 2em;
  width: 360px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .title {
      font-size: 25px;
    }
  }

  button {
    color: #3cb043;
    border: 0;
    background: none;
  }
  button:hover {
    color: #32612d;
  }
`;
