import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAxios } from "../hooks/useAxios";
import AuthForm from "../components/authForm/authForm";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";

const Join = () => {
  const formRef = useRef(null);
  let navigate = useNavigate();
  const { response, error, loading, fetchData } = useAxios();

  const onSubmit = (event) => {
    event.preventDefault();
    fetchData({
      method: "POST",
      url: "/auth/signup",
      data: {
        email: event.target.email.value,
        password: event.target.password.value,
      },
    });
  };

  useEffect(() => {
    if (response) {
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    }
  }, [response]);

  useEffect(() => {
    if (localStorage.getItem("JWT")) {
      navigate("/todo");
    }
  }, []);

  return (
    <Wrapper>
      <Header />
      <AuthForm onSubmit={onSubmit} formRef={formRef} pathName={"/join"} />
      <Footer pathName={"/join"} />
    </Wrapper>
  );
};

export default Join;

const Wrapper = styled.section`
  padding: 2em;
  width: 360px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;
