import styled from "styled-components";
import WorkbenchHeader from "./components/WorkbenchHeader";

const Workbench: React.FC = () => {
  return (
    <StyleWorkbench>
      <WorkbenchHeader />
    </StyleWorkbench>
  );
};

const StyleWorkbench = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--color-border-1);
  overflow: hidden;
`;

export default Workbench;
