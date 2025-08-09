# 个人网站公网部署指南

本指南将为您介绍多种将个人网站部署到公网的方案，让全世界都能访问您的网站。

## 🚀 推荐部署方案

### 1. Vercel 部署（推荐）⭐

**优势：**
- 免费额度充足
- 自动HTTPS
- 全球CDN加速
- 支持自定义域名
- 与GitHub集成，自动部署

**部署步骤：**

1. **安装Vercel CLI**
```bash
npm install -g vercel
```

2. **登录Vercel**
```bash
vercel login
```

3. **部署项目**
```bash
vercel
```

4. **配置自定义域名（可选）**
   - 在Vercel控制台添加域名
   - 配置DNS记录

**访问地址：** `https://your-project-name.vercel.app`

### 2. Netlify 部署

**优势：**
- 免费额度丰富
- 表单处理功能
- 分支预览
- 自动部署

**部署步骤：**

1. **创建Netlify账户**
   访问 [netlify.com](https://netlify.com)

2. **连接GitHub仓库**
   - 将代码推送到GitHub
   - 在Netlify中连接仓库

3. **配置构建设置**
   - Build command: `npm run build`
   - Publish directory: `frontend`

**访问地址：** `https://your-site-name.netlify.app`

### 3. GitHub Pages 部署

**优势：**
- 完全免费
- 与GitHub深度集成
- 简单易用

**限制：**
- 仅支持静态网站
- 需要修改项目结构

**部署步骤：**

1. **推送代码到GitHub**
2. **启用GitHub Pages**
   - 进入仓库设置
   - 选择Pages选项
   - 选择分支和文件夹

**访问地址：** `https://username.github.io/repository-name`

### 4. 云服务器部署

**适用场景：**
- 需要完全控制
- 复杂的后端逻辑
- 数据库集成

**推荐服务商：**
- 阿里云ECS
- 腾讯云CVM
- AWS EC2
- DigitalOcean

## 📋 部署前准备

### 1. 环境变量配置

创建 `.env` 文件（如需要）：
```env
PORT=3000
NODE_ENV=production
```

### 2. 生产环境优化

在 `package.json` 中添加构建脚本：
```json
{
  "scripts": {
    "build": "echo 'Build completed'",
    "start": "node backend/server.js",
    "dev": "nodemon backend/server.js"
  }
}
```

## 🔧 配置文件说明

### Vercel配置 (vercel.json)

项目已包含Vercel配置文件，支持：
- 静态文件服务
- API路由
- 自动重定向

### Netlify配置

需要创建 `netlify.toml` 文件：
```toml
[build]
  command = "npm run build"
  publish = "frontend"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🌐 自定义域名配置

### 1. 购买域名

推荐域名注册商：
- 阿里云万网
- 腾讯云
- GoDaddy
- Namecheap

### 2. DNS配置

**Vercel:**
```
A记录: @ -> 76.76.19.19
CNAME: www -> cname.vercel-dns.com
```

**Netlify:**
```
A记录: @ -> 75.2.60.5
CNAME: www -> your-site.netlify.app
```

## 📊 性能优化建议

### 1. 图片优化
- 使用WebP格式
- 压缩图片大小
- 使用CDN加速

### 2. 代码优化
- 压缩CSS和JavaScript
- 启用Gzip压缩
- 使用缓存策略

### 3. SEO优化
- 添加meta标签
- 生成sitemap.xml
- 配置robots.txt

## 🔒 安全配置

### 1. HTTPS配置
所有推荐的平台都自动提供HTTPS

### 2. 环境变量
不要在代码中暴露敏感信息

### 3. CORS配置
```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
```

## 📈 监控和分析

### 1. Google Analytics
在HTML中添加跟踪代码

### 2. 性能监控
- Vercel Analytics
- Netlify Analytics
- Google PageSpeed Insights

## 🆘 常见问题解决

### 1. 部署失败
- 检查Node.js版本
- 确认依赖安装完整
- 查看构建日志

### 2. 404错误
- 检查路由配置
- 确认文件路径正确
- 配置重定向规则

### 3. API不工作
- 检查API路由配置
- 确认服务器函数设置
- 查看网络请求日志

## 💡 下一步建议

1. **选择部署平台**：推荐从Vercel开始
2. **配置自定义域名**：提升专业形象
3. **添加监控**：了解网站访问情况
4. **持续优化**：根据用户反馈改进

---

🎉 **恭喜！** 按照本指南，您的个人网站很快就能在全球范围内访问了！

如有问题，请参考各平台的官方文档或寻求技术支持。