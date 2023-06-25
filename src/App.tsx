import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import UserResultPage from "./pages/UserResultPage";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={SearchPage} />
        <Route path="/user/:username" Component={UserResultPage} />
      </Routes>
    </HashRouter>
  );
};

export default App;
