import "@arco-design/web-react/dist/css/arco.css";
import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/home/index";
import Designer from "./pages/designer";

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);
  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <BrowserRouter basename="/">
    <RecoilRoot>
      <DebugObserver />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/designer" element={<Designer />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
