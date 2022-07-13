import { IconDown } from "@arco-design/web-react/icon";
import HeaderButton from "../HeaderButton";

const WorkSpaceDropDown: React.FC = () => {
  return (
    <HeaderButton icon={<IconDown />}>
      <span>工作区</span>
    </HeaderButton>
  );
};

export default WorkSpaceDropDown;
