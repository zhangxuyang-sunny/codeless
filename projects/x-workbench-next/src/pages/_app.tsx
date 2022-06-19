import "../styles/globals.css";
import "@arco-design/web-react/dist/css/arco.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Spin } from "@arco-design/web-react";
import { RecoilRoot } from "recoil";

function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onload = () => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      };
    }
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Spin loading tip="加载中"></Spin>
      </div>
    );
  }
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default App;
