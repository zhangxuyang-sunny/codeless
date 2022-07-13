import { Outlet } from "react-router-dom";
import styled from "styled-components";

const HomeMain: React.FC = props => {
  return (
    <HomeMainContainer>
      <Outlet />
    </HomeMainContainer>
  );
};

const HomeMainContainer = styled.div`
  padding: 0 16px;
  max-width: 825px;
  background-color: blue;
  flex: 1;
`;

export default HomeMain;
