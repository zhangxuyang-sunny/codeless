import path from "./path";
import database from "./database";
import { isDev } from "./constant";

const configuration = () => ({
  host: isDev ? "127.0.0.1:3000" : "119.91.65.70:3000",
  static: isDev ? "static" : "../../../static",
  path,
  database
});

export default configuration;

export { configuration };
