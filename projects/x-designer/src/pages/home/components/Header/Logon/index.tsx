import HeaderButton from "../HeaderButton";
import styles from "./index.module.less";
const Logo: React.FC = () => {
  return (
    <HeaderButton>
      <div className={[styles.logoButton].join(" ")}></div>
      <span>xCode</span>
    </HeaderButton>
  );
};

export default Logo;
