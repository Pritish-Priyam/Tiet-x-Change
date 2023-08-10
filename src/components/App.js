import React from "react";
import MainPage from "./MainPage";
import Register from "./Register";
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Upload from "./Upload";
import Login from "./Login";
import Help from "./Help";
import SearchComponent from "./SearchComponent";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/upload" element={<Upload />}/>
      <Route path="/help" element={<Help />} />
      <Route path="/search-result" element={<SearchComponent />} />
    </Routes>
  );
}

export default App;
