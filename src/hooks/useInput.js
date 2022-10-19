import { useState } from "react";

const useInput = (type, validator) => {
  const [value, setValue] = useState("");
  const [hint, setHint] = useState("");
  const [valid, setValid] = useState(false);
  const hintList = {
    email: "@를 꼭 입력해주세요.",
    password: "8자리 이상 입력해주세요.",
    passwordConfirm: "비밀번호가 일치하지 않습니다.",
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    if (typeof validator === "function") {
      let validCheck = validator(value);
      setValid(validCheck);
    }
    if (!valid) {
      setHint(hintList[type]);
    }
    setValue(value);
  };

  return {
    value,
    onChange,
    hint,
    valid,
  };
};

export default useInput;
