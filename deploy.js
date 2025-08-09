#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

function execCommand(command, description) {
    try {
        log(`\n🔄 ${description}...`, 'blue');
        const output = execSync(command, { encoding: 'utf8', stdio: 'inherit' });
        log(`✅ ${description} 完成`, 'green');
        return output;
    } catch (error) {
        log(`❌ ${description} 失败: ${error.message}`, 'red');
        process.exit(1);
    }
}

function checkCommand(command) {
    try {
        execSync(`${command} --version`, { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

function main() {
    log('🚀 个人网站部署脚本', 'cyan');
    log('='.repeat(50), 'cyan');
    
    // 检查必要的工具
    log('\n📋 检查环境...', 'yellow');
    
    if (!checkCommand('node')) {
        log('❌ Node.js 未安装，请先安装 Node.js', 'red');
        process.exit(1);
    }
    log('✅ Node.js 已安装', 'green');
    
    if (!checkCommand('npm')) {
        log('❌ npm 未安装，请先安装 npm', 'red');
        process.exit(1);
    }
    log('✅ npm 已安装', 'green');
    
    // 安装依赖
    if (fs.existsSync('backend/package.json')) {
        process.chdir('backend');
        execCommand('npm install', '安装后端依赖');
        process.chdir('..');
    }
    
    // 选择部署平台
    log('\n🌐 选择部署平台:', 'yellow');
    log('1. Vercel (推荐)', 'cyan');
    log('2. Netlify', 'cyan');
    log('3. GitHub Pages', 'cyan');
    log('4. 本地测试', 'cyan');
    
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('请选择部署平台 (1-4): ', (answer) => {
        rl.close();
        
        switch (answer.trim()) {
            case '1':
                deployToVercel();
                break;
            case '2':
                deployToNetlify();
                break;
            case '3':
                deployToGitHub();
                break;
            case '4':
                runLocal();
                break;
            default:
                log('❌ 无效选择', 'red');
                process.exit(1);
        }
    });
}

function deployToVercel() {
    log('\n🚀 部署到 Vercel...', 'cyan');
    
    if (!checkCommand('vercel')) {
        log('📦 安装 Vercel CLI...', 'yellow');
        execCommand('npm install -g vercel', '安装 Vercel CLI');
    }
    
    execCommand('vercel', '部署到 Vercel');
    log('\n🎉 部署完成！您的网站已上线！', 'green');
}

function deployToNetlify() {
    log('\n🚀 部署到 Netlify...', 'cyan');
    
    if (!checkCommand('netlify')) {
        log('📦 安装 Netlify CLI...', 'yellow');
        execCommand('npm install -g netlify-cli', '安装 Netlify CLI');
    }
    
    execCommand('netlify deploy', '部署到 Netlify');
    log('\n🎉 部署完成！请运行 "netlify deploy --prod" 进行生产部署', 'green');
}

function deployToGitHub() {
    log('\n🚀 准备 GitHub Pages 部署...', 'cyan');
    
    if (!checkCommand('git')) {
        log('❌ Git 未安装，请先安装 Git', 'red');
        process.exit(1);
    }
    
    log('📝 请按以下步骤完成 GitHub Pages 部署:', 'yellow');
    log('1. 将代码推送到 GitHub 仓库', 'cyan');
    log('2. 在仓库设置中启用 GitHub Pages', 'cyan');
    log('3. 选择 "frontend" 文件夹作为发布目录', 'cyan');
    log('4. 或使用 GitHub Actions 自动部署', 'cyan');
}

function runLocal() {
    log('\n🏠 启动本地服务器...', 'cyan');
    
    process.chdir('backend');
    execCommand('npm start', '启动本地服务器');
}

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

module.exports = { deployToVercel, deployToNetlify, runLocal };