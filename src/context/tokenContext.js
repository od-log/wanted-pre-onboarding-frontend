import { createContext } from "react";

let token = localStorage.getItem("JWT") ? true : false;
export const TokenContext = createContext({ token });
