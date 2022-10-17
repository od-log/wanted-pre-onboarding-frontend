import React, { useRef } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";

const AuthForm = ({ onSubmit, pathName, formRef }) => {
  const passwordRef = useRef(null);
  const emailCheck = (value) => value.includes("@");
  const maxLen = (value) => value.length >= 8;
  const equalCheck = (value) => value === passwordRef.current.value;
  const email = useInput("email", emailCheck);
  const password = useInput("password", maxLen);
  const passwordConfirm = useInput("passwordConfirm", equalCheck);

  return (
    <Form ref={formRef} onSubmit={onSubmit}>
      <label htmlFor="email">이메일</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="wanted@naver.com"
        required
        value={email.value}
        onChange={email.onChange}
      />

      <label htmlFor="password">비밀번호</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="8자 이상 입력해주세요"
        minLength={8}
        required
        value={password.value}
        onChange={password.onChange}
        ref={passwordRef}
      />
      {pathName === "/join" && (
        <>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="비밀번호 확인"
            minLength={8}
            required
            pattern={passwordRef?.current?.value}
            value={passwordConfirm.value}
            onChange={passwordConfirm.onChange}
          />
        </>
      )}

      <button
        disabled={
          !email.valid ||
          !password.valid ||
          (pathName === "/join" && !passwordConfirm.valid)
        }
        type="submit"
      >
        {pathName === "/" && "로그인"}
        {pathName === "/join" && "회원가입"}
      </button>
    </Form>
  );
};

export default AuthForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  label,
  input {
    margin-bottom: 0.5em;
    font-size: 16px;
  }
  input {
    padding: 11px;
    border-radius: 0.3rem;
    border: 1px solid;
  }
  input:valid {
    border: 2px solid #3cb043;
  }

  p {
    font-size: 14px;
    padding-bottom: 19px;
    color: rgba(0, 0, 0, 0.7);
  }
  button {
    width: 100%;
    padding: 8px;
    margin-top: 8px;
    border-radius: 5px;
    background-color: #3cb043;
    color: #fff;
  }
  button:hover {
    cursor: pointer;
    background-color: #32612d;
  }
  button:disabled {
    cursor: not-allowed;
    background-color: #808080;
  }
`;
