import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/login";
import Join from "../pages/join";
import ToDo from "../pages/todo";
import { TokenContext } from "../context/tokenContext";

const Router = () => {
  const { token } = useContext(TokenContext);

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate replace to="/todo" /> : <Login />}
      />
      <Route
        path="/join"
        element={token ? <Navigate replace to="/todo" /> : <Join />}
      />
      <Route
        path="/todo"
        element={token ? <ToDo /> : <Navigate replace to="/" />}
      />
      <Route path="/*" element={<Login />} />
    </Routes>
  );
};

export default Router;
