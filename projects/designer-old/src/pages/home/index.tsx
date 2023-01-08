// import { Button, Space } from "@arco-design/web-react";
// import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import HomeMain from "./components/HomeMain";
import HomeSidebar from "./components/HomeSidebar";

const Index: React.FC = () => {
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
    display: flex;
    justify-content: center;
    overflow: auto;
  }
`;

export default Index;
