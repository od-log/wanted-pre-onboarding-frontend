import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as UpdateButton } from "../../assets/pencil.svg";
import { ReactComponent as DeleteButton } from "../../assets/trashcan.svg";
import { ReactComponent as CheckIcon } from "../../assets/check.svg";
import { ReactComponent as CancleButton } from "../../assets/cancle.svg";
import { useAxios } from "../../hooks/useAxios";
import useToggle from "../../hooks/useToggle";
import useConfirm from "../../hooks/useConfirm";

const ToDoItem = ({ item, setRefetch }) => {
  const { id, todo, isCompleted } = item;
  const [toDoState, setToDoState] = useState(todo);
  const updateTodo = useAxios();
  const deleteTodo = useAxios();
  const [updateToggle, setUpdateToggle] = useToggle(false);
  const [checkToggle, setCheckToggle] = useToggle(isCompleted);

  const onUpdateToggle = () => {
    setUpdateToggle();
  };

  const onDelete = () => {
    deleteTodo.fetchData({
      method: "DELETE",
      url: `/todos/${id}`,
    });
  };

  const message = "정말 삭제하시겠습니까?";
  const deleteWithConfirm = useConfirm(message, onDelete);

  const onEdit = (event) => {
    event.preventDefault();
    updateTodo.fetchData({
      method: "PUT",
      url: `/todos/${id}`,
      data: {
        todo: updateToggle ? event.target.updateTodo.value : toDoState,
        isCompleted: checkToggle,
      },
    });
  };

  useEffect(() => {
    if (updateTodo.response) {
      setToDoState(updateTodo.response.todo);
    }
  }, [updateTodo.response]);

  useEffect(() => {
    onEdit();
  }, [checkToggle]);

  useEffect(() => {
    if (deleteTodo.status === 204) {
      setRefetch();
    }
  }, [deleteTodo.status]);

  return (
    <Wrapper isCompleted={checkToggle}>
      {updateToggle ? (
        <form
          onSubmit={() => {
            onEdit();
            setUpdateToggle();
          }}
          className="layout"
        >
          <input
            type="text"
            defaultValue={todo}
            name="updateTodo"
            id="updateTodo"
            className="updateTodo"
          ></input>
          <ButtonArea>
            <button type="submit">
              <CheckIcon />
            </button>
            <CancleButton onClick={onUpdateToggle} />
          </ButtonArea>
        </form>
      ) : (
        <section className="layout">
          <ToDoText
            id="baseTodo"
            onClick={(event) => {
              setCheckToggle((checkToggle) => !checkToggle);
            }}
            checked={checkToggle}
          >
            {toDoState}
          </ToDoText>
          <ButtonArea>
            <UpdateButton onClick={onUpdateToggle} />
            <DeleteButton onClick={deleteWithConfirm} />
          </ButtonArea>
        </section>
      )}
    </Wrapper>
  );
};

export default ToDoItem;

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  background-color: #efecef;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 7px;

  .checkbox {
    width: 15%;
  }

  .updateTodo {
    width: 75%;
  }

  .layout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const ToDoText = styled.span`
  width: 100%;
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  text-decoration-color: rgba(0, 0, 0, 0.3);
  color: ${(props) => (props.checked ? " rgba(0, 0, 0, 0.6)" : "#373737")}; ;
`;

const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
