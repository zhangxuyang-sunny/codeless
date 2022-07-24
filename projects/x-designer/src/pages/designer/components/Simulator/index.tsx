import { useRef } from "react";
import styled from "styled-components";
import { Simulator } from "./Simulator";
import HoverNode from "./behavior/HoverNode";
import SelectNode from "./behavior/SelectNode";
import DragMultiSelectNode from "./behavior/DragMultiSelectNode";

const SimulatorRender: React.FC = () => {
  const simulatorRef = useRef<HTMLDivElement>(null);

  // const { viewState } = useViewState();

  return (
    <SimulatorContainer ref={simulatorRef}>
      <iframe
        title="renderer"
        className="iframe"
        src="/renderer/vue/simulator.html"
        ref={ref => {
          if (!ref) return;
          ref.onload = () => {
            const rendererApi = (ref?.contentWindow as any)?.__X_RENDERER_API__;

            // rendererApi.updateProject(project);
            // rendererApi.updateViews([viewState]);

            ref.contentDocument?.head.insertAdjacentHTML(
              "beforeend",
              `<style>
            .simulator-enter {
              outline: 1px dashed #3e5bff!important;
              outline-offset: -1px;
              background-color: rgba(229, 235, 242, .5);
            }
            
            </style>`
            );
            setTimeout(() => {
              if (ref.contentDocument) {
                new Simulator({
                  key: "data-remote-id",
                  document: ref.contentDocument,
                  container: ref.contentDocument?.body as HTMLElement,
                  popoverContainer: simulatorRef.current as HTMLElement,
                  modes: {
                    default: [SelectNode, HoverNode],
                    dragSelect: [DragMultiSelectNode]
                  }
                });
              }
            });
          };
        }}
      />
    </SimulatorContainer>
  );
};

const SimulatorContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  .iframe {
    height: 100%;
  }
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
