## 简介

这个模板使用了最新的 vue3 和 element-plus UI 框架，vite 构建工具、pinia 状态管理、vue-router 路由管理、mockjs 数据模拟，并集成了 typescript。功能从 Vue Element Admin 移植而来，详细使用可以参考[该文档](https://vue3-element-admin-site.midfar.com/zh/guide/essentials/router-and-nav.html)。

## 特性

- **最新技术栈**：使用 Vue3/vite3 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **Mock 数据** 内置 Mock 数据方案
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件

## 在线示例

[vue3 element admin](https://vue3-element-admin.midfar.com/)

[element plus](https://element-plus.midfar.com/)

## 准备
开发前请确保熟悉并掌握以下技术栈：

- vue: https://cn.vuejs.org/
- TypeScript：https://www.tslang.cn/index.html
- element-plus：https://element-plus.midfar.com/
- pinia: https://pinia.vuejs.org/zh/
- vue-router: https://router.vuejs.org/zh/

注：开发前请务必阅读上述所有文档。应用至实际项目开发请修改 readme 内容。

## 推荐的 IDE 工具和插件

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (禁用 Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Vite 构建工具配置

参考 [Vite 配置](https://vitejs.dev/config/).

## 主要结构

```
- mock // 模拟数据
- public
- src
  - components // 组件
  - views // 页面
    - tableTemplates // 示例模块
	  - index.ts
   - login // 登录模块
	  - index.vue
 - settings.ts // 全局配置
 - main.ts // 入口文件
-  types // TypeScript类型
- package.json
- CODE_OF_CONDUCT.md // 框架开发要求
- README.md //框架使用手册
```

## 使用

### 安装依赖

```sh
npm install
```

### 开发模式连接测试服

```sh
npm run dev:test
```

### 打包到测试服

```sh
npm run build:test
```

### 代码检查 [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 支持环境

现代浏览器。

| IE/Edge          | Firefox         | Chrome          | Safari          | 
| ---------------- | --------------- | --------------- | --------------- | 
| IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions | 

## TODO

当前问题

- 暂未配置git提交规范。

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建基线框架：

- 联系维护人员 midfar@qq.com
- 提交 pr
- 修复 bug
- 分享实践案例
