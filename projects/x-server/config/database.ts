import { host, mongoPort } from "./constant";

export default {
  host: `mongodb://${host}`,
  port: mongoPort,
  db_user: "user", // 用户表
  table_user_auth: "user_auth", // 用户权限表，仅包含用户密码，权限等信息
  table_user_info: "user_info", // 用户信息表，仅包含用户基础通用信息
  db_project: "project", // 项目库
  table_projects: "projects", // 项目表
  db_material: "material", // 物料库
  table_materials: "materials" // 物料表
};
