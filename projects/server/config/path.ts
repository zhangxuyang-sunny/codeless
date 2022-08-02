import { isDev } from "./constant";
export default {
  static_dir: isDev ? "static" : "../../../static"
};
