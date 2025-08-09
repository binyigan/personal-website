// Vercel Serverless Function for projects data
export default function handler(req, res) {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理预检请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 只允许GET请求
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: '只允许GET请求'
        });
    }

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
}