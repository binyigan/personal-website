const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件设置
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置静态文件目录
app.use(express.static(path.join(__dirname, '../frontend')));

// 路由设置
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API路由 - 联系表单处理
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // 简单的验证
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: '请填写所有必填字段'
        });
    }
    
    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: '请输入有效的邮箱地址'
        });
    }
    
    // 在实际项目中，这里应该发送邮件或保存到数据库
    console.log('收到联系表单提交:');
    console.log(`姓名: ${name}`);
    console.log(`邮箱: ${email}`);
    console.log(`主题: ${subject}`);
    console.log(`消息: ${message}`);
    console.log('---');
    
    res.json({
        success: true,
        message: '消息发送成功！我会尽快回复您。'
    });
});

// API路由 - 获取项目信息
app.get('/api/projects', (req, res) => {
    const projects = [
        {
            id: 1,
            title: '校园预约管理系统',
            description: '一个功能完整的校园设施预约管理系统，支持在线预约、管理和查询。',
            technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
            image: '/images/project1.jpg',
            github: 'https://github.com/username/campus-booking',
            demo: 'https://campus-booking-demo.com'
        },
        {
            id: 2,
            title: '电商平台',
            description: '现代化的电商平台，包含商品展示、购物车、支付等完整功能。',
            technologies: ['Vue.js', 'MySQL', 'Redis', 'Docker'],
            image: '/images/project2.jpg',
            github: 'https://github.com/username/ecommerce',
            demo: 'https://ecommerce-demo.com'
        },
        {
            id: 3,
            title: '个人博客系统',
            description: '响应式个人博客，支持文章发布、分类管理和评论功能。',
            technologies: ['Next.js', 'MongoDB', 'Tailwind CSS'],
            image: '/images/project3.jpg',
            github: 'https://github.com/username/blog',
            demo: 'https://blog-demo.com'
        }
    ];
    
    res.json({
        success: true,
        data: projects
    });
});

// API路由 - 获取技能信息
app.get('/api/skills', (req, res) => {
    const skills = {
        frontend: [
            { name: 'HTML5', level: 90 },
            { name: 'CSS3', level: 85 },
            { name: 'JavaScript', level: 88 },
            { name: 'React', level: 82 },
            { name: 'Vue.js', level: 78 }
        ],
        backend: [
            { name: 'Node.js', level: 85 },
            { name: 'Express', level: 80 },
            { name: 'Python', level: 75 },
            { name: 'Java', level: 70 }
        ],
        database: [
            { name: 'MongoDB', level: 80 },
            { name: 'MySQL', level: 75 },
            { name: 'Redis', level: 70 }
        ],
        tools: [
            { name: 'Git', level: 85 },
            { name: 'Docker', level: 70 },
            { name: 'AWS', level: 65 }
        ]
    };
    
    res.json({
        success: true,
        data: skills
    });
});

// 404处理
app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: '服务器内部错误'
    });
});

// 启动服务器（仅在非Vercel环境下）
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🚀 个人网站服务器已启动`);
        console.log(`📍 本地访问地址: http://localhost:${PORT}`);
        console.log(`⏰ 启动时间: ${new Date().toLocaleString()}`);
        console.log('---');
    });

    // 优雅关闭
    process.on('SIGTERM', () => {
        console.log('收到SIGTERM信号，正在关闭服务器...');
        process.exit(0);
    });

    process.on('SIGINT', () => {
        console.log('\n收到SIGINT信号，正在关闭服务器...');
        process.exit(0);
    });
}

module.exports = app;