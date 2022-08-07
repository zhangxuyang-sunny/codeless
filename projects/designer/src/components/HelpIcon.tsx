import { Tooltip, TooltipProps } from "@arco-design/web-react";
import { IconQuestionCircle } from "@arco-design/web-react/icon";

// 帮助信息图标
// 支持 tooltip
const HelpIcon: React.FC<{
  tooltipProps?: TooltipProps;
  iconStyle?: React.CSSProperties;
}> = props => {
  return (
    <Tooltip {...(props.tooltipProps || {})}>
      <IconQuestionCircle
        style={{
          cursor: "pointer",
          marginLeft: "4px",
          ...(props.iconStyle || {})
        }}
      />
    </Tooltip>
  );
};

export default HelpIcon;
