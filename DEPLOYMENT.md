# 部署指南

本文档将指导您如何将您的应用程序部署到托管环境，并确保MongoDB连接正常工作。

## 准备工作

1. 创建MongoDB账户和数据库
   - 前往 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 注册账户
   - 创建一个新的集群（可以使用免费层级）
   - 创建一个数据库用户，并记下用户名和密码
   - 允许所有IP地址访问（生产环境中应该限制为您的服务器IP）
   - 获取连接字符串（应类似于`mongodb+srv://username:password@cluster.mongodb.net/database`）

2. 设置环境变量
   - 在您的托管平台（如Vercel, Netlify或其他服务）中设置以下环境变量：
     - `MONGODB_URI`: 您的MongoDB连接字符串

## 部署到Vercel（推荐）

Vercel是部署Next.js应用的理想平台，配置简单且与Next.js无缝集成。

1. 安装Vercel CLI（可选）：
   ```
   npm install -g vercel
   ```

2. 在项目根目录登录Vercel：
   ```
   vercel login
   ```

3. 部署应用：
   ```
   vercel
   ```

4. 按照提示操作，完成部署。

5. 在Vercel控制面板中设置环境变量：
   - 前往您的项目设置
   - 找到"Environment Variables"部分
   - 添加`MONGODB_URI`环境变量，值为您的MongoDB连接字符串

## 部署到Netlify

1. 在Netlify上创建一个新站点：
   - 从Git提供商连接您的仓库
   - 设置构建命令：`npm run build`
   - 设置发布目录：`.next`

2. 在Netlify控制面板中设置环境变量：
   - 前往站点设置
   - 找到"Environment"部分
   - 添加`MONGODB_URI`环境变量，值为您的MongoDB连接字符串

## 验证部署

1. 部署完成后，访问您的应用程序。
2. 尝试添加一条点评以测试MongoDB连接是否正常工作。
3. 查看应用程序日志，确保没有连接错误。

## 故障排除

如果您遇到MongoDB连接问题：

1. 确保环境变量已正确设置
2. 检查MongoDB Atlas网络访问设置，确保您的服务器IP被允许
3. 验证用户凭据是否正确
4. 检查应用程序日志中的错误信息

## 更多资源

- [MongoDB Atlas文档](https://docs.atlas.mongodb.com/)
- [Vercel部署文档](https://vercel.com/docs/deployments/overview)
- [Netlify部署文档](https://docs.netlify.com/) 