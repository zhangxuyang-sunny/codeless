import React from "react";
import styled from "styled-components";

const StyleModuleSetters = styled.div`
  width: 400px;
  border-left: 1px solid var(--color-border-1);
  flex-shrink: 0;
`;

const ModuleSetters: React.FC = () => {
  return <StyleModuleSetters></StyleModuleSetters>;
};

export default ModuleSetters;
