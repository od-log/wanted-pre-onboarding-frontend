import { Routes, Route } from "react-router-dom";

import "./common/reset.css";
import styles from "./App.module.css";
import Login from "./pages/login";
import Join from "./pages/join";
import ToDo from "./pages/todo";
import GlobalStyle from "./common/GlobalStyle";

function App() {
  return (
    <div className={styles.app}>
      {/* 라우트 분리할 것. */}
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
