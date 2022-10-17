import styled from "styled-components";

import { ReactComponent as AddIcon } from "../../assets/add.svg";
import { useAxios } from "../../hooks/useAxios";
import { useEffect, useRef } from "react";

const ToDoForm = ({ setRefetch }) => {
  const { response, error, loading, fetchData } = useAxios();
  const formRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    fetchData({
      method: "POST",
      url: "/todos",
      data: {
        todo: event.target.newTodo.value,
      },
    });
  };

  useEffect(() => {
    if (response) {
      formRef.current.reset();
      setRefetch((prev) => !prev);
    }
  }, [response]);

  return (
    <Wrapper onSubmit={onSubmit} ref={formRef}>
      <input type="text" name="newTodo" id="newTodo" />
      <button type="submit">
        <AddIcon />
      </button>
    </Wrapper>
  );
};

export default ToDoForm;

const Wrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #efecef;
  border-radius: 8px;
  padding: 8px;
  margin: 16px 0;

  button {
    padding: 5px;
  }

  input {
    width: 100%;
  }
`;
