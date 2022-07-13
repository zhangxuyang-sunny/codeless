import { Dropdown } from "@arco-design/web-react";
import { IconClose } from "@arco-design/web-react/icon";
import { useToggle } from "ahooks";
import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

interface HeaderButtonProps {
  children?: ReactNode;
  icon?: ReactNode;
  type?: "special" | "default";
  dropProps?: {
    title?: string;
    overlay?: ReactNode;
  };
}
const HeaderButton: React.FC<HeaderButtonProps> = props => {
  const { dropProps } = props;
  const [visible, { setRight, setLeft }] = useToggle();
  const DropOverlay = (
    <DropOverlayContainer>
      <header>
        <span>{dropProps?.title}</span>
        <IconClose className="icon" onClick={setLeft} />
      </header>
      {dropProps?.overlay}
    </DropOverlayContainer>
  );

  return (
    <Dropdown
      trigger="click"
      droplist={DropOverlay}
      popupVisible={visible}
      triggerProps={{
        onClickOutside: setLeft
      }}
    >
      <HeaderButtonContainer
        {...props}
        hasChildren={!!props.children}
        onClick={() => {
          !!dropProps && setRight();
        }}
      >
        {props.children}
        {props.icon ? <div className="icon">{props.icon}</div> : null}
      </HeaderButtonContainer>
    </Dropdown>
  );
};

const HeaderButtonContainer =
  //
  styled.div<Omit<HeaderButtonProps & { hasChildren: boolean }, "icon">>`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    border-radius: 3px;
    padding: 4px 10px;
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    ${props =>
      props.type === "special" &&
      css`
        background-color: rgba(0, 0, 0, 0.2);
      `}
    .icon {
      font-size: 16px;
      margin-top: 1px;
      ${props =>
        props.hasChildren
          ? css`
              margin-left: 5px;
            `
          : css`
              margin-left: 0;
            `}
    }
  `;

const DropOverlayContainer = styled.div`
  color: #172b4d;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08);
  box-sizing: border-box;
  outline: 0;
  overflow: hidden;
  margin-top: 6px;
  padding: 10px;
  min-width: 200px;
  header {
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    justify-content: space-between;
    .icon {
      color: #6b778c;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
`;

export default HeaderButton;
