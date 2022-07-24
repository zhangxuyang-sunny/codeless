import styles from "./index.module.less";
import WorkSpaceDropDown from "./WorkSpaceDropDown";
import Logo from "./Logon";
import Recently from "./Recently";
import Create from "./Create";
import Notification from "./Notification";
const Header: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <Logo />
      <WorkSpaceDropDown />
      <Recently />
      <Create />
      <div className={styles.right}>
        <Notification />
      </div>
    </div>
  );
};

export default Header;
