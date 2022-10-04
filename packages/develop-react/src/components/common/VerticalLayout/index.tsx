import React, { ReactNode } from "react";
import style from "./index.module.css";

const VerticalLayout: React.FC<{ children: ReactNode }> = props => {
  return <div className={style["vertical-layout"]}>{props.children}</div>;
};

export default VerticalLayout;
