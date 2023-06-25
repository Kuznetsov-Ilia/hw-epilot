import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import UserResultPage from "./pages/UserResultPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={SearchPage} />
        <Route path="/user/:username" Component={UserResultPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
