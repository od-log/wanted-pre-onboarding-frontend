import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import { useAxios } from "../hooks/useAxios";
import AuthForm from "../components/authForm/authForm";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import { TokenContext } from "../context/tokenContext";

const Login = () => {
  const { response, fetchData } = useAxios();
  const { setToken } = useContext(TokenContext);

  const onSubmit = (event) => {
    event.preventDefault();
    fetchData({
      method: "POST",
      url: "/auth/signin",
      data: {
        email: event.target.email.value,
        password: event.target.password.value,
      },
    });
  };

  useEffect(() => {
    if (response !== null && response?.access_token) {
      localStorage.setItem("JWT", response.access_token);
      setToken(true);
    }
  }, [response]);

  return (
    <Wrapper>
      <Header />
      <AuthForm pathName={"/"} onSubmit={onSubmit} />
      <Footer pathName={"/"} />
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.section`
  padding: 2em;
  width: 360px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;
