---
sender: "Hinbox"
subject: "allow all other tools"
snippet: ""
overview: >
  
date: "2025-12-02"
labels: ["Inbox"]
isStarred: false
isRead: false
mdTheme: amp
---

## 为什么选择 Amp？

> 恭喜你安装了 Amp。本手册将帮助你充分利用它。


Amp 是由 Sourcegraph 打造的、面向终端和编辑器的前沿编码智能体（Agent）。

- **多模型（Multi-Model）：** Sonnet、GPT-5、快速模型——Amp 会根据每个模型的特长，综合使用它们。
- **观点鲜明（Opinionated）：** 你始终使用的是 Amp 最好的部分。如果我们不使用也不喜欢某个功能，我们就会砍掉它。
- **处于前沿（On the Frontier）：** 模型发展到哪里，Amp 就跟进到哪里。没有向后兼容，没有遗留功能。
- **会话（Threads）：** 你可以保存并分享你与 Amp 的交互。写代码时你不会不用版本控制，对吧？

Amp 有 2 种模式：`smart`（无限制使用最先进的模型）和 `free`（免费，使用快速的基础模型）。

*想要深入了解吗？请收听我们的 [Raising an Agent 播客](https://ampcode.com/podcast)，其中记录了构建 Amp 最初几个月的过程，或者查看我们的 [FIF](https://ampcode.com/fif)。*

<video controls="" width="768" height="551"><source src="https://static.ampcode.com/content/amp-cli-20251026-0.mp4" type="video/mp4"></video> ![VS Code 中的 Amp](https://static.ampcode.com/content/amp-vscode-1.png)

## 快速开始

1. 登录 [ampcode.com/install](https://ampcode.com/install)。
2. 按照说明安装 Amp CLI 以及适用于 VS Code、Cursor、JetBrains、Neovim 和其他编辑器的扩展。

你已经准备好 [开始使用 Amp](https://ampcode.com/#usage) 了！

  
  

### 从命令行使用

### 从编辑器使用

登录 [ampcode.com/install](https://ampcode.com/install) 并按照说明操作，或者：

- **VS Code 和 Cursor（以及其他分支）：** 从 [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=sourcegraph.amp) 或 [Open VSX Registry](https://open-vsx.org/extension/sourcegraph/amp) 安装 `sourcegraph.amp` 扩展。
- **JetBrains (IntelliJ, WebStorm, GoLand 等)：** 安装 Amp CLI，然后运行 `amp --jetbrains`。
- **Neovim：** 安装 Amp CLI 和 [Amp Neovim 插件](https://github.com/sourcegraph/amp.nvim)，然后运行 `amp --ide`。

## 使用 Amp

### 智能体模式 (Agent Modes)

Amp 有 3 种模式：

- **`smart`**：无限制地使用最先进的模型，以获得最大的能力和自主性。这是默认模式，使用 [付费额度](https://ampcode.com/#paid-usage)。
- **`rush`**：更快、更便宜，但能力稍弱，适合小型、明确的任务。参见 [Rush 模式](https://ampcode.com/news/rush-mode)。
- **`free`**：免费，使用快速的基础模型。参见 [Amp Free](https://ampcode.com/#free)。

在 CLI 中通过打开命令面板 (Ctrl+O) 输入 `mode` 来切换模式，或者在编辑器扩展的提示词输入框中选择模式。

### 如何编写提示词 (How to Prompt)

Amp 目前使用 Gemini 3 处理大多数任务，拥有高达 100 万 token 的上下文。为了获得最佳结果，请遵循以下准则：

- 明确你的需求。与其问“你能做 X 吗？”，不如直接说“做 X”。
- 保持简短，保持专注。将非常大的任务分解为较小的子任务，每个会话（Thread）处理一个。不要要求智能体在一个修改了文档页面 CSS 的会话中去编写数据库迁移脚本。
- 不要让模型去猜。如果你知道如何实现你想要的效果——比如查看哪些文件、运行哪些命令——请将其放入你的提示词中。
- 如果你希望模型不编写任何代码，只进行研究和规划，请直说：“只规划如何实现这一点。**不要**编写任何代码。”
- 使用 [`AGENTS.md` 文件](https://ampcode.com/#AGENTS.md) 来指导 Amp 如何运行你的测试和构建步骤，并避免常见错误。
- 如果会话积累了太多噪音，请放弃它。有时事情会出错，失败的尝试和错误信息会弄乱上下文窗口。在这些情况下，最好重新开启一个会话，使用干净的上下文窗口。
- 告诉智能体如何最好地检查其工作：运行什么命令或测试、打开什么 URL、读取哪些日志。反馈对智能体的帮助就像对我们的帮助一样大。

会话中的第一个提示词分量很重。它为接下来的对话设定了方向。我们鼓励你认真对待它。这就是为什么我们在 Amp 中使用 Cmd/Ctrl+Enter 来提交消息——这是一个提醒，让你在提示词上多花点心思。

以下是我们使用 Amp 时的一些提示词示例：

- “让 `observeThreadGuidanceFiles` 返回 `Omit<ResolvedGuidanceFile, 'content'>[]` 并从其返回值中移除该字段，同时更新测试。注意：省略它是为了节省视图 API 传输的数据量，因为这些地方不需要文件内容。” ([查看会话](https://ampcode.com/threads/T-9219191b-346b-418a-b521-7dc54fcf7f56))
- “运行 `<build command>` 并修复所有错误”
- “查看 `<local development server url>` 以检查这个 UI 组件。然后修改它，使其看起来更简约。通过截图该 URL 来频繁检查你的工作”
- “对我打开的文件运行 git blame，找出是谁添加了那个新标题”
- “将这 5 个文件转换为使用 Tailwind，每个文件使用一个子智能体 (subagent)”
- “看一看 `git diff`——有人帮我构建了一个调试工具，可以直接用 JSON 编辑 Thread。请分析代码，看看它是如何工作的以及如何改进。[…]” ([查看会话](https://ampcode.com/threads/T-39dc399d-08cc-4b10-ab17-e6bac8badea7))
- “检查 `git diff --staged` 并删除某人添加的调试语句” ([查看会话](https://ampcode.com/threads/T-66beb0de-7f02-4241-a25e-50c0dc811788))
- “使用 git log 找到添加此功能的提交，查看整个提交，然后帮我更改此功能”
- “用图表解释类 AutoScroller 和 ViewUpdater 之间的关系”
- “运行 `psql` 并将数据库中所有的 `threads` 重新连接到我的用户（邮箱以 thorsten 开头）” ([查看会话](https://ampcode.com/threads/T-f810ef79-ba0e-4338-87c6-dbbb9085400a))

另请参阅 Thorsten Ball 的文章 [我如何使用 Amp](https://ampcode.com/how-i-use-amp)。

如果你在一个工作区中，可以使用 Amp 的 [会话共享 (thread sharing)](https://ampcode.com/#thread-sharing) 来互相学习。

### AGENTS.md

Amp 会在 `AGENTS.md` 文件中查找有关代码库结构、构建/测试命令和规范的指导。

| 文件 | 示例 |
| --- | --- |
| `AGENTS.md` (位于当前工作目录、父目录及子树中) | 架构、构建/测试命令、内部 API 概览、审查和发布步骤 |
| `$HOME/.config/amp/AGENTS.md` <br> `$HOME/.config/AGENTS.md` | 个人偏好、设备特定命令，以及在提交到仓库前你在本地测试的指导 |

Amp 会自动包含 `AGENTS.md` 文件：

- 当前工作目录（或编辑器工作区根目录）*以及*父目录（一直到 `$HOME`）中的 `AGENTS.md` 文件总是被包含。
- 当智能体读取子树中的文件时，该子树的 `AGENTS.md` 文件会被包含。
- `$HOME/.config/amp/AGENTS.md` 和 `$HOME/.config/AGENTS.md` 如果存在，都会被包含。

如果在目录中不存在 `AGENTS.md`，但存在名为 `AGENT.md`（没有 `S`）或 `CLAUDE.md` 的文件，该文件将被包含。

在具有多个子项目的大型存储库中，我们建议保持顶层 `AGENTS.md` 的通用性，并为每个子项目的子树创建更具体的 `AGENTS.md` 文件。

要查看 Amp 正在使用的智能体文件，请运行 `/agent-files` (CLI) 或在发送会话的第一条消息后悬停在 X% of 968k 指示器上 (编辑器扩展)。

#### 编写 AGENTS.md 文件

如果不存在 `AGENTS.md` 文件，Amp 会提议为你生成一个。你可以手动创建或更新任何 `AGENTS.md` 文件，也可以通过询问 Amp 来完成（*“根据我在这个会话中告诉你的内容更新 AGENTS.md”*）。

要包含其他文件作为上下文，请在智能体文件中 @提及它们。例如：

```markdown
See @doc/style.md and @specs/**/*.md.

When making commits, see @doc/git-commit-instructions.md.
```
- 相对路径是相对于包含提及的智能体文件进行解释的。
- 也支持绝对路径和 `@~/some/path`。
- 代码块中的 @提及会被忽略，以避免误报。
- 支持 Glob 模式（例如 `@doc/*.md` 或 `@.agent/**/*.md`）。

#### 细粒度指导

为了提供仅在处理特定文件时适用的指导，你可以在被提及文件的 YAML front matter 中指定 `globs`。

例如，要应用特定语言的编码规则：

1. 在你的 `AGENTS.md` 文件中的任意位置放置 `See @docs/*.md`。
2. 创建一个文件 `docs/typescript-conventions.md`，内容如下：
	```markdown
	---
	globs:
	  - '**/*.ts'
	  - '**/*.tsx'
	---
	Follow these TypeScript conventions:
	- Never use the \`any\` type
	- ...
	```
3. 对其他语言重复此步骤。

只有当 Amp 读取了与任何 globs 匹配的文件（在上面的例子中是任何 TypeScript 文件）时，带有 `globs` 的被提及文件才会被包含。如果未指定 `globs`，则被 @提及的文件总是被包含。

Globs 隐式地以 `**/` 为前缀，除非它们以 `../` 或 `./` 开头，这种情况下它们指的是相对于被提及文件的路径。

其他示例：

- 前端特定指导：`globs: ["src/components/**", "**/*.tsx"]`
- 后端指导：`globs: ["server/**", "api/**"]`
- 测试指导：`globs: ["*.test.ts", "__tests__/*"]`

#### 迁移到 AGENTS.md

- 从 Claude Code 迁移：`mv CLAUDE.md AGENTS.md && ln -s AGENTS.md CLAUDE.md`，并对子树的 `CLAUDE.md` 文件重复此操作。
- 从 Cursor 迁移：`mv .cursorrules AGENTS.md && ln -s AGENTS.md .cursorrules`，然后在 `AGENTS.md` 的任意位置添加 `@.cursor/rules/*.mdc` 以包含所有 Cursor 规则文件。
- 从现有的 AGENT.md 迁移：`mv AGENT.md AGENTS.md`（可选 - 两个文件名均可继续工作）。

### 接力 (Handoff)

当你会话保持简短并专注于单一任务时，Amp 的效果最好。

要在新会话中继续你在旧会话中的工作，请使用命令面板中的 `handoff` 命令，从原始会话中提取相关文件和上下文来草拟一个新会话。

向 handoff 命令提供一些帮助以指导新提示词。例如：

- `now implement this for teams as well, not just individual users`（现在也为团队实现这个，不仅仅是个人用户）
- `execute phase one of the created plan`（执行已创建计划的第一阶段）
- `check the rest of the codebase and find other places that need this fix`（检查代码库的其余部分，找到其他需要此修复的地方）

关于 Amp 为什么不支持压缩 (compaction)，请参阅 [接力（不再压缩）](https://ampcode.com/news/handoff)。

### 上传图片

Amp 支持图片上传，允许你与 AI 分享截图、图表和视觉参考。图片可以为调试视觉问题或理解 UI 布局提供重要的上下文。

**在编辑器扩展中**，你可以：

- 直接将图片粘贴到输入框
- 按住 Shift 将图片拖到输入框上方
- 通过文件路径提及图片

**在 CLI 中**，你可以：

- 将图片拖入终端（如果图片是从文件复制的，也可以粘贴）
- 通过文件路径提及图片

### 提及文件

你可以通过输入 @ 后跟模糊搜索文件模式，在提示词中提及文件。

### 编辑与撤销 (Edit & Undo)

编辑会话中之前的消息会自动还原智能体在*该消息之后*所做的任何更改。

要在 CLI 中编辑之前的消息，请按 Tab 键导航到之前的消息。在编辑器扩展中，向上滚动会话并点击之前的消息。

你也可以通过点击 `N files changed`（N 个文件已更改）指示器来还原单个文件的更改。

### 消息队列 (Queueing Messages)

你可以将消息排队，以便在智能体结束其回合后发送给它，而不会打断它当前的工作。要将消息排队：

- 在编辑器扩展中，输入你的消息并按 Cmd-Shift-Enter (macOS) 或 Ctrl-Shift-Enter (Windows/Linux)。
- 在 CLI 中，使用命令面板中的 `queue` 命令。

### 自定义命令

通过 Amp 命令面板访问自定义命令：在 VS Code/Cursor/Windsurf 中按 Cmd/Alt-Shift-A，或在 CLI 中按 Ctrl-O。

你可以创建自定义命令来复用提示词并自动化工作流。

要创建自定义命令，请在以下位置之一创建一个 Markdown 文件或可执行文件：

- 当前工作区中的 `.agents/commands`
- `~/.config/amp/commands`（如果设置了 `$XDG_CONFIG_HOME`，则使用该目录）

这些目录中的每个文件，如果是以 `.md` 结尾的 Markdown 文件或可执行文件（设置了执行位或[第一行有 shebang](https://en.wikipedia.org/wiki/Shebang_\(Unix\))），都将转换为自定义命令。命令名称将是不带扩展名的文件名。

调用时，自定义命令将其输出追加到提示词输入中。Markdown 文件直接追加其内容。可执行文件运行并追加其组合的 stdout/stderr 输出（最多 5 万个字符）。可执行文件也可以接受参数，这些参数将在调用时传递。

以下是两个示例：

- 文件 `.agents/commands/pr-review.md` 将转换为自定义命令 `pr-review`，并且 `pr-review.md` 的内容将插入到提示词输入中。
- `~/.config/amp/commands/outline` 是一个可执行文件，将转换为自定义命令 `outline`，并可以带参数使用：`outline src/utils`

实际案例：

- [work-on-linear-issue](https://github.com/nicolaygerold/howtobuildwithai/blob/main/.agents/commands/work-on-linear-issue)
- [resolve-pr-comments](https://github.com/nicolaygerold/howtobuildwithai/blob/main/.agents/commands/resolve-pr-comments)
- [code-review.md](https://github.com/nicolaygerold/howtobuildwithai/blob/main/.agents/commands/code-review.md)

### Amp Tab

Amp Tab 是我们的编辑器内补全引擎，旨在预测你的下一步行动并减少手动编写代码的时间。它仅在 VS Code 及其分支中可用。

它使用我们训练的自定义模型，根据你最近的更改、语言服务器的诊断信息和其他语义上下文来理解你接下来想做什么。

使用 Tab 接受建议，使用 Esc 拒绝。

VS Code 中 Vim 扩展用户的注意事项：如果你需要按两次 Esc 才能取消建议并进入正常模式，请配置 `amp.tab.dismissCommandIds` 以指定按 Esc 时应运行的命令。默认值涵盖了流行的扩展，如 VSCodeVim 和 vscode-neovim。

### 键盘快捷键

操作系统

编辑器

| 命令 | 快捷键 |
| --- | --- |
| 新建会话 (New Thread) | Cmd L |
| 聚焦/隐藏 Amp 侧边栏 | Cmd I |
| 切换到会话 | Cmd K |
| 转到下一个会话 | Cmd Shift ] |
| 转到上一个会话 | Cmd Shift [ |

## 工具 (Tools)

工具是底层模型用来辅助任务的东西。为了获得最高质量的结果，我们建议你使用一组精选的工具，并调整提示词以适应底层模型。

### 内置工具

你可以通过在 CLI 中运行 `amp tools list` 或在扩展的设置面板中查看 Amp 的内置工具。

### 工具箱 (Toolboxes)

工具箱允许你用简单的脚本扩展 Amp，而无需提供 MCP 服务器。

当 Amp 启动时，它会调用 `AMP_TOOLBOX` 指定目录中的每个可执行文件，并将环境变量 `TOOLBOX_ACTION` 设置为 `describe`。

该工具应将其描述作为键值对列表（每行一个）写入 `stdout`。

```javascript
#!/usr/bin/env bun

const action = process.env.TOOLBOX_ACTION

if (action === 'describe') showDescription()
else if (action === 'execute') runTests()

function showDescription() {
    process.stdout.write(
        [
            'name: run-tests',
            'description: use this tool instead of Bash to run tests in a workspace',
            'dir: string the workspace directory',
        ].join('\n'),
    )
}
```

当 Amp 决定使用你的工具时，它会再次运行可执行文件，将 `TOOLBOX_ACTION` 设置为 `execute`。

工具以相同的格式在 `stdin` 上接收参数，然后执行其工作：

```javascript
function runTests() {
    let dir = require('fs')
        .readFileSync(0, 'utf-8')
        .split('\n')
        .filter((line) => line.startsWith('dir: '))

    dir = dir.length > 0 ? dir[0].replace('dir: ', '') : '.'

    require('child_process').spawnSync('pnpm', ['-C', dir, 'run', 'test', '--no-color', '--run'], {
        stdio: 'inherit',
    })
}
```

如果你的工具需要对象或数组参数，可执行文件可以将 [工具 schema](https://modelcontextprotocol.io/specification/2025-06-18/server/tools#tool) 作为 JSON 写入 `stdout`。在这种情况下，它也将接收 JSON 格式的输入。

我们建议使用工具来表达特定的、确定性的和项目本地的行为，例如：

- 查询开发数据库，
- 在项目中运行测试和构建操作，
- 以受控方式暴露 CLI 工具。

有关完整的技术参考，请参阅 [附录](https://ampcode.com/manual/appendix#toolboxes-reference)。

### 子智能体 (Subagents)

Amp 可以（通过 Task 工具）生成子智能体来处理受益于独立执行的复杂任务。每个子智能体都有自己的上下文窗口，并能访问如文件编辑和终端命令等工具。

子智能体最适用于可以分解为独立部分的多步骤任务、产生完工后无需保留的大量输出的操作、跨不同代码区域的并行工作，以及在协调复杂工作时保持主会话上下文的整洁。

然而，子智能体是隔离工作的——它们无法相互通信，你无法在任务中途指导它们，它们从零开始而不带对话积累的上下文，并且主智能体只接收它们的最终总结，而不是监控它们的逐步工作。

Amp 可能会自动对合适的任务使用子智能体，或者你可以通过提及子智能体或建议并行工作来鼓励使用它们。

### 先知 (Oracle)

Amp 可以访问一个强大的“第二意见”模型，该模型更适合复杂的推理或分析任务，代价是速度稍慢、稍贵，且不如主智能体模型适合日常代码编辑任务。

Amp 的主智能体可以通过一个名为 `oracle` 的工具使用该模型，目前它使用的是 GPT-5，推理等级为中等（我们发现这在不花费过多时间的情况下效果很好）。

主智能体在调试或审查复杂代码时，可以自主决定向 Oracle 寻求帮助。由于成本较高且推理速度较慢，我们有意不强制主智能体*总是*使用 Oracle。

当你认为有帮助时，我们建议明确要求 Amp 的主智能体使用 Oracle。以下是我们自己使用 Amp 的一些示例：

- “使用 Oracle 审查上次提交的更改。我想确保空闲或需要用户输入时播放通知声音的实际逻辑没有改变。”
- “询问 Oracle 是否有更好的解决方案。”
- “我在这些文件中有个 bug：… 当我运行此命令时它会出现：… 帮我修复这个 bug。尽可能多地使用 Oracle，因为它很聪明。”
- “分析函数 `foobar` 和 `barfoo` 是如何使用的。然后我想让你与 Oracle 大量合作，弄清楚我们如何重构它们之间的重复代码，同时保持更改的向后兼容性。”

有关更多信息，请参阅 [GPT-5 Oracle 公告](https://ampcode.com/news/gpt-5-oracle)。

### 图书管理员 (Librarian)

Amp 可以使用 Librarian 子智能体搜索远程代码库。Librarian 可以搜索和阅读 GitHub 上的所有公共代码以及你的私有 GitHub 仓库。

当你需要进行跨仓库研究，或者例如想要它阅读你正在使用的框架和库的代码时，告诉 Amp 召唤 Librarian。Librarian 的回答通常更长、更详细，因为我们将其构建为提供深入解释。Librarian 只会搜索仓库默认分支上的代码。

你需要在 [你的设置](https://ampcode.com/settings#code-host-connections) 中配置 GitHub 连接才能使用它。如果你希望 Librarian 能看到你的私有仓库，你需要在配置 GitHub 连接时选择它们。有关更多信息，请参阅 GitHub 关于 [安装](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party) 和 GitHub Apps 的文档。

你可能需要明确提示主智能体使用 Librarian。以下是一些示例：

- “解释发布时如何部署我们文档的新版本。搜索我们的 docs 和 infra 仓库，看看它们是如何到达 X.Y.sourcegraph.com 的。”
- “我这个使用 Zod 的验证代码有个 bug，它抛出了一个奇怪的错误。请 Librarian 调查为什么会发生这个错误，并向我展示导致它的逻辑。”
- “使用 Librarian 调查 `foo` 服务——我在 `bar` 中使用的 API 端点最近有变更吗？如果有，变了什么，什么时候合并的？”

有关更多信息，请参阅 [Librarian 公告](https://ampcode.com/news/librarian)。

### MCP

你可以使用 [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) 服务器添加额外的工具，这些服务器可以是本地的也可以是远程的。可以在 [配置文件](https://ampcode.com/#configuration) 中的 `amp.mcpServers` 中配置它们。你也可以在 VS Code 的设置下按 + Add MCP Server。

本地 MCP 服务器的配置选项：

- `command` - 可执行文件
- `args` - 命令参数（可选）
- `env` - 环境变量（可选）

远程 (HTTP/SSE) MCP 服务器的配置选项：

- `url` - 服务器端点
- `headers` - 发送请求时带的 HTTP 头（可选）

Amp 会根据服务器的响应头自动检测适当的传输类型（HTTP 或 SSE）。

有两种方法可以验证 MCP 服务器：

- 如果远程 MCP 服务器需要授权，你可以通过 `headers` 选项直接传递身份验证头。
- 对于 OAuth 身份验证，请使用 Amp 内置的 OAuth 支持（参见下文 [远程 MCP 服务器的 OAuth](https://ampcode.com/#mcp-oauth)）。

你也可以在配置中使用 `${VAR_NAME}` 语法的环境变量。

配置示例：

```json
"amp.mcpServers": {
    "playwright": {
        "command": "npx",
        "args": ["-y", "@playwright/mcp@latest", "--headless", "--isolated"]
    },
    "semgrep": {
        "url": "https://mcp.semgrep.ai/mcp"
    },
    "sourcegraph": {
        "url": "${SRC_ENDPOINT}/.api/mcp/v1",
        "headers": {
            "Authorization": "token ${SRC_ACCESS_TOKEN}"
        }
    },
    "linear": {
        "command": "npx",
        "args": [
            "mcp-remote",
            "https://mcp.linear.app/sse"
        ]
    },
    "monday": {
        "url": "https://mcp.monday.com/sse",
        "headers": {
            "Authorization": "Bearer ${MONDAY_API_TOKEN}"
        }
    }
}
```

你也可以使用 CLI 添加带有 header 选项的 MCP 服务器：

```
$ amp mcp add sourcegraph --header "Authorization=token sgp_your-token-here" https://sourcegraph.example.com/.api/mcp/v1
```

过多的可用工具可能会降低模型性能，因此为了获得最佳结果，请进行筛选：

- 使用暴露少量高质量工具且描述清晰的 MCP 服务器。
- 禁用你不使用的 MCP 工具，方法是在扩展的设置界面中悬停在工具名称上并点击，使其显示为 ~~tool\_name~~，或者将它们添加到 [配置文件](https://ampcode.com/#configuration) 中的 `amp.tools.disable`。
- 考虑使用 CLI 工具代替 MCP 服务器。

#### 远程 MCP 服务器的 OAuth

Amp 支持远程 MCP 服务器的 OAuth 身份验证。有两种可用的身份验证流程：

**动态客户端注册 (DCR)**

一些 MCP 服务器如 [Linear](https://linear.app/changelog/2025-05-01-mcp) 支持自动 OAuth 客户端注册。当你添加此类服务器时，Amp 会在启动时自动在浏览器中开始 OAuth 流程：

```
$ amp mcp add linear https://mcp.linear.app/sse
```

**手动 OAuth 客户端注册**

对于需要手动配置 OAuth 客户端的服务器：

1. 在服务器的管理界面中创建一个 OAuth 客户端，配置如下：
	- 重定向 URI: `http://localhost:8976/oauth/callback`
	- 你的用例所需的 scopes
2. 将 MCP 服务器添加到你的配置中：
```
$ amp mcp add my-server https://example.com/.api/mcp/v1
```
1. 注册你的 OAuth 凭据：
```
$ amp mcp oauth login my-server 
  --server-url https://example.com/.api/mcp/v1 
  --client-id your-client-id 
  --client-secret your-client-secret 
  --scopes "openid,profile,email,user:all"
```

启动时，Amp 将打开浏览器以完成身份验证流程。

OAuth 令牌安全地存储在 `~/.amp/oauth/` 中，并在需要时自动刷新。

### 权限 (Permissions)

在调用工具之前，Amp 会检查用户的权限列表，以第一个匹配的条目来决定是否运行该工具。

如果未找到匹配项，Amp 会扫描其内置的权限列表，如果在那里也未找到匹配项，则拒绝使用该工具。

匹配的条目告诉 Amp 要么*允许*使用工具而无需询问，要么直接*拒绝*使用工具，要么*询问*操作员，要么将决定*委派*给另一个程序。

权限在你的 [配置文件](https://ampcode.com/#configuration) 中的 `amp.permissions` 条目下配置：

```json
"amp.permissions": [
  // 运行包含 git commit 的命令行前询问
  { "tool": "Bash", "matches": { "cmd": "*git commit*" }, "action": "ask"},
  // 拒绝包含 python or python3 的命令行
  { "tool": "Bash", "matches": { "cmd": ["*python *", "*python3 *"] }, "action": "reject"},
  // 允许所有 playwright MCP 工具
  { "tool": "mcp__playwright_*", "action": "allow"},
  // 运行任何其他 MCP 工具前询问
  { "tool": "mcp__*", "action": "ask"},
  // 将其他所有情况委派给权限助手（必须在 $PATH 中）
  { "tool": "*", "action": "delegate", "to": "my-permission-helper"}
]
```

#### 在 VS Code 中使用权限

复杂对象必须在 VS Code 的设置 JSON 中配置。

VS Code 中集成了权限的 JSON schema，以便在编辑权限时提供指导。

动作为 `ask` 的规则在 VS Code 中仅对 `Bash` 工具有效。

#### 在 CLI 中使用权限

使用 `amp permissions edit`，你可以使用 `$EDITOR` 编程和交互式地编辑你的权限规则。

`amp permissions test` 命令评估权限规则而不实际运行任何工具，为验证你的规则是否按预期工作提供了一种安全的方式。

```
$ amp permissions edit <<'EOF'
allow Bash --cmd 'git status' --cmd 'git diff*'
ask Bash --cmd '*'
EOF
$ amp permission test Bash --cmd 'git diff --name-only'
tool: Bash
arguments: {"cmd":"git diff --name-only"}
action: allow
matched-rule: 0
source: user
$ amp permission test Bash --cmd 'git push'
tool: Bash
arguments: {"cmd":"push"}
action: ask
matched-rule: 1
source: user
```

运行 `amp permissions list` 以 `amp permissions edit` 能理解的相同格式显示已知权限规则：

```
$ amp permissions list
allow Bash --cmd 'git status' --cmd 'git diff*'
ask Bash --cmd '*'
```

请参阅 `amp permissions --help` 的输出以获取可用操作的完整集合。

#### 将权限决策委派给外部程序

为了完全控制，你可以告诉 Amp 在调用工具之前咨询另一个程序：

```json
{ "action": "delegate", "to": "amp-permission-helper", "tool": "Bash" }
```

现在，每当 Amp 想要运行 shell 命令时，它都会调用 `amp-permission-helper`：

```python
#!/usr/bin/env python3
import json, sys, os

tool_name = os.environ.get("AGENT_TOOL_NAME")
tool_arguments = json.loads(sys.stdin.read())

# allow all other tools
if tool_name != "Bash":
    sys.exit(0)

# reject git push outright - stderr is passed to the model
if 'git push' in tool_arguments.get('cmd', ''):
    print("Output the correct command line for pushing changes instead", file=sys.stderr)
    sys.exit(2)

# ask in any other case
sys.exit(1)
```

错误代码和 stderr 用于告诉 Amp 如何继续。

有关完整的技术参考，请参阅 [附录](https://ampcode.com/manual/appendix#permissions-reference)。

## 会话共享 (Thread Sharing)

会话（Threads）是你与智能体的对话，包含所有消息、上下文和工具调用。你的会话可在 [ampcode.com/threads](https://ampcode.com/threads) 查看。

我们发现在代码审查中包含 Amp 会话链接非常有用，可以给审查者提供更多背景信息。阅读和搜索团队的会话也可以帮助你了解正在发生的事情以及其他人如何使用 Amp。

要更改会话的共享对象：

- 在 CLI 中，输入 / 呼出命令面板，然后选择 `thread: set visibility`。
- 在编辑器扩展或网页上，使用顶部的共享菜单。

会话的可见性级别可以设置为：

- 公开 (Public)：对你的公开个人资料 (`ampcode.com/@*your-username*`) 上的任何人可见，且可公开搜索
- 不列出 (Unlisted)：对拥有链接的互联网上任何人可见，并在工作区内共享
- 工作区共享 (Workspace-shared)：对工作区的所有成员可见
- 组共享 (Group-shared)：对你选择的特定组成员可见；仅限企业工作区
- 私有 (Private)：仅对你可见

如果你不在工作区中，默认情况下你的会话仅对你可见。

如果你在工作区中，默认情况下你的会话将与工作区成员共享。[企业 (Enterprise)](https://ampcode.com/#enterprise) 工作区可以配置额外的共享控制；参见 [工作区会话可见性控制](https://ampcode.com/manual/appendix#workspace-thread-visibility-controls)。

## CLI

[安装](https://ampcode.com/#getting-started-command-line-interface) 并登录后，运行 `amp` 启动 Amp CLI。

不带任何参数时，它以交互模式运行：

```
$ amp
```

如果你将输入通过管道传输到 CLI，它会将输入用作交互模式下的第一条用户消息：

```
$ echo "commit all my changes" | amp
```

使用 `-x` 或 `--execute` 以执行模式启动 CLI（在 [Amp Free](https://ampcode.com/free) 中不可用）。在此模式下，它将 `-x` 提供的消息发送给智能体，等待智能体结束其回合，打印最终消息并退出：

```
$ amp -x "what files in this folder are markdown files? Print only the filenames."
README.md
AGENTS.md
```

使用 `-x` 时也可以通过管道传输输入：

```
$ echo "what package manager is used here?" | amp -x
cargo
```

如果你想使用 `-x` 且智能体使用的工具可能需要批准，请务必使用 `--dangerously-allow-all` 或 [配置 Amp 允许它们](https://ampcode.com/#permissions)：

```
$ amp --dangerously-allow-all -x "Run \`sed\` to replace 2024 with 2025 in README."
Done. Replaced 8 occurrences of 2024 in README.md
```

重定向 stdout 时，会自动开启执行模式：

```
$ echo "what is 2+2?" | amp > response.txt
```

当你通过管道传输输入并用 `-x` 提供提示词时，智能体可以看到两者：

```
$ cat ~/.vimrc | amp -x "which colorscheme is used?"
The colorscheme used is **gruvbox** with dark background and hard contrast.

\`\`\`vim
set background=dark
let g:gruvbox_contrast_dark = "hard"
colorscheme gruvbox
\`\`\`
```

你可以将 `--mcp-config` 标志与 `-x` 命令一起使用，以指定 MCP 服务器而无需修改配置文件。

```
$ amp --mcp-config '{"everything": {"command": "npx", "args": ["-y", "@modelcontextprotocol/server-everything"]}}' -x "What tools are available to you?"
```

要查看 CLI 的更多功能，请运行 `amp --help`。

### 非交互环境

对于非交互环境（例如脚本、CI/CD 管道），请将你的 [API 密钥](https://ampcode.com/settings) 设置在环境变量中：

```bash
export AMP_API_KEY=your-api-key-here
```

### CLI–IDE 集成

Amp CLI 与 VS Code、JetBrains 和 Neovim 集成（安装请见 [ampcode.com/install](https://ampcode.com/install)），这使得 Amp CLI 能够：

- 读取诊断信息，例如类型检查器和 linter 错误
- 查看当前打开的文件和选区，以便 Amp 更好地理解你的提示词上下文
- 通过 IDE 编辑文件，并支持完全撤销

CLI 在大多数情况下会自动检测你是否运行了 Amp 编辑器扩展。如果你使用 JetBrains 并在 JetBrains 内置终端*以外*的终端运行 Amp CLI，则需要运行 `amp --jetbrains` 来检测它。

### Shell 模式

通过以 `$` 开头输入消息，直接在 CLI 中执行 shell 命令。命令及其输出将包含在下一条发给智能体的消息的上下文窗口中。

使用 `$$` 激活隐身 shell 模式，命令会执行但不会包含在上下文中。这对于嘈杂的命令或你通常会在单独终端中运行的快速检查很有用。

### 在 CLI 中编写提示词

在现代终端模拟器中，如 Ghostty、Wezterm、Kitty 或 iTerm2，你可以使用 shift-enter 在提示词中插入换行符。

此外，你还可以键入 `\` 后跟回车键来插入换行符。

如果你设置了环境变量 `$EDITOR`，可以使用命令面板中的 `editor` 命令打开编辑器来编写提示词。

### 流式 JSON (Streaming JSON)

Amp 的 CLI 支持流式 JSON 输出格式，stdout 每行一个对象，用于编程集成和实时对话监控。

使用 `--stream-json` 标志配合 `--execute` 模式，以流式 JSON 格式输出而非纯文本。

带参数的基本用法：

```
$ amp --execute "what is 3 + 5?" --stream-json
```

结合 `--stream-json` 和 `amp threads continue`：

```
$ amp threads continue --execute "now add 8 to that" --stream-json
```

使用 stdin 输入：

```
$ echo "analyze this code" | amp --execute --stream-json
```

你可以在 [附录中找到 JSON 输出的 schema](https://ampcode.com/manual/appendix?preview#message-schema)。

也可以使用 `--stream-json-input` 标志在 stdin 上提供输入：

```
$ echo '{
  "type": "user",
  "message": {
    "role": "user",
    "content": [
      {
        "type": "text",
        "text": "what is 2+2?"
      }
    ]
  }
}' | amp -x --stream-json --stream-json-input
```

`--stream-json` 标志需要 `--execute` 模式。它不能单独使用。而 `--stream-json-input` 需要 `--stream-json`。

当使用 `--stream-json-input` 时，`--execute` 的行为会发生变化，Amp 只有在助手完成*并且* stdin 已关闭时才会退出。

这允许编程方式使用 Amp CLI 进行包含多条用户消息的对话。

```bash
#!/usr/bin/env bash

send_message() {
  local text="$1"
  echo '{"type":"user","message":{"role":"user","content":[{"type":"text","text":"'$text'"}]}}'
}

{
  send_message "what's 2+2?"
  sleep 10

  send_message "now add 8 to that"
  sleep 10

  send_message "now add 5 to that"
} | amp --execute --stream-json --stream-json-input
```

有关输出的 schema、示例输出和更多用法示例，请参阅 [附录](https://ampcode.com/manual/appendix#stream-json-output)。

## 配置 (Configuration)

Amp 可以通过编辑器扩展中的设置（例如 `.vscode/settings.json`）和 CLI 配置文件进行配置。

CLI 配置文件位置因操作系统而异：

- macOS: `~/.config/amp/settings.json`
- Linux: `~/.config/amp/settings.json`
- Windows: `%APPDATA%\amp\settings.json`

所有设置都使用 `amp.` 前缀。

### 设置

#### 编辑器扩展和 CLI

- **`amp.anthropic.thinking.enabled`**
	**类型:** `boolean`, **默认值:** `true`
	启用 Claude 的扩展思考能力
- **`amp.experimental.dojoMode`**
	**类型:** `boolean`, **默认值:** `false`
	启用道场模式 (dojo mode)——一种学习模式，智能体通过苏格拉底式提问引导你自己发现解决方案。智能体可以阅读你的代码库并搜索信息，但不会编辑文件或给出直接解决方案。非常适合学习编程或理解新的代码库。
- **`amp.experimental.planMode`**
	**类型:** `boolean`, **默认值:** `false`
	启用计划模式 (plan mode)，以便在执行前与智能体进行协作规划。在计划模式下，智能体可以研究你的代码库，但不能编辑文件或运行命令。
- **`amp.permissions`**
	**类型:** `array`, **默认值:** `[]`
	配置允许、拒绝或询问批准哪些工具的使用。参见 [权限](https://ampcode.com/#permissions)。
- **`amp.tab.clipboard.enabled`**
	**类型:** `boolean`, **默认值:** `true`
	启用 Amp Tab 上下文的剪贴板访问
- **`amp.git.commit.ampThread.enabled`**
	**类型:** `boolean`, **默认值:** `true`
	启用在 git 提交中添加 Amp-Thread trailer。禁用时，使用提交工具进行的提交将不包含 `Amp-Thread: <thread-url>` trailer。
- **`amp.git.commit.coauthor.enabled`**
	**类型:** `boolean`, **默认值:** `true`
	启用在 git 提交中将 Amp 添加为共同作者 (co-author)。禁用时，使用提交工具进行的提交将不包含 `Co-authored-by: Amp <amp@ampcode.com>` trailer。
- **`amp.mcpServers`**
	**类型:** `object`
	暴露工具的 Model Context Protocol 服务器。参见 [自定义工具 (MCP) 文档](https://ampcode.com/#mcp)。
- **`amp.model.sonnet`**
	**类型:** `boolean`, **默认值:** `false`
	*临时设置。* 使用 Claude Sonnet 4.5 代替 Gemini 3 作为主要模型。提供此设置是为了帮助过渡到 Gemini 3，并将在未来的版本中删除。也可以通过 CLI 标志启用：`amp --use-sonnet`。
- **`amp.terminal.commands.nodeSpawn.loadProfile`**
	**类型:** `string`, **默认值:** `"always"`, **选项:** `"always"` | `"never"` | `"daily"`
	在运行命令（包括 MCP 服务器）之前，是否加载用户 profile (`.bashrc`, `.zshrc`, `.envrc`) 中的环境变量（从工作区根目录可见）
- **`amp.todos.enabled`**
	**类型:** `boolean`, **默认值:** `true`
	启用用于管理任务的 TODO 跟踪
- **`amp.tools.disable`**
	**类型:** `array`, **默认值:** `[]`
	按名称禁用特定工具。使用 ‘builtin:toolname’ 仅禁用具有该名称的内置工具（允许 MCP 服务器提供同名工具）。支持使用 `*` 的 Glob 模式。
- **`amp.tools.stopTimeout`**
	**类型:** `number`, **默认值:** `300`
	在取消正在运行的工具之前等待多少秒
- **`amp.mcpPermissions`**
	**类型:** `array`, **默认值:** `[]`
	允许或阻止匹配指定模式的 MCP 服务器。应用第一个匹配的规则。如果没有规则匹配 MCP 服务器，该服务器将被允许。
	- **远程 MCP 服务器**: 使用 `url` 键为服务器端点指定匹配标准
	- **本地 MCP 服务器**: 使用 `command` 和 `args` 键匹配可执行命令及其参数
	以下是一些示例：
	```json
	"amp.mcpPermissions": [
	  // 允许特定的受信任 MCP 服务器
	  { "matches": { "command": "npx", "args": "* @playwright/mcp@*" }, "action": "allow" },
	  { "matches": { "url": "https://mcp.trusted.com/mcp" }, "action": "allow" },
	  // 阻止潜在风险的 MCP 服务器
	  { "matches": { "command": "python", "args": "*bad_command*" }, "action": "reject" },
	  { "matches": { "url": "*/malicious.com*" }, "action": "reject" },
	]
	```
	以下规则将阻止所有 MCP 服务器：
	```json
	"amp.mcpPermissions": [
	  { "matches": { "command": "*" }, "action": "reject" },
	  { "matches": { "url": "*" }, "action": "reject" }
	]
	```

#### 仅限 CLI

- **`amp.updates.mode`**
	**类型:** `string`, **默认值:** `"auto"`
	控制更新检查行为：`"warn"` 显示更新通知，`"disabled"` 关闭检查，`"auto"` 自动运行更新。注意：设置 `AMP_SKIP_UPDATE_CHECK=1` 环境变量将覆盖此设置并禁用所有更新检查。

### 企业托管设置

[企业 (Enterprise)](https://ampcode.com/#enterprise) 工作区管理员可以通过将策略部署到运行 Amp 的机器上的以下位置，来强制执行覆盖用户和工作区设置的配置：

- **macOS**: `/Library/Application Support/ampcode/managed-settings.json`
- **Linux**: `/etc/ampcode/managed-settings.json`
- **Windows**: `C:\ProgramData\ampcode\managed-settings.json`

此托管设置文件使用与 [常规设置](https://ampcode.com/#core-settings) 文件相同的 schema，但多了一个字段：

amp.admin.compatibilityDate `string`

### 代理和证书

在具有代理服务器或自定义证书的公司网络中使用 Amp CLI 时，请根据需要在 shell profile 或 CI 环境中设置这些标准 Node.js 环境变量：

```bash
export HTTP_PROXY=your-proxy-url
export HTTPS_PROXY=your-proxy-url
export NODE_EXTRA_CA_CERTS=/path/to/your/certificates.pem
```

## 定价

### 免费 (Free)

Amp 的 `free` 模式是免费的，并由广告支持。它混合使用了顶级 OSS 模型、上下文窗口受限的前沿模型以及测试中的预发布前沿模型。

`free` 模式符合 Amp 付费智能模式的所有严格 [安全标准](https://ampcode.com/security)。你不必共享你的数据用于训练。

要使用它：在 Amp CLI 中输入 `/mode free`，或在 Amp 编辑器扩展的提示词字段中选择 `free` 模式（而不是付费的 `smart` 模式）。

有关更多信息，请参阅 [Amp Free 公告](https://ampcode.com/news/amp-free) 和 [在工作中使用 Amp Free](https://ampcode.com/news/amp-free-no-training)。

### 付费使用

Amp 默认的 `smart` 模式比 `free` 更自主、更强大，并且使用付费额度（credits）。

你可以在 [用户设置](https://ampcode.com/settings) 中为自己购买更多额度，或者在 [工作区设置](https://ampcode.com/workspace) 中为你的团队购买。注册后，大多数用户会收到 10 美元的免费额度。

使用量是根据 LLM 使用量和某些其他产生服务成本的工具（如网络搜索）的使用量来消耗的。对于个人和非企业工作区，我们直接按成本价向你收取这些费用，不加价。

工作区额度由所有工作区成员汇集并共享。所有未使用的额度在账户不活动一年后过期。

### 企业版 (Enterprise)

企业版的使用费比个人和团队计划贵 50%，并包括以下权限：

- SSO (Okta, SAML 等) 和目录同步
- LLM 推理中的文本输入零数据保留
- 高级 [会话可见性控制](https://ampcode.com/manual/appendix#workspace-thread-visibility-controls)
- [托管用户设置](https://ampcode.com/#enterprise-managed-policy-settings)
- 用于工作区分析和数据管理的 API
- 可配置的会话保留期（按需提供）
- 用于工作区访问的 IP 白名单（按需提供）

有关 Amp 企业版安全功能的更多信息，请参阅 [Amp 安全参考](https://ampcode.com/security)。

要开始使用 Amp 企业版，请前往 [你的工作区](https://ampcode.com/team) 并点击右上角的“更改计划 (Change Plan)”。这需要一次性购买 1,000 美元，这将授予你的工作区 1,000 美元的 Amp 企业版使用额度，并将你的工作区升级为企业版。

使用 **Amp Enterprise Premium**，5,000 美元以上的购买可提供发票支付，25,000 美元以上的购买可享受批量折扣。Amp Enterprise Premium 还包括以下权限：

- 用于每用户成本控制的 [Entitlements](https://ampcode.com/manual/appendix#workspace-entitlements)
- 用于成本归因和每组会话可见性选项的用户组（按需提供）

请联系 [amp-devs@sourcegraph.com](https://ampcode.com/) 以获取这些购买选项的访问权限以及有关 Amp 企业版的一般信息。

## 支持

有关 Amp 的一般帮助，请在 X 上发帖并提及 [@AmpCode](https://x.com/AmpCode)，或发送电子邮件至 [amp-devs@sourcegraph.com](https://ampcode.com/)。你也可以加入我们的社区 [Build Crew](https://buildcrew.team/) 讨论 Amp 并与他人分享技巧。

有关账单和账户的帮助，请联系 [amp-devs@sourcegraph.com](https://ampcode.com/)。

### 支持的平台

Amp 支持 macOS、Linux 和 Windows (推荐 WSL)。

Amp 的 JetBrains 集成支持所有版本为 2025.1+ 的 JetBrains IDE (IntelliJ, WebStorm, GoLand 等)（推荐 2025.2.2+）。

Amp 用户手册