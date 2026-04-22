import subprocess
import sys
import os

# --- 配置区 ---
# 你的博客本地绝对路径
BLOG_PATH = r"D:\LdsSec-blog"
# 默认的提交信息（如果没有输入参数）
DEFAULT_COMMIT_MSG = "Update blog content"

def run_command(command):
    """执行系统命令并实时打印输出"""
    print(f"[*] 执行命令: {command}")
    try:
        # 使用 shell=True 兼容 Windows 环境
        result = subprocess.run(command, shell=True, check=True, text=True, capture_output=True)
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"[!] 错误: 命令执行失败")
        print(e.stderr)
        return False

def deploy():
    # 1. 确保在正确的目录下
    os.chdir(BLOG_PATH)
    print(f"[*] 当前工作目录: {os.getcwd()}")

    # 2. 获取 Commit Message
    # 如果运行脚本时带了参数，如 python deploy.py "完成 CC1 分析"，则使用参数作为备注
    commit_msg = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_COMMIT_MSG

    # 3. 自动化三件套
    commands = [
        "git add .",
        f'git commit -m "{commit_msg}"',
        "git push"
    ]

    for cmd in commands:
        if not run_command(cmd):
            print("[!] 部署流程中断。")
            break
    else:
        print("\n" + "="*30)
        print("🎉 任务圆满完成！代码已同步至 Ta1ntF10w.github.io")
        print("="*30)

if __name__ == "__main__":
    deploy()