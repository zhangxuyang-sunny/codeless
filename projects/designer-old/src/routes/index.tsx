import type { RouteObject } from "react-router-dom";
import Designer from "src/pages/designer";
import Projects from "src/pages/projects";

import Components from "src/pages/views";
import Home from "../pages/home/index";

const routes: RouteObject[] = [
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "views",

        element: <Components />
      },
      {
        path: "projects",
        element: <Projects />
      }
    ]
  },
  {
    path: "designer",
    element: <Designer />
  }
];

export default routes;
