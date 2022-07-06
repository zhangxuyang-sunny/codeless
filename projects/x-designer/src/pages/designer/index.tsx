import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar/Index";
import Simulator from "./components/Simulator";
// import { page1 } from "./page1";
// import { page2 } from "./page2";
// import project from "./project";
const Designer: React.FC = () => {
  return (
    <StyleDesigner>
      <Header />
      <div className="main">
        <div className="left">
          <Sidebar />
        </div>
        <div className="center">
          <Simulator />
          {/* <iframe
            title="renderer"
            className="iframe"
            src="/renderer/vue/simulator.html"
            ref={ref => {
              if (!ref) return;
              ref.onload = () => {
                const rendererApi = (ref?.contentWindow as any)?.__X_RENDERER_API__;
                console.log(rendererApi);

                rendererApi.updateProject(project);
                rendererApi.updateViews([view1]);
                // let f = false;
                // setInterval(() => {
                //   rendererApi.updatePageSchemaList(f ? [page1] : [page2]);
                //   f = !f;
                // }, 1000);
              };
            }}
          /> */}
        </div>
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
      display: flex;
      overflow: hidden;
      grid-column-gap: 6px;
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
  }
`;

export default Designer;
