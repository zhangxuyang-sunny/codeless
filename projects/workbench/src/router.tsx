import { BrowserRouter, Route, Routes } from "react-router-dom";

import Resource from "./components/Resource";
import EmptyWrapper from "./pages/home/Empty";
import Home from "./pages/home/home";
import Workbench from "./pages/home/workbench";

const RootRouter: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="workbench" element={<Workbench baseurl="workbench" />}>
            <Route path="resource">
              <Route path="application" element={<Resource type="application" name="应用" />} />
              <Route path="component" element={<Resource type="component" name="组件" />} />
              <Route path="data-source" element={<Resource type="data-source" name="数据源" />} />
              <Route path="dataset" element={<Resource type="dataset" name="数据集" />} />
              <Route path="*" element={<EmptyWrapper />} />
              <Route path="team">
                <Route path="*" element={<EmptyWrapper />} />
              </Route>
              <Route path="*" element={<EmptyWrapper />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;
