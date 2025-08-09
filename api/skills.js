// Vercel Serverless Function for skills data
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
}