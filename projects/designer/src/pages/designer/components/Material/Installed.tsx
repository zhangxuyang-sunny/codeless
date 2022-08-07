import styled from "styled-components";
import { useState } from "react";
import { Spin } from "@arco-design/web-react";
import { MaterialData } from "@lowcode/types";
import getMaterialData from "src/mock/materialList";
import MaterialItem from "./MaterialItem";

const Installed: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [list, setList] = useState<MaterialData[]>([]);

  getMaterialData().then(res => {
    setList(res);
    setLoading(false);
  });

  return (
    <>
      <InstallContainer className="installed-container">
        {list.map(item => {
          if (item.schema.type === "component") {
            return <MaterialItem data={item} key={item.schema.src} />;
          }
          return null;
        })}
      </InstallContainer>
      {loading ? <Spin tip="正在加载"></Spin> : null}
    </>
  );
};
const InstallContainer = styled.div`
  position: relative;
  padding: 10px 0;
  display: grid;
  grid-template-columns: repeat(3, 95px);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  justify-content: center;
`;
export default Installed;