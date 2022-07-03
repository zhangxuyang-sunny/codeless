// import { page1 } from "../../page1";
// import project from "../../project";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import HoverNode from "./behavior/HoverNode";
import { Simulator } from "./Simulator";
const SimulatorRender: React.FC = () => {
  const simulatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new Simulator({
      key: "[data-remote-id]",
      container: simulatorRef.current as HTMLElement,
      modes: {
        default: [],
        hover: [HoverNode]
      }
    });
  }, []);

  return (
    <SimulatorContainer ref={simulatorRef}>
      <div className="header" data-remote-id="1">
        头部
      </div>
      <div className="container" data-remote-id="6">
        <div className="sidebar" data-remote-id="4">
          sidebar
        </div>
        <div className="main" data-remote-id="5">
          main
        </div>
      </div>
    </SimulatorContainer>
    // <iframe
    //   title="renderer"
    //   className="iframe"
    //   src="/renderer/vue/simulator.html"
    //   ref={ref => {
    //     if (!ref) return;
    //     ref.onload = () => {
    //       const rendererApi = (ref?.contentWindow as any)?.__X_RENDERER_API__;

    //       rendererApi.updateProjectSchema(project);
    //       rendererApi.updatePageSchemaList([page1]);
    //       // let f = false;
    //       // setInterval(() => {
    //       //   rendererApi.updatePageSchemaList(f ? [page1] : [page2]);
    //       //   f = !f;
    //       // }, 1000);
    //     };
    //   }}
    // />
  );
};

const SimulatorContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  .container {
    flex: 1;
    display: flex;
    min-height: 500px;
    grid-column-gap: 10px;
    .sidebar {
      width: 300px;
    }
    .main {
      flex: 1;
    }
  }
`;

export default SimulatorRender;
