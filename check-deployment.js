#!/usr/bin/env node

const https = require('https');
const http = require('http');
const { URL } = require('url');

// 颜色输出
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
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
            
            const startTime = Date.now();
            
            const req = client.get(url, (res) => {
                const endTime = Date.now();
                const responseTime = endTime - startTime;
                
                resolve({
                    success: true,
                    status: res.statusCode,
                    responseTime,
                    headers: res.headers
                });
            });
            
            req.on('error', (error) => {
                resolve({
                    success: false,
                    error: error.message
                });
            });
            
            req.setTimeout(10000, () => {
                req.destroy();
                resolve({
                    success: false,
                    error: '请求超时'
                });
            });
            
        } catch (error) {
            resolve({
                success: false,
                error: error.message
            });
        }
    });
}

async function checkDeployment() {
    log('🔍 部署状态检查工具', 'cyan');
    log('='.repeat(50), 'cyan');
    
    // 获取用户输入的URL
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('请输入您的网站URL (例如: https://your-site.vercel.app): ', async (url) => {
        rl.close();
        
        if (!url) {
            log('❌ 请提供有效的URL', 'red');
            return;
        }
        
        // 确保URL包含协议
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        log(`\n🌐 检查网站: ${url}`, 'blue');
        
        // 检查主页
        log('\n📄 检查主页...', 'yellow');
        const homeResult = await checkUrl(url);
        
        if (homeResult.success) {
            log(`✅ 主页正常 (${homeResult.status}) - 响应时间: ${homeResult.responseTime}ms`, 'green');
        } else {
            log(`❌ 主页访问失败: ${homeResult.error}`, 'red');
        }
        
        // 检查API端点
        log('\n🔌 检查API端点...', 'yellow');
        const apiResult = await checkUrl(`${url}/api/projects`);
        
        if (apiResult.success) {
            log(`✅ API正常 (${apiResult.status}) - 响应时间: ${apiResult.responseTime}ms`, 'green');
        } else {
            log(`❌ API访问失败: ${apiResult.error}`, 'red');
        }
        
        // 检查静态资源
        log('\n🎨 检查静态资源...', 'yellow');
        const cssResult = await checkUrl(`${url}/styles.css`);
        
        if (cssResult.success) {
            log(`✅ CSS文件正常 (${cssResult.status})`, 'green');
        } else {
            log(`❌ CSS文件访问失败: ${cssResult.error}`, 'red');
        }
        
        const jsResult = await checkUrl(`${url}/script.js`);
        
        if (jsResult.success) {
            log(`✅ JS文件正常 (${jsResult.status})`, 'green');
        } else {
            log(`❌ JS文件访问失败: ${jsResult.error}`, 'red');
        }
        
        // 性能建议
        log('\n📊 性能分析:', 'cyan');
        
        if (homeResult.success) {
            if (homeResult.responseTime < 500) {
                log('🚀 响应速度优秀 (<500ms)', 'green');
            } else if (homeResult.responseTime < 1000) {
                log('⚡ 响应速度良好 (<1s)', 'yellow');
            } else {
                log('🐌 响应速度较慢 (>1s)，建议优化', 'red');
            }
            
            // 检查HTTPS
            if (url.startsWith('https://')) {
                log('🔒 HTTPS已启用', 'green');
            } else {
                log('⚠️  建议启用HTTPS', 'yellow');
            }
            
            // 检查缓存头
            if (homeResult.headers['cache-control']) {
                log('💾 缓存策略已配置', 'green');
            } else {
                log('💾 建议配置缓存策略', 'yellow');
            }
        }
        
        log('\n🎉 检查完成！', 'cyan');
        
        // 提供优化建议
        log('\n💡 优化建议:', 'magenta');
        log('1. 启用CDN加速', 'cyan');
        log('2. 压缩图片资源', 'cyan');
        log('3. 启用Gzip压缩', 'cyan');
        log('4. 配置缓存策略', 'cyan');
        log('5. 添加性能监控', 'cyan');
    });
}

// 如果直接运行此脚本
if (require.main === module) {
    checkDeployment();
}

module.exports = { checkDeployment, checkUrl };