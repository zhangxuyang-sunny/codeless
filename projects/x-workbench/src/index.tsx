import "@arco-design/web-react/dist/css/arco.css";
// import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/home/index";
import Workbench from "./pages/workbench";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <BrowserRouter basename="/">
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workbench" element={<Workbench />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
