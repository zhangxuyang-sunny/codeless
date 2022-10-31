import "systemjs";
import "systemjs/dist/extras/amd.min.js";
import "systemjs/dist/extras/use-default.min.js";
import "systemjs/dist/extras/named-register.min.js";
import "systemjs/dist/extras/dynamic-import-maps.min.js";
import "@economizer/types/src/renderer-api";

import { addToImportMapImports } from "packages/shared/src";

declare global {
  interface Window {
    react: typeof import("react");
  }
}

const host =
  process.env.NODE_ENV !== "production"
    ? "127.0.0.1:7891"
    : "119.91.65.70:7891";
const importMap = {
  "react": `//${host}/static/packages/react/index.js`,
  "react-dom": `//${host}/static/packages/react-dom/index.js`,
  "react-dom/client": `//${host}/static/packages/react-dom/client.js`,
  "@reduxjs/toolkit": `//${host}/static/packages/@reduxjs/toolkit.js`
};

addToImportMapImports(importMap);
