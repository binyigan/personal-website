# 个人网站项目

一个现代化、响应式的个人网站，展示个人信息、技能、项目和联系方式。

## 🌟 特性

- **响应式设计** - 完美适配桌面端、平板和移动设备
- **现代化UI** - 使用渐变背景、毛玻璃效果和平滑动画
- **交互体验** - 平滑滚动、悬停效果和动态加载
- **联系表单** - 功能完整的联系表单，支持表单验证
- **项目展示** - 精美的项目卡片展示
- **技能展示** - 直观的技能图标展示
- **SEO友好** - 语义化HTML结构

## 🛠️ 技术栈

### 前端
- HTML5
- CSS3 (Flexbox, Grid, 动画)
- JavaScript (ES6+)
- Font Awesome 图标

### 后端
- Node.js
- Express.js
- 静态文件服务

## 📁 项目结构

```
校园预约管理系统/
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── README.md
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

或者启动生产服务器：

```bash
npm start
```

### 3. 访问网站

打开浏览器访问：`http://localhost:3000`

## 📱 页面结构

### 主页 (Hero Section)
- 个人介绍
- 职业描述
- 行动按钮
- 个人头像区域

### 关于我 (About Section)
- 个人故事
- 技能展示
- 专业经验

### 项目展示 (Projects Section)
- 项目卡片
- 技术标签
- 项目链接

### 联系方式 (Contact Section)
- 联系信息
- 社交媒体链接
- 联系表单

## 🎨 自定义配置

### 修改个人信息

1. **基本信息**：编辑 `frontend/index.html` 中的以下内容：
   - 姓名和职业
   - 个人描述
   - 联系信息

2. **项目信息**：在 `backend/server.js` 的 `/api/projects` 路由中修改项目数据

3. **技能信息**：在 `backend/server.js` 的 `/api/skills` 路由中修改技能数据

### 修改样式

- **颜色主题**：编辑 `frontend/styles.css` 中的颜色变量
- **字体**：修改 CSS 中的 `font-family` 属性
- **布局**：调整 Grid 和 Flexbox 布局

### 添加新功能

- **博客功能**：可以添加博客页面和文章管理
- **后台管理**：添加内容管理系统
- **数据库集成**：连接 MongoDB 或 MySQL
- **邮件服务**：集成 Nodemailer 发送邮件

## 📋 API 接口

### GET /api/projects
获取项目列表

### GET /api/skills
获取技能信息

### POST /api/contact
提交联系表单

**请求体：**
```json
{
  "name": "姓名",
  "email": "邮箱",
  "subject": "主题",
  "message": "消息内容"
}
```

## 🔧 部署

### Vercel 部署

1. 安装 Vercel CLI：
```bash
npm i -g vercel
```

2. 在项目根目录运行：
```bash
vercel
```

### 传统服务器部署

1. 将项目文件上传到服务器
2. 安装 Node.js 和 npm
3. 安装依赖：`npm install`
4. 启动服务：`npm start`
5. 配置反向代理（Nginx）

## 🌐 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 📝 待办事项

- [ ] 添加深色模式
- [ ] 集成 Google Analytics
- [ ] 添加多语言支持
- [ ] 优化 SEO
- [ ] 添加博客功能
- [ ] 集成 CMS

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📞 联系方式

如果您有任何问题或建议，请通过以下方式联系：

- 邮箱：example@email.com
- GitHub：[您的GitHub用户名]
- 微信：[您的微信号]

---

⭐ 如果这个项目对您有帮助，请给它一个星标！