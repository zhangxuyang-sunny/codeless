// import { Button, Space } from "@arco-design/web-react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import HomeMain from "./components/HomeMain";
import HomeSidebar from "./components/HomeSidebar";
const Index: React.FC = props => {
  return (
    <StyledIndex className="home">
      <Header />
      <div className="container">
        <HomeSidebar />
        <HomeMain />
      </div>
    </StyledIndex>
  );
};

const StyledIndex = styled.div`
  flex-direction: column;
  height: 100vh;
  display: flex;
  .container {
    flex: 1;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }
`;

export default Index;
