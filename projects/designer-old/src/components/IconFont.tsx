import React from "react";
import { Tooltip, TooltipProps } from "@arco-design/web-react";
import styled from "styled-components";
const IconFont: React.FC<{ iconName: string; tooltipProps: TooltipProps }> = props => {
  return (
    <Tooltip {...props.tooltipProps}>
      <IconFontElem className={["icon-font", props.iconName].join(" ")}></IconFontElem>
    </Tooltip>
  );
};

const IconFontElem = styled.i`
  font-size: 16px;
`;
export default IconFont;
