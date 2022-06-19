import { NextPage } from "next";
import styled from "styled-components";
import WorkbenchHeader from "src/components/WorkbenchHeader";

const Workbench: NextPage = () => {
  return (
    <StyleWorkbench>
      <WorkbenchHeader></WorkbenchHeader>
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
