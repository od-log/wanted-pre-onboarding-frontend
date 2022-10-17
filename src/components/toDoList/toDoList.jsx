import React from "react";

import ToDoItem from "../toDoItem/toDoItem";

const ToDoList = ({ todos }) => {
  return (
    <ul>
      {todos &&
        todos.map((item) => {
          return <ToDoItem key={item.id} item={item} />;
        })}
    </ul>
  );
};

export default ToDoList;
