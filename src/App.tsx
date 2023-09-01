// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Test} from "./components/test";
// import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  return (
  <div className="container">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </div>
  )

}
        // <Route path="/" element={<Home />} />
        // <Route path="/about" element={<About />} />
export default App;
