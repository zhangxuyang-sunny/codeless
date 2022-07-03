import { useEffect, useRef, useState } from "react";
import Tippy, { TippyProps } from "@tippyjs/react";
import styled from "styled-components";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/perspective.css";
Tippy.defaultProps = {
  arrow: false,
  delay: 100,
  theme: "light",
  animation: "perspective"
} as TippyProps;
interface SelectNodeProps {
  width: number;
  height: number;
  top: number;
  left: number;
}

function Tooltip() {
  return <span>配置</span>;
}
const DrawSelectNode: React.FC<SelectNodeProps> = props => {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // tippy(container.current as Element, {
    //   content: "I'm a Tippy tooltip!",
    //   placement: "top-start",
    //   offset: [0, 5],
    //   arrow: false,
    //   theme: "light",
    //   delay: 50,
    //   followCursor: true,
    //   animation: "perspective"
    // });
  }, []);
  return (
    <Tippy content={<Tooltip />} placement="top-start">
      <SelectNodeContainer
        style={props}
        onMouseOver={() => setVisible(true)}
        // onMouseLeave={() => setVisible(false)}
      />
    </Tippy>
  );
};

const SelectNodeContainer = styled.div`
  position: absolute;
  outline: 1px solid #415fff;
  top: ${props => props.style?.top + "px"};
  left: ${props => props.style?.left + "px"};
  width: ${props => props.style?.width + "px"};
  height: ${props => props.style?.height + "px"};
`;

export default DrawSelectNode;
