import "./common/reset.css";
import styles from "./App.module.css";
import GlobalStyle from "./common/GlobalStyle";
import { TokenContext } from "./context/tokenContext";
import { useState } from "react";
import Router from "./router/router";

function App() {
  let jwt = localStorage.getItem("JWT") ? true : false;
  const [token, setToken] = useState(jwt);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <div className={styles.app}>
        <GlobalStyle />
        <Router />
      </div>
    </TokenContext.Provider>
  );
}

export default App;
