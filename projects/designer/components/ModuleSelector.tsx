import React from "react";
import styled from "styled-components";

const StyleModuleSelector = styled.div`
  min-width: 300px;
`;

const ModuleSelector: React.FC = () => {
  return <StyleModuleSelector>模块选择器</StyleModuleSelector>;
};

export default ModuleSelector;
