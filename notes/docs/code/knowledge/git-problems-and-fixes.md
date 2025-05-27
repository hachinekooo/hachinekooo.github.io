---
title: Git 如何在本地隐藏文件改动但继续追踪管理（使用 assume-unchanged）
icon: file
order: 
date: 2025-04-29
category:
  - 知识
tags:
  - Git
---
## 团队开发时分支和提交消息书写格式
### 分支

| **类型前缀**  | **说明**     | **示例**          |
| --------- | ---------- | --------------- |
| feature/  | 新功能        | feature/添加用户 API |
| fix/      | 修复 bug     | fix/修复用户登陆失败    |
| refactor/ | 重构，不影响业务   | refactor/重构订单服务 |
| hotfix/   | 紧急修复生产问题   | hotfix/修复空指针问题  |
| test/     | 测试相关       | test/测试用户服务     |
| chore/    | 杂项、构建脚本、文档 | chore/更新 readme  |
### 提交
| **类型前缀**  | **说明**     | **示例**                             |
| --------- | ---------- | ---------------------------------- |
| feat/     | 新添加了内容     | feat: 模块 A - 模块 1 - 添加了 XXX        |
| fix/      | 修复 bug     | fix: 模块 A - 模块 1 - 修复了 XXXX，解决了 XXX |
| refactor/ | 重构，不影响业务   | refactor: 模块 A - 模块 1 - 重构了 XXX     |
- 如果这是产品新提出的要求 —— 这是一个新规则逻辑，不是 bug ⇒ feat
- 如果产品说：“早就说了不能显示，你怎么一开始显示了？” —— 这算是修 bug ⇒ fix

## 取消某些文件的追踪
在实际开发中，有时我们不希望 Git 工作区中出现某些文件的改动提示，但又希望它们继续被 Git 追踪管理，例如常见于：
- 本地临时修改了依赖文件（如 package.json、pnpm-lock.yaml）
- 调试用的配置文件，不希望频繁提交
- 保持 git status 界面清爽

场景再现：

你克隆下来一个新项目，安装依赖后发现 package.json 和 pnpm-lock.yaml 两个文件中多了一点新内容，即有改动了，这个时候 GIT 会追踪改动。这个时候你在 IDE 中版本管理窗口中会看到 package.json 和 pnpm-lock.yaml 文件更改标签页下，或者使用 `git status` 也可以看到文件被修改的提示：
```shell
git status
On branch xxx
Your branch is up to date with 'origin/xxx'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   src/views/xxx/xxx/index.vue               <---- 提示 modified

no changes added to commit (use "git add" and/or "git commit -a")
```

虽然我们可以在实际 commit，即存到暂存区的时候不选择这些文件，但是操作起来不便。

推荐解决方案：

继续追踪，但忽略本地改动，**让 Git 继续追踪它们（版本库里有），但忽略你本地的改动提示**。

在合适的目录下执行命令：
```shell
git update-index --assume-unchanged package.json pnpm-lock.yaml
```
- assume-unchanged：告诉 Git，假设这个文件没有改动。
- 本地你怎么改都行，Git 不会再告诉你“modified”，也就不会出现在更改标签页下

如果以后又想恢复正常跟踪，可以用：
```shell
git update-index --no-assume-unchanged package.json pnpm-lock.yaml
```

查看哪些文件 assume-unchanged：
```shell
git ls-files -v | grep '^h'
```
- git ls-files -v：列出所有 Git 管理的文件，并附带一列状态标记。
    - h：代表 **assume-unchanged**（h = “hidden” 的意思，可以理解成 “Git 假装看不见”）
- grep '^h'：只筛选出状态是 h 的文件
## 功能分支与 DEV 分支差异过大
### 方法 1:变基
```shell
# 确保当前在功能分支
git checkout feature/api-update-stock

# 拉取最新 dev 分支
git fetch origin
git rebase origin/dev
```
- 如果有冲突，按提示一个个解决后 git rebase --continue
- 可以讲你在功能分支上你开发好的内容保留，整个分支变成“基于最新版 dev”
- 提交历史也比较清爽，不会产生合并的 commit

在 IDE 中的操作：
> **永远先 checkout 到你想继续开发的功能分支，然后 rebase 到主干（比如 dev）上**

### 方法 2: 合并
```shell
git checkout feature/api-update-stock
git merge origin/dev
```
- 简单、不会丢任何提交
- 会产生合并 commit，Git 历史不够清爽


## 忽略已经被版本管理的文件
### 场景再现
>有时候我们会在 IDEA GIT 提交窗口看到很多我们不想看到的文件，例如 `.log`。于是我们修改 `.gitignore` 文件在其中加入 `.log`，但是刷新一看 `.log` 文件还是存在。  
>这是因为 `.gitignore` 只能忽略未被 track 的文件(即未加入到暂存区)。如果某些文件已经被纳入了暂存区中(加入暂存区即该文件被版本管理了)，则修改 `.gitignore` 是无效的

### 查看文件管理情况
查看当前 Git 仓库中已经被版本管理的文件
```
git ls-files
```

查看当前目录的文件状态
git status 输出解读：
- 已被版本管理的文件：在 Changes not staged for commit 或 Changes to be committed 部分。
- 未被版本管理的文件：显示在 Untracked files 部分。
```
git status
```

### 删除被版本管理文件并重新添加

删除所有已经被纳入版本管理的文件
```
git rm -r --cached .
```

将当前工作目录下的所有**修改过的文件**和**新建的未被追踪的文件**添加到 Git 暂存区（Staging Area）。
```
git add .
```

将暂存区中的更改记录为一次新的提交，将暂存区的更改提交到仓库。
```
git commit -m 'update .gitignore'
```