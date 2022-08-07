import { IconDown } from "@arco-design/web-react/icon";
import HeaderButton from "../HeaderButton";
const Recently: React.FC = () => {
  return (
    <HeaderButton icon={<IconDown />}>
      <span>最近</span>
    </HeaderButton>
  );
};

export default Recently;
