import { Empty } from "@arco-design/web-react";

const EmptyWrapper: React.FC = () => {
  return (
    <Empty
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center"
      }}
      description="暂无内容"
    />
  );
};

export default EmptyWrapper;
