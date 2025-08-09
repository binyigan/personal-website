# 使用官方Node.js运行时作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY backend/package*.json ./backend/

# 安装依赖
RUN cd backend && npm ci --only=production

# 复制应用代码
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# 更改文件所有权
RUN chown -R nextjs:nodejs /app
USER nextjs

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 启动应用
CMD ["node", "backend/server.js"]