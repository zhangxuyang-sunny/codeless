export const enum ApplicationStatus {
  normal = 0, // 正常状态
  unlink = -1, // 软删除
  delete = -2 // 自状态变为 -2 一定时间后，将会彻底从数据库移除
}

// js 表达式节点
export const enum NodeTypes {
  Undefined = "UNDEFINED",
  Null = "NULL",
  String = "STRING",
  Number = "NUMBER",
  Boolean = "BOOLEAN",
  Object = "OBJECT",
  Array = "ARRAY",
  Function = "FUNCTION",
  RegExp = "REGEXP",
  Symbol = "SYMBOL",
  BigInt = "BIGINT",
  Map = "MAP",
  Set = "SET",
  WeakMap = "WEAK_MAP",
  WeakSet = "WEAK_SET"
}
