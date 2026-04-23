import subprocess
import sys
import os

# --- 配置区 ---
BLOG_PATH = r"D:\LdsSec-blog"
DEFAULT_COMMIT_MSG = "Update blog content"

def run_git_cmd(cmd_list, description):
    """执行 Git 命令并处理输出"""
    print(f"[*] 正在执行: {description}...")
    try:
        # 使用 subprocess.run 捕获 stdout 和 stderr
        result = subprocess.run(cmd_list, check=True, text=True, capture_output=True, shell=True)
        if result.stdout:
            print(result.stdout.strip())
        return True
    except subprocess.CalledProcessError as e:
        # 如果是 commit 报错且提示没有文件可提交，这不算真正的错误
        if "git commit" in str(cmd_list) and ("nothing to commit" in e.stdout or "nothing to commit" in e.stderr):
            print("[!] 提示: 没有任何文件变动，跳过提交。")
            return False # 返回 False 停止后续 push
        
        print(f"\n[!] {description} 失败！")
        print(f"[!] 错误回显:\n{e.stderr if e.stderr else e.stdout}")
        return False

def deploy():
    if not os.path.exists(BLOG_PATH):
        print(f"[!] 错误: 路径 {BLOG_PATH} 不存在，请检查配置。")
        return

    os.chdir(BLOG_PATH)
    
    # 获取备注信息
    commit_msg = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_COMMIT_MSG

    # 1. Git Add
    if not run_git_cmd(["git", "add", "."], "暂存文件"):
        return

    # 2. Git Commit
    # 特殊处理：如果 commit 失败且是因为没东西提交，就不执行后面的 push
    if not run_git_cmd(["git", "commit", "-m", f'"{commit_msg}"'], "提交更改"):
        return

    # 3. Git Push
    if not run_git_cmd(["git", "push"], "推送到 GitHub"):
        print("\n[?] 建议: 如果是超时，请检查代理；如果是权限问题，请检查 SSH/Token。")
        return

    print("\n" + "="*30)
    print("🎉 部署成功！Ta1ntF10w 博客已更新。")
    print("="*30)

if __name__ == "__main__":
    deploy()