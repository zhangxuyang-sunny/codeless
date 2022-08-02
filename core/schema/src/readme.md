### 协议手册
注意：这里是纯协议层，不应掺杂任何业务字段和逻辑
注意：这里是纯协议层，不应掺杂任何业务字段和逻辑
注意：这里是纯协议层，不应掺杂任何业务字段和逻辑
docs: https://zbg0s09uml.feishu.cn/docx/doxcn24BiNn72LMnUnYw0eVUZNe

#### 名词&解释
- ApplicationConfig 应用配置，通过 id 进行关联
  - applicationId
  - materialId
  - componentId
- ApplicationSchema 应用协议，将 id 换成对应数据实体的最终协议数据
- PageSchema 页面协议
- RouterConfig 路由配置
- Material 物料
  - ComponentMaterial 组件物料
  - AssetsMaterial 静态资源物料，例如图片等
- Component 组件
  - BaseComponent 基础组件
  - LowcodeComponent 低代码组件

#### 字段规范
- title 中文名字
- name 英文名字
- description 描述
- version 版本 例如：major:minor:patch
- status 状态
