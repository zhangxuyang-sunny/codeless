import styled from "styled-components";
import Header from "./components/Header";
import { page1 } from "./page1";

const Designer: React.FC = () => {
  return (
    <StyleDesigner>
      <Header />
      <div className="main">
        <div className="left"></div>
        <div className="center">
          <iframe
            className="iframe"
            ref={ref => {
              console.log({ ref });
              if (!ref) return;
              ref.onload = () => {
                const rendererApi = (ref?.contentWindow as any)?.__X_RENDERER_API__;
                rendererApi.updateSchema(page1);
              };
            }}
            src="/renderer/index.html"
            title="preview"
          />
        </div>
        <div className="right"></div>
      </div>
    </StyleDesigner>
  );
};

const StyleDesigner = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 1080px;
  background-color: var(--color-border-1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .main {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    .left {
      width: 300px;
      background-color: var(--color-bg-1);
      border-right: 1px solid var(--color-border-2);
    }
    .center {
      flex-grow: 1;
      /* background-color: var(--color-bg-1); */
      .iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    }
    .right {
      width: 300px;
      background-color: var(--color-bg-1);
      border-left: 1px solid var(--color-border-2);
    }
  }
`;

export default Designer;
