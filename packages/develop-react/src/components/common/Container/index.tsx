import React, { ReactNode } from "react";

const Container: React.FC<{ children: ReactNode }> = props => {
  return <>{props.children}</>;
};

export default Container;
