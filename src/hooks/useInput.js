import { useState } from "react";

const useInput = (type, validator) => {
  const [value, setValue] = useState("");
  const [hint, setHint] = useState("");
  const [valid, setValid] = useState(false);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    if (typeof validator === "function") {
      let validCheck = validator(value);
      setValid(validCheck);
    }
    if (!valid) {
      setHint([type]);
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
