import React, { ReactNode } from "react";

const EmptyContainer: React.FC<{ children: ReactNode }> = props => {
  return <>{props.children}</>;
};

export default EmptyContainer;
