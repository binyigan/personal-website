// Vercel Serverless Function for contact form
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理预检请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 只允许POST请求
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: '只允许POST请求'
        });
    }

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
    
    // 配置邮件发送
    const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    // 发送邮件给管理员
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || 'your-email@gmail.com', // 修改为你的邮箱
        subject: `网站联系表单：${subject}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">新的联系表单提交</h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>👤 姓名：</strong>${name}</p>
                    <p><strong>📧 邮箱：</strong><a href="mailto:${email}">${email}</a></p>
                    <p><strong>📝 主题：</strong>${subject}</p>
                    <p><strong>💬 消息内容：</strong></p>
                    <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <p><strong>🕒 提交时间：</strong>${new Date().toLocaleString('zh-CN')}</p>
                </div>
                <p style="color: #666; font-size: 12px;">此邮件由个人网站联系表单自动发送</p>
            </div>
        `,
        replyTo: email // 设置回复地址为用户邮箱
    };
    
    try {
        await transporter.sendMail(mailOptions);
        
        // 记录到控制台（用于调试）
        console.log('✅ 联系表单提交成功:');
        console.log(`姓名: ${name}`);
        console.log(`邮箱: ${email}`);
        console.log(`主题: ${subject}`);
        console.log(`时间: ${new Date().toLocaleString()}`);
        console.log('---');
        
        res.json({
            success: true,
            message: '消息发送成功！我会尽快回复您。'
        });
    } catch (error) {
        console.error('❌ 邮件发送失败:', error);
        
        // 如果邮件发送失败，至少记录到控制台
        console.log('📝 联系表单提交（邮件发送失败，仅记录）:');
        console.log(`姓名: ${name}`);
        console.log(`邮箱: ${email}`);
        console.log(`主题: ${subject}`);
        console.log(`消息: ${message}`);
        console.log(`时间: ${new Date().toLocaleString()}`);
        console.log('---');
        
        res.status(500).json({
            success: false,
            message: '发送失败，请稍后重试或直接发送邮件联系我。'
        });
    }
}