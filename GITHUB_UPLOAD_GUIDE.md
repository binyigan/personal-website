# 📚 GitHub 上传指南

本指南将帮助您将个人网站项目上传到GitHub仓库。

## 🚀 方法一：在GitHub网站创建新仓库（推荐）

### 步骤1：在GitHub创建新仓库

1. **登录GitHub**
   - 访问 [github.com](https://github.com)
   - 使用您的账户登录

2. **创建新仓库**
   - 点击右上角的 "+" 按钮
   - 选择 "New repository"
   - 仓库名称：`personal-website`（或您喜欢的名称）
   - 描述：`现代化个人网站 - 展示个人信息、技能和项目`
   - 设置为 **Public**（公开）
   - **不要**勾选 "Add a README file"
   - **不要**勾选 "Add .gitignore"
   - **不要**勾选 "Choose a license"
   - 点击 "Create repository"

### 步骤2：连接本地仓库到GitHub

在项目目录中运行以下命令：

```bash
# 移除旧的远程仓库（如果存在）
git remote remove origin

# 添加新的GitHub仓库地址（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/personal-website.git

# 推送代码到GitHub
git push -u origin main
```

## 🔄 方法二：使用GitHub CLI（高级用户）

### 安装GitHub CLI

1. **下载安装**
   - 访问 [cli.github.com](https://cli.github.com)
   - 下载并安装GitHub CLI

2. **登录GitHub**
```bash
gh auth login
```

3. **创建仓库并推送**
```bash
# 创建GitHub仓库
gh repo create personal-website --public --description "现代化个人网站"

# 推送代码
git push -u origin main
```

## 📋 完整的命令序列

假设您的GitHub用户名是 `your-username`，请按顺序执行：

```bash
# 1. 检查当前状态
git status

# 2. 添加所有文件
git add .

# 3. 提交更改
git commit -m "feat: 初始化个人网站项目"

# 4. 设置远程仓库（替换your-username）
git remote add origin https://github.com/your-username/personal-website.git

# 5. 推送到GitHub
git push -u origin main
```

## 🔧 常见问题解决

### 问题1："Repository not found"

**原因：** GitHub仓库不存在或URL错误

**解决方案：**
1. 确认在GitHub上已创建仓库
2. 检查仓库URL是否正确
3. 确认用户名拼写正确

### 问题2："Permission denied"

**原因：** 没有推送权限或认证失败

**解决方案：**
1. 确认您是仓库的所有者
2. 重新进行GitHub认证：
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 问题3："Authentication failed"

**原因：** 需要使用Personal Access Token

**解决方案：**
1. 在GitHub设置中创建Personal Access Token
2. 使用Token作为密码进行认证

## 🎯 推送成功后的步骤

### 1. 验证上传
- 访问您的GitHub仓库页面
- 确认所有文件都已上传
- 检查README.md是否正确显示

### 2. 启用GitHub Pages（可选）
- 进入仓库设置
- 找到 "Pages" 选项
- 选择 "Deploy from a branch"
- 选择 "main" 分支和 "/ (root)" 文件夹
- 保存设置

### 3. 配置自动部署
- GitHub Actions工作流已包含在项目中
- 推送代码后会自动触发部署
- 查看 "Actions" 标签页了解部署状态

## 📱 移动端操作

如果您使用GitHub移动应用：

1. 打开GitHub应用
2. 点击 "+" 创建新仓库
3. 填写仓库信息
4. 在电脑上使用命令行推送代码

## 🔒 安全建议

1. **不要提交敏感信息**
   - API密钥
   - 密码
   - 个人身份信息

2. **使用.gitignore**
   - 项目已包含完整的.gitignore文件
   - 自动排除node_modules等不必要文件

3. **定期更新**
   - 保持依赖包更新
   - 定期检查安全漏洞

## 🎉 成功标志

当您看到以下信息时，说明上传成功：

```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
Delta compression using up to X threads
Compressing objects: 100% (X/X), done.
Writing objects: 100% (X/X), X.XX KiB | X.XX MiB/s, done.
Total X (delta X), reused X (delta X), pack-reused 0
remote: Resolving deltas: 100% (X/X), done.
To https://github.com/your-username/personal-website.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## 📞 获取帮助

如果遇到问题：

1. **查看Git状态**：`git status`
2. **查看远程仓库**：`git remote -v`
3. **查看提交历史**：`git log --oneline`
4. **GitHub文档**：[docs.github.com](https://docs.github.com)
5. **Git文档**：[git-scm.com](https://git-scm.com)

---

🎊 **恭喜！** 完成上传后，您的代码将安全存储在GitHub上，并且可以轻松地与他人分享和协作！