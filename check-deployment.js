#!/usr/bin/env node

const https = require('https');
const http = require('http');
const { URL } = require('url');

// 颜色输出
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkUrl(url) {
    return new Promise((resolve) => {
        try {
            const urlObj = new URL(url);
            const client = urlObj.protocol === 'https:' ? https : http;
            
            const req = client.get(url, (res) => {
                resolve({
                    url,
                    status: res.statusCode,
                    success: res.statusCode >= 200 && res.statusCode < 400,
                    headers: res.headers
                });
            });
            
            req.on('error', (error) => {
                resolve({
                    url,
                    status: 0,
                    success: false,
                    error: error.message
                });
            });
            
            req.setTimeout(10000, () => {
                req.destroy();
                resolve({
                    url,
                    status: 0,
                    success: false,
                    error: '请求超时'
                });
            });
        } catch (error) {
            resolve({
                url,
                status: 0,
                success: false,
                error: error.message
            });
        }
    });
}

async function checkDeployment() {
    log('🔍 检查部署状态...', 'cyan');
    log('='.repeat(50), 'cyan');
    
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('请输入您的网站URL (例如: https://your-site.vercel.app): ', async (url) => {
        rl.close();
        
        if (!url.trim()) {
            log('❌ 请提供有效的URL', 'red');
            return;
        }
        
        // 确保URL包含协议
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        log(`\n🌐 检查网站: ${url}`, 'blue');
        
        // 检查主页
        const homeResult = await checkUrl(url);
        displayResult('主页', homeResult);
        
        // 检查API端点
        const apiUrls = [
            `${url}/api/projects`,
            `${url}/api/skills`
        ];
        
        for (const apiUrl of apiUrls) {
            const result = await checkUrl(apiUrl);
            displayResult(`API: ${apiUrl.split('/').pop()}`, result);
        }
        
        // 检查静态资源
        const staticUrls = [
            `${url}/styles.css`,
            `${url}/script.js`
        ];
        
        for (const staticUrl of staticUrls) {
            const result = await checkUrl(staticUrl);
            displayResult(`静态文件: ${staticUrl.split('/').pop()}`, result);
        }
        
        log('\n📊 检查完成！', 'cyan');
        
        // 性能建议
        if (homeResult.success) {
            log('\n💡 优化建议:', 'yellow');
            
            if (homeResult.headers['content-encoding'] !== 'gzip') {
                log('• 启用Gzip压缩以提高加载速度', 'yellow');
            }
            
            if (!homeResult.headers['strict-transport-security']) {
                log('• 添加HSTS头以提高安全性', 'yellow');
            }
            
            if (!homeResult.headers['x-frame-options']) {
                log('• 添加安全头以防止点击劫持', 'yellow');
            }
            
            log('• 考虑添加CDN以提高全球访问速度', 'yellow');
            log('• 定期监控网站性能和可用性', 'yellow');
        }
    });
}

function displayResult(name, result) {
    if (result.success) {
        log(`✅ ${name}: ${result.status} - 正常`, 'green');
    } else {
        log(`❌ ${name}: ${result.status || '失败'} - ${result.error || '错误'}`, 'red');
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    checkDeployment();
}

module.exports = { checkUrl, checkDeployment };