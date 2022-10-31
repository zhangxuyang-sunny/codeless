import { Button } from "@arco-design/web-react";
import "@arco-design/web-react/es/Button/style/index";
import React, { useEffect } from "react";

const Comp: React.FC = () => {
  console.log({ useEffect });
  useEffect(() => {
    console.log(12);
  }, []);
  return <div>111</div>;
};
export default Button;
