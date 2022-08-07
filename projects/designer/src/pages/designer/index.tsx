import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar/Index";
import Simulator from "./components/Simulator/Index";

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
  user-select: none;
  .main {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    .left {
      display: flex;
      grid-column-gap: 6px;
    }
    .center {
      flex-grow: 1;
      margin: 10px;
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
