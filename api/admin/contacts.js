// 获取所有联系信息的API
export default async function handler(req, res) {
    // 添加身份验证
    const authHeader = req.headers.authorization;
    if (!authHeader || !verifyAdminToken(authHeader)) {
        return res.status(401).json({ error: '未授权访问' });
    }
    
    try {
        await client.connect();
        const db = client.db('website');
        const contacts = db.collection('contacts');
        
        const allContacts = await contacts
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
            
        res.json({ contacts: allContacts });
    } catch (error) {
        res.status(500).json({ error: '服务器错误' });
    }
}