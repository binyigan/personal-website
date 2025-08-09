#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

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
        return null;
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

async function getUserInput(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function main() {
    log('📚 GitHub 上传助手', 'cyan');
    log('='.repeat(50), 'cyan');
    
    // 检查Git是否安装
    if (!checkCommand('git')) {
        log('❌ Git 未安装，请先安装 Git', 'red');
        log('下载地址: https://git-scm.com/downloads', 'yellow');
        process.exit(1);
    }
    log('✅ Git 已安装', 'green');
    
    // 检查是否在Git仓库中
    try {
        execSync('git rev-parse --git-dir', { stdio: 'ignore' });
        log('✅ 当前目录是Git仓库', 'green');
    } catch {
        log('❌ 当前目录不是Git仓库，正在初始化...', 'yellow');
        execCommand('git init', '初始化Git仓库');
    }
    
    // 获取用户信息
    log('\n📝 请提供GitHub信息:', 'yellow');
    
    const username = await getUserInput('GitHub 用户名: ');
    if (!username) {
        log('❌ 用户名不能为空', 'red');
        process.exit(1);
    }
    
    const repoName = await getUserInput('仓库名称 (默认: personal-website): ') || 'personal-website';
    
    const repoUrl = `https://github.com/${username}/${repoName}.git`;
    
    log(`\n🔗 将连接到仓库: ${repoUrl}`, 'cyan');
    
    // 检查Git配置
    try {
        const gitUser = execSync('git config user.name', { encoding: 'utf8' }).trim();
        const gitEmail = execSync('git config user.email', { encoding: 'utf8' }).trim();
        log(`✅ Git用户配置: ${gitUser} <${gitEmail}>`, 'green');
    } catch {
        log('⚠️  Git用户信息未配置', 'yellow');
        const name = await getUserInput('您的姓名: ');
        const email = await getUserInput('您的邮箱: ');
        
        if (name && email) {
            execCommand(`git config user.name "${name}"`, '设置Git用户名');
            execCommand(`git config user.email "${email}"`, '设置Git邮箱');
        }
    }
    
    // 添加文件到暂存区
    execCommand('git add .', '添加文件到暂存区');
    
    // 检查是否有更改需要提交
    try {
        execSync('git diff --cached --quiet', { stdio: 'ignore' });
        log('ℹ️  没有新的更改需要提交', 'yellow');
    } catch {
        // 有更改需要提交
        const commitMessage = await getUserInput('提交信息 (默认: 更新个人网站项目): ') || '更新个人网站项目';
        execCommand(`git commit -m "${commitMessage}"`, '提交更改');
    }
    
    // 检查并设置远程仓库
    try {
        const currentRemote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
        if (currentRemote !== repoUrl) {
            log('🔄 更新远程仓库地址...', 'blue');
            execCommand('git remote remove origin', '移除旧的远程仓库');
            execCommand(`git remote add origin ${repoUrl}`, '添加新的远程仓库');
        } else {
            log('✅ 远程仓库已正确配置', 'green');
        }
    } catch {
        execCommand(`git remote add origin ${repoUrl}`, '添加远程仓库');
    }
    
    // 推送到GitHub
    log('\n🚀 准备推送到GitHub...', 'cyan');
    log('⚠️  如果这是第一次推送，可能需要在浏览器中进行身份验证', 'yellow');
    
    const pushResult = execCommand('git push -u origin main', '推送到GitHub');
    
    if (pushResult !== null) {
        log('\n🎉 成功上传到GitHub！', 'green');
        log(`📍 仓库地址: https://github.com/${username}/${repoName}`, 'cyan');
        log(`🌐 GitHub Pages (如果启用): https://${username}.github.io/${repoName}`, 'cyan');
        
        log('\n📋 后续步骤:', 'yellow');
        log('1. 访问GitHub仓库页面确认文件已上传', 'cyan');
        log('2. 在仓库设置中启用GitHub Pages（可选）', 'cyan');
        log('3. 配置自定义域名（可选）', 'cyan');
        log('4. 设置自动部署到Vercel或Netlify', 'cyan');
        
    } else {
        log('\n❌ 上传失败，请检查以下几点:', 'red');
        log('1. GitHub仓库是否已创建', 'yellow');
        log('2. 用户名和仓库名是否正确', 'yellow');
        log('3. 是否有推送权限', 'yellow');
        log('4. 网络连接是否正常', 'yellow');
        
        log('\n💡 解决方案:', 'cyan');
        log('1. 在GitHub网站上手动创建仓库', 'cyan');
        log('2. 检查GitHub用户名拼写', 'cyan');
        log('3. 使用Personal Access Token进行认证', 'cyan');
        log('4. 查看详细的GitHub上传指南: GITHUB_UPLOAD_GUIDE.md', 'cyan');
    }
}

// 错误处理
process.on('SIGINT', () => {
    log('\n\n👋 上传已取消', 'yellow');
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    log(`\n❌ 发生错误: ${error.message}`, 'red');
    log('请查看 GITHUB_UPLOAD_GUIDE.md 获取详细帮助', 'yellow');
    process.exit(1);
});

// 如果直接运行此脚本
if (require.main === module) {
    main().catch((error) => {
        log(`\n❌ 发生错误: ${error.message}`, 'red');
        process.exit(1);
    });
}

module.exports = { main };