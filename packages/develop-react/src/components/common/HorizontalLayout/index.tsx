import React, { ReactNode } from "react";
import style from "./index.module.css";

const HorizontalLayout: React.FC<{ children: ReactNode }> = props => {
  return <div className={style["horizontal-layout"]}>{props.children}</div>;
};

export default HorizontalLayout;
