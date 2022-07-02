import { host, mongoPort } from "./constant";

const database = Object.freeze({
  host: `mongodb://${host}`,
  port: mongoPort,

  db_user: "user", // 用户库
  table_user_info: "user_info", // 用户信息表
  table_user_auth: "user_auth", // 用户权限表
  table_user_platform: "user_platform", // 平台用户表，包含用户关联业务的数据

  db_resource: "resource", // 资源库
  table_projects: "projects", // 项目表
  table_views: "views", // 页面表
  table_datasets: "datasets", // 数据集表

  db_material: "material", // 物料库
  table_materials: "materials" // 物料表
});

export default database;

export { database };
