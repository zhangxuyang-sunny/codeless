import { Outlet } from "react-router-dom";
import Header from "src/components/Header";

import style from "./home.module.scss";

const Home: React.FC = () => {
  return (
    <div className={style.root}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Home;
