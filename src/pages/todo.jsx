import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ToDoForm from "../components/toDoForm/toDoForm";
import ToDoItem from "../components/toDoItem/toDoItem";
import ToDoList from "../components/toDoList/toDoList";
import { useAxios } from "../hooks/useAxios";

const ToDo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const { status, response, error, loading, fetchData } = useAxios();

  const onLogout = (event) => {
    localStorage.removeItem("JWT");
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("JWT")) {
      navigate("/");
    }
  }, []);

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
      {localStorage.getItem("JWT") && (
        <ul>
          {todos &&
            todos.map((item) => {
              return (
                <ToDoItem key={item.id} item={item} setRefetch={setRefetch} />
              );
            })}
        </ul>
      )}
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
