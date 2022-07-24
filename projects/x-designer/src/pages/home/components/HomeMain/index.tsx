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
  flex: 1;
  padding-top: 40px;
`;

export default HomeMain;
