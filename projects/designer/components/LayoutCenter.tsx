import React from "react";
import styled from "styled-components";

const StyleLayoutCenter = styled.div`
  width: 100%;
  /* height: 100%; */
  margin: 20px;
  box-sizing: border-box;
  iframe {
    width: 100%;
    height: 100%;
    border: 1px solid var(--color-border-1);
  }
`;

const LayoutCenter: React.FC = () => {
  return (
    <StyleLayoutCenter>
      <iframe src="http://localhost:3000/renderer/vue/simulator.html/#/" />
    </StyleLayoutCenter>
  );
};
export default LayoutCenter;
