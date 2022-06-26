import MaterialItem from "./MaterialItem";
import { Spin } from "@arco-design/web-react";
import { TypeMaterialSchema } from "packages/x-types/material";
import { useState } from "react";
import getMaterialData from "../../../../mock/materialList";
import styled from "styled-components";
const Installed: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [list, setList] = useState<TypeMaterialSchema[]>([]);

  getMaterialData().then(res => {
    setList(res);
    setLoading(false);
  });
  return (
    <>
      <InstallContainer className="installed-container">
        {list.map(item => (
          <MaterialItem data={item} key={item.url} />
        ))}
      </InstallContainer>
      {loading ? <Spin tip="正在加载"></Spin> : null}
    </>
  );
};
const InstallContainer = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: repeat(3, 95px);
  grid-column-gap: 5px;
  justify-content: center;
`;
export default Installed;