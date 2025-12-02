---
sender: "Hinbox"
subject: "LLM 扩展的苦涩教训 (The Bitter Lesson of LLM Extensions)"
snippet: ""
overview: >
  
date: "2025-12-02"
labels: ["Inbox"]
isStarred: false
isRead: false
mdTheme: amp
---

# LLM 扩展的苦涩教训 (The Bitter Lesson of LLM Extensions)

- **原文链接**：https://www.sawyerhood.com/blog/llm-extension
- **日期**：2025-11-24

三年前，“使用 LLM”意味着将一大段文本粘贴到聊天框中，并祈祷能得到一些有用的回复。如今，我们将 Agent（智能体）指向我们的代码库、浏览器，让它们代表我们去行动。这期间，一个在表面之下酝酿的关键问题一直是：**我们该如何让最终用户真正定制这些系统？**

随着模型能力变得越来越强，终端用户定制它们的途径和机制也随之扩展。我们经历了从简单的系统提示词（System Prompts）到复杂的客户端-服务器协议，最终又回到了原点。

我想花点时间回顾过去三年 LLM 扩展的历史，并谈谈我对未来的看法。

## ChatGPT Plugins (2023 年 3 月)

就在发布四个月后，OpenAI 宣布了 **ChatGPT Plugins**。回过头看，这些东西在当时极其超前。

这个想法很有野心：给 LLM 一个 OpenAPI 规范的链接，让它“撒欢”去调用 REST 端点。这是通向 AGI 式思维的直达线：通过标准 API 进行通用的工具使用。

```json
{
  "schema_version": "v1",
  "name_for_human": "TODO Manager",
  "name_for_model": "todo_manager",
  "description_for_human": "Manages your TODOs!",
  "description_for_model": "An app for managing a user's TODOs",
  "api": { "url": "/openapi.json" },
  "auth": { "type": "none" },
  "logo_url": "https://example.com/logo.png",
  "legal_info_url": "http://example.com",
  "contact_email": "hello@example.com"
}
```

问题在哪？**模型还没准备好。** GPT-3.5（甚至早期的 GPT-4）在面对巨大的 API 规范时，很难不产生幻觉或迷失在上下文中。而且，用户体验（UX）也很笨重。你必须为每次聊天手动切换插件！

当时的情况大概是这样的：

<iframe src="https://player.vimeo.com/video/810715468?h=ee0f32a8f5&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="" title="ChatGPT Plugins Demo" style="width:100%; height:400px;"></iframe>

但它让我们瞥见了未来：**Code Interpreter** 插件（后来的 Advanced Data Analysis）变得不可或缺，预示了我们今天使用的强大的沙盒执行环境。

## Custom Instructions (2023 年 7 月)

Custom Instructions（自定义指令）是对插件复杂性的一种“简单粗暴”的反向回应。在写这一段时，我甚至愣了一下，因为我确信这个功能是在插件之前发布的。

它只是一个附加到每个对话中的用户定义提示词。简单。显而易见。但它解决了一个巨大的问题：重复的上下文设置。

这是后来所有 `.cursorrules` 和 `CLAUDE.md` 文件的精神始祖。

## Custom GPTs (2023 年 11 月)

OpenAI 将指令和工具重新打包成 **Custom GPTs**。这是试图将提示工程“产品化”的一次尝试。你可以把一个人设（Persona）、一些文件和几个动作打包成一个可分享的链接。

这是从插件那种开放式的承诺，退回到精心策划的单用途“App”。

## ChatGPT 的记忆功能 (2024 年 2 月)

到目前为止，我们讨论的都是手动扩展 LLM 的方法。**Memory（记忆）** 代表了向自动个性化的转变。

ChatGPT Memory 会记录你对话中的细节，并悄悄地将它们插入未来的上下文中。它就像一个会自动编写的系统提示词。如果你提到你是素食主义者，几周后它还会记得。虽然这是一个小功能，但它标志着 Agent 开始在无需用户干预的情况下维护长期状态。

## Cursor Rules (2024 年 4 月)

**Cursor** 改变了游戏规则，它把自定义指令放在了它们该在的地方：**代码库里**。

`.cursorrules` 文件是一个启示。与其把上下文粘贴到聊天窗口，不如把它提交到 git 里。

- “我们使用制表符（Tabs），不用空格。”
- “不要用分号。”
- “总是使用 TypeScript。”

它最初只是一个文件，后来演变成具有复杂作用域的 `.cursor/rules` 文件夹。你可以组织多个规则文件，甚至定义它们何时生效，例如仅针对特定文件类型或子目录。这是扩展第一次让人感觉是代码“原生”的。

后来 Cursor 引入了让 LLM 决定何时应用规则的能力，这种模式我们稍后还会看到。

## Model Context Protocol (2024 年 11 月)

到了 2024 年底，模型终于聪明到可以可靠地处理真正的工具了。Anthropic 的 **Model Context Protocol (MCP，模型上下文协议)** 就是答案。

MCP 是一个重型解决方案。一个 MCP 客户端需要保持与 MCP 服务器的持久连接。服务器向客户端（在大多数情况下是一个 Agent）提供工具定义、资源和提示词；客户端可以向服务器发送消息说调用了某个工具，服务器随后响应结果。

与 Custom Instructions（仅添加上下文）不同，**MCP 赋予了模型真正的能力**。它可以读取你的代码库，查询你的 Postgres 数据库，或者部署到 Vercel。除了提供工具，它还允许服务器直接向 Agent 提供 **资源**（文档、日志）和 **提示词**。

它功能强大，但也许有点杀鸡用牛刀。虽然对于 Agent 开发者来说这种复杂性可能是值得的，但要求用户设置并连接 MCP 会带来巨大的摩擦，因此出现了一整个像 [Smithery](https://smithery.ai/) 这样的初创生态系统，旨在让使用 MCP 变得更简单。

值得注意的是，[2025 年 10 月](https://openai.com/index/introducing-apps-in-chatgpt/) 宣布的 ChatGPT Apps 就是建立在 MCP 之上的。这是试图让最终用户无需真正思考即可使用 MCP 的一种尝试。

## Claude Code: 新的 Agent，新的扩展 (2025 年 2 月)

2025 年初带来了 **Claude Code**，它基本上把所有的扩展机制都加到了一个 Agent 上。

- **`CLAUDE.md`**：代码库级指令的标准。
- **MCP**：用于重型工具集成。
- **Slash Commands (斜杠命令)**：像 Cursor 的 notebooks 一样，用于可复用的提示词。
- **Hooks (钩子)**：拦截并修改 Agent 循环的能力（例如，“如果测试失败则停止”）。
- **Sub-agents (子智能体)**：生成专门的 worker 来处理子任务。
- **Output Styles (输出风格)**：（已弃用）配置语气和格式。

时间会证明这些功能中有多少能长期保留下来。Anthropic 已经尝试[弃用输出风格](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#2030)了。

## Agent Skills (2025 年 10 月)

添加到 Claude Code 的下一个扩展机制非常重要，值得深入探讨。**Agent Skills（智能体技能）** 是 ChatGPT Plugins 的重生。

虽然 MCP 拥有一整套客户端-服务器协议，但 Agent Skills 仅仅是 Markdown 文件和脚本（无论你选择什么语言）的文件夹。

Agent 只需扫描 `skills/` 目录，读取每个 `SKILL.md` 的前言（frontmatter），并建立一个轻量级索引。只有在适合当前任务时，它才会选择读取技能的完整内容。这解决了 MCP 的一个主要问题：必须一次性将所有工具定义加载到上下文窗口中而导致的上下文膨胀。

以下是从 Anthropic 的 [Skills 示例](https://github.com/anthropics/skills/blob/main/webapp-testing/SKILL.md) 仓库中截取的一个使用 Playwright 进行端到端测试的技能结构片段：

```text
webapp-testing/
├── examples/
│   ├── console_logging.py
│   ├── element_discovery.py
│   └── static_html_automation.py
├── scripts/
│   └── with_server.py
└── SKILL.md
```

这里混合了脚本、示例和纯文本说明。唯一必需的文件是 `SKILL.md`。让我们看看那个文件：

```markdown
---
name: webapp-testing
description: Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs.
license: Complete terms in LICENSE.txt
---

# Web Application Testing

To test local web applications, write native Python Playwright scripts.

Helper Scripts Available

`scripts/with_server.py`

Always run scripts with `--help` first

... skill continues ...
```

这只是一个包含一些元数据和技能描述的普通 Markdown 文件。Agent 读取该文件，文件中可以自由引用 Agent 可以读取的其他文件。相比之下，一个 Playwright MCP 服务器需要数十个工具定义来控制浏览器，而这个技能只是说：“你有 bash，这就是怎么写 playwright 脚本”。

当然，使用技能需要 Agent 拥有通用的计算机访问权限，但这正是[苦涩的教训 (The Bitter Lesson)](https://en.wikipedia.org/wiki/Bitter_lesson) 的体现。赋予 Agent 通用工具并信任它有能力使用这些工具来完成任务，这很可能比为每个任务制造专用工具是更好的制胜策略。

## 未来展望

Skills 是 ChatGPT Plugins 梦想的实现：只给模型指令和一些通用工具，并信任它能处理中间的衔接工作（glue work）。但我有一个假设，这次它真的能行，因为**模型实际上已经聪明到可以做到了。**

Agent Skills 之所以有效，是因为它假设 Agent 有能力（通过 bash 命令）编写自己的工具。你可以只给它代码片段，让 Agent 自己弄清楚如何针对手头的任务通用地运行它们。

重要的是，我认为 Skills 标志着对 Agent 真正定义的重新界定。Agent 不再只是一个在 while 循环里的 LLM。它是一个在 while 循环里、并且**绑着一台电脑**的 LLM。

Claude Code 是第一个让我意识到这一点的软件，但对于最终形态来说，它太过于面向开发者了。像 [Zo Computer](https://www.zo.computer/) 这样的其他应用试图将 LLM 和计算机打包成一个单一的应用，但我认为它仍然没有从最终用户那里充分抽象掉“计算机”这个概念。如果我让同事做件事，我不需要看他们的整个文件系统，我只需要知道他们有一台电脑。

展望 2026 年，我预计我们使用的越来越多的 LLM 应用将以各种新颖有趣的方式绑上电脑，无论我们是否意识到这一点。

如果我可以做空（short）MCP，我会的。我预计我们会回到用最容易获得的编程语言来扩展我们的 Agent：自然语言。