---
sender: "Hinbox"
subject: "Zed是我们的办公室"
snippet: ""
overview: >
  
date: "2025-12-02"
labels: ["Inbox"]
isStarred: false
isRead: false
mdTheme: amp
---

# Zed是我们的办公室

- 来源：[Zed Is Our Office](https://zed.dev/blog/zed-is-our-office)

现在是美东时间周一中午 12 点，整个 Zed Industries 团队都挤进了我们每周的“全员大会”（All-hands）。有些队友正在草草记下他们的日程变动，而其他人则在详细列出本周的关注重点。[Nathan](https://github.com/nathansobo) 刚刚结束了首要事项的公告，[Morgan](https://github.com/morgankrey) 正在分享我们的各项指标趋势以及运营更新。与此同时，我正在准备上周的用户语录以便分享，其他人则在向 `Discussions`（讨论）部分添加话题。

在整个会议过程中，屏幕被共享，各种声音在对话中切入切出，随着几十个光标在同一文件中实时并发编辑，我们的会议笔记也在飞速增长。

**这整个会议完全是在 Zed 内部进行的。**

![](https://zed.dev/img/post/zed-is-our-office/this-week.webp)

从一开始，我们的使命就是打造一款具备以下特性的编辑器：

1.  **[响应迅速](https://zed.dev/blog/videogame)**：按键与重新渲染之间的延迟应当是难以察觉的。
2.  **专注**：界面应提供最少的干扰，不阻碍代码编写。
3.  **协作**：与队友一起工作的感觉应该和坐在办公室里并肩作战没有什么不同。

抛开前两点不谈，让我们专注于**协作**。

## 刻入 Zed 基因的协作能力

多年来，我们一直梦想着构建终极的协作编辑器。这一愿景的根源可以追溯到 Nathan 在 [Pivotal Labs](https://en.wikipedia.org/wiki/Pivotal_Labs) 的早期岁月，那里[将两个键盘插入同一台电脑进行结对编程](https://www.wired.com/2013/11/pivotal-one/)是标准做法。我们要为分布式团队重现那种无缝的协作体验。

> 等等……其他编辑器不是已经有这种技术了吗？

是的！如果你做开发的时间足够长，你可能还记得 [Atom](https://atom-editor.cc/) 的 [teletype](https://atom-editor.cc/teletype) 插件——这两者都是由 Zed 的创始人构建的。Teletype 允许开发者分享进入他们工作区的“传送门”，这是迈向 Zed 协作愿景的第一步。尽管团队[尝试](https://atom-editor.cc/blog/2017/08/08/atom-1-19#improved-responsiveness-and-memory-usage)让 Atom（一个 [Electron](https://www.electronjs.org/) 应用）响应更迅速，但它从未达到团队渴望的性能标准。Nathan 离开了 Atom 团队，最终开始致力于 [gpui](https://www.gpui.rs/) 的开发，这是 Zed 基于 Rust 编写的 GPU 加速 UI 渲染框架。之后 Atom 被 [GitHub 关停](https://github.blog/news-insights/product-news/sunsetting-atom/)。没有了 Atom，也就没有了 Teletype。

其他编辑器也添加了各自版本的协作功能，但整体体验仍有不足。设置过程繁琐得令人烦恼；你通常需要安装扩展，而且每次想要分享时都得把链接粘贴到终端或编辑器中。并发编辑无法干净地合并，随着更多协作者的加入，性能会迅速下降。最糟糕的是，你往往最终还是得通过 Slack 或 Zoom 共享屏幕。

我们在设计 Zed 时，从底层就开始考虑协作——它**绝非**生搬硬套的服务，也**不是**后知后觉的补救。

利用 [CRDTs](https://zed.dev/blog/crdts)（无冲突复制数据类型）作为我们的核心数据结构，我们确保了无冲突和最终一致性的属性，所有人的更改都能无缝合并并收敛到相同的状态。你不需要为了避免协作服务的致命缺陷而在光标操作上小心翼翼。无论同事是在同一间办公室还是在大洋彼岸，我们的架构都能提供低延迟，而且无论是结对编程（Pair Programming）还是群体编程（Mob Programming），性能都保持轻快。

设置也是毫不费力的：无需安装扩展，无需复制粘贴每次会话的链接；只需要你的 GitHub 账号。借助内置的语音功能和自动切换的屏幕共享，当你需要交流编辑器之外的工作时，无需退回到外部工具。

我们构建 Zed 的协作服务主要是为了我们自己，这样我们可以通过 Zed，在 Zed 中有效地一起构建 Zed。这不仅是一个功能，这对我们的工作方式**至关重要**。我们从中受益匪浅，并在此过程中找到了巨大的乐趣，我们相信你也会喜欢！

## Zed 协作工具速览

![](https://zed.dev/img/post/zed-is-our-office/collab-annotated.webp)

1.  通过点击状态栏中的人物图标打开协作面板，通过 GitHub 认证流程登录后即可访问。
2.  该区域包含被称为“频道（Channel）”的虚拟房间，按层级结构组织。
3.  点击 `+` 按钮创建顶级频道。右键点击现有频道并选择 `New Subchannel`（新建子频道）选项来创建嵌套的子频道。
4.  GitHub 头像显示谁在哪个频道中。点击频道名称即可加入。
5.  点击文档图标访问其“频道笔记”，它作为与频道关联的元数据。
6.  进入频道后，通过麦克风图标开启/静音你的语音。
7.  允许他人查看你的屏幕。
8.  频道是**与项目无关的**。项目是通过标题栏中的 `Share`（分享）按钮在频道*内*自愿分享的。频道可以是公开的 (🛜) 或仅限特定成员 (#️⃣)，并包含 `Guest`（访客）、`Member`（成员）和 `Admin`（管理员）角色的权限系统。
9.  点击标题栏中的头像以跟随队友。如果你正在跟随的人正在共享屏幕，Zed 会自动在跟随他们 Zed 实例中的光标和他们的屏幕共享之间切换，具体取决于他们是聚焦在 Zed 上还是其他应用程序上。

*有关协作的数据和隐私问题，请参阅我们的 [常见问题解答 (FAQs)](https://zed.dev/faq#data-and-privacy)。*

## 我们的虚拟办公室

我们的办公室就是 Zed 的协作面板。

![](https://zed.dev/img/post/zed-is-our-office/tree-focus.webp)

随着公司的成长，[我们的频道树](https://zed.dev/channel/zed-283) 经历了多次迭代，但今天的结构足够灵活，可以适应多种形式的协作。我们的频道树用于：

*   全公司范围的讨论
*   项目工作
*   个人专注时间

虽然任何频道在技术上都可以分类并用作“会议”空间，但我们指定了一些频道用于“全员”会议。这些频道用于签到、知识传播和复盘。项目通常不通过这些会议分享；工作直接在频道笔记中进行。一些例子：

*   每周一，我们跳进 `this week` 频道讨论本周计划，回顾指标，并讨论我们需要处理的任何紧迫事项。

    ```markdown
    # 2025年11月10日，星期一
     
    ## 日程变动
     
    ...
     
    ## 关注领域
     
    - Max: 编辑预测
    - Katie: Git, 学生计划, RBAC, 博客博客博客
    - David: Git (多缓冲区性能)
    - Lukas: Windows / 多缓冲区
    - Ben: ACP + 聚会
    - Cole: 并排差异对比, git PRs
    - Ben K: zeta2
    - Julia: windows bug 修复
    - Anthony: git 工作 😀
    - Smit: 社区看板, issue 回复, pr 分流
    - Finn: 社区看板, 扩展组织 CI
    - Bennet: AI 质量, 建立评估
    - Conrad : 扩展商店测试; 移动自动更新到云端
    - Antonio: 聚会 + DeltaDB
    - Mikayla: 多智能体
    - Kirill: 彩虹括号; PRs
    - Lena: github issues 可见性, 社区看板
    - Oleksiy: zeta2
    - Dino: 社区看板, issue 回复, 结对处理可运行项和性能
    - Joseph: 社区, "在 Zed 中构建 Zed" 博客
    - Mary: 产品经理招聘, 后端
     
    ## 商务角
     
    ...
    ```

*   `retrospectives`（回顾）频道每 6 周使用一次。在这个会议中，鼓励每位员工在诸如 `what went well?`（哪些做得好？）和 `what could have gone better?`（哪些可以做得更好？）等类别下添加要点，并对我们将在此时段讨论的项目进行投票，以便从中学习。

    ```markdown
    # 2025年9月19日，星期五
     
    ### 哪些做得好
     
    - ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 我们保持持续发布
    - ⭐⭐⭐⭐⭐⭐⭐⭐⭐ ACP 发布反响非常好
    - ⭐⭐⭐⭐⭐⭐⭐⭐ DeltaDB 取得重大进展
    - ⭐⭐⭐⭐⭐⭐⭐ 喜欢 Windows 上的进展并对发布感到兴奋
    - ⭐⭐⭐⭐⭐ 在云端的投入真的感觉有了回报，尤其是计费工作
    - ⭐⭐⭐⭐ 编辑预测的进展
    - ⭐⭐⭐ 依赖项的稳定性更好（特别是 tree-sitter，万岁，不再有段错误了）
    - ⭐⭐ 新团队成员表现出色
    - ⭐⭐ 通过 PR 的参与度非常高（而且合并了很多）
    - ⭐ 启动 Codex ACP 集成比 Claude Code 更顺利，多亏了 codex-rs 是开源的 (1000%)
     
    ...
     
    ### 哪些可以做得更好
     
    - ⭐⭐⭐⭐⭐⭐⭐⭐⭐ 我们有多个回归问题 @Kirill 在 nightly 版中发现了，但还是进入了 stable 版
      - 自动更新
      - 丢弃未命名的缓冲区
        => 行动项: @first-responders
    - ⭐⭐⭐⭐⭐⭐⭐⭐⭐ 自动更新损坏（我知道一部分人已经复盘过这个了）
      - 我们现在对此有测试了
        - 我觉得我们需要经历一次这个才能意识到我们需要在这里添加测试
    - ⭐⭐⭐⭐⭐ PR 积压又在增长了 :/
    - ⭐⭐要是有一台值得买的好用的 Windows 笔记本就好了
    ```

*   会议不必很枯燥。`demos`（演示）频道每周五使用，被团队认为是“[劲爆时刻](http://banger.urbanup.com/11605371)”。员工们跳进来，自愿展示他们开发的很酷的功能或 bug 修复，并从团队其他人那里获得实时反馈。

***

除了特定全公司会议的频道外，我们还有一些[通用会议室](https://zed.dev/channel/rooms-23084)，用于那些不适合其他地方且不需要专用空间的一次性会议。

*对于一家构建文本编辑器的公司来说，用过去传奇的打字机命名这些会议空间感觉很合适。*

### 项目专用空间

我们围绕特定项目构建频道和团队，这也是我们大部分协作发生的地方。项目通常将大型计划所需的多个功能组合在一起，例如 [`git 1.0`](https://zed.dev/channel/git-1-0-25944), [`edit predictions v2`](https://zed.dev/channel/edit-predictions-v2-23075), `delta db`, 和 `cloud`。在这些频道中，项目成员作为主持人分享他们的 Zed 代码库实例，供团队协作。频道笔记通常包括项目成员名单、目标、我们旨在通过此项工作解决的 [GitHub Issues](https://github.com/zed-industries/zed) / [Discussions](https://github.com/zed-industries/zed/discussions) / 项目看板的链接，以及项目的总体进度。

```markdown
## Git 1.0
 
团队: Cole, Anthony, Cameron, Jakub, David

相关链接:
 
- Git 1.0 看板: https://github.com/orgs/zed-industries/projects/48/views/1
 
## 完成 🎉 (庆祝然后移到底部)
 
...
 
# 标记:
 
- [D] - 需要设计
- [*] - 进行中
- [x] - 完成
- [-] - 暂停
 
## 第一阶段 (Diffs/差异):
 
- [*] [@jakub @david] 让项目 diff 始终轻快，消除“风火轮”（卡顿）
  - [*] [@david] 让多缓冲区‘加载’增量化
  - [*] [@david] 为多文件缓冲区的 `DisplayMap` 快照添加基准测试
 
...
 
## 第二阶段 (Merge conflicts/合并冲突):
 
- [D] 让我们的合并冲突看起来不像工程师 UI
  - 🎨 冲突区域高亮
  - 高亮 diff3 标记: https://github.com/zed-industries/zed/issues/34813.
  - 为冲突区域的两侧提供更有帮助的标签
- 添加三路冲突解决 UI
 
...
 
## 第三阶段 (Panel/Location/Traversal - 面板/位置/遍历):
 
- [D] 提交日志 (Commit Log)
  - https://github.com/zed-industries/zed/discussions/26511
- [D] 文件历史 UI
  - https://github.com/zed-industries/zed/issues/16827
  - Joseph: 本地文件历史可以由 DeltaDB 支持
  - 让过去的提交 diff 更具交互性 (editor::OpenExcerpts, 文件历史集成)
- [D] 分离已暂存/未暂存的 diff (功能): https://github.com/zed-industries/zed/issues/26560.
 
...
```

子频道通常用于组织项目各个组件的会议空间。

并非所有基于项目的频道都专注于我们要添加到 Zed 的功能；许多频道是为了支持非开发工作而存在的，如营销、社区和指标分析。

*我们的许多项目频道都是公开的，你可以加入[我们的频道树](https://zed.dev/channel/zed-283)，阅读笔记，并了解我们是如何构建 Zed 的，就像 `@FalbertengoDev` 做的那样。*

### 个人专注空间

在我们的树状结构中，有一个 `people` 频道。我们鼓励员工在这里添加一个以自己名字命名的子频道。这些是我们的个人工作区——我们的“虚拟隔间”。当队友在一个个人频道中时，这往往发出一个信号：“我需要一些低头专注的时间来完成这项任务，但如果你有事，欢迎随时过来。”团队中的每个人使用这些频道的方式略有不同。我经常使用我的频道来组织我想写的博客文章的内容。

**趣闻**：*这篇博客文章最初就是在我的 `blog` 子频道中列的大纲。*

敏锐的观察者可能会注意到，在上图的这些频道旁边没有头像。这些频道空着并不罕见，因为团队通常更喜欢在可能的情况下进行协作！

***

我们的虚拟办公室与任何其他实体办公室并没有太大不同——我们有指定的空间用于会议、项目工作和个人专注时间。我们构建的频道树结构旨在支持那些能让我们有效运营公司的工作流程，但你可以根据最适合你团队需求的结构来构建你们的频道树。

## 我们的前进方向

虽然 Zed 中的协作让我们能够在 Zed 内部运营 Zed Industries，但这仅仅触及了我们[对团队工作愿景](https://zed.dev/blog/sequoia-backs-zed)的皮毛。我们正在构建一个未来：协作是持续的对话，而不是离散的提交——每一次讨论、编辑和见解都随着代码的演变而保持链接，对队友和 AI 智能体都触手可及。

走到这一步并非一帆风顺。多年来，我们曾暂停协作功能的开发，转而专注于用户频繁请求的功能——[AI 辅助工具](https://zed.dev/ai)、[调试](https://zed.dev/debugger)、[Windows 支持](https://zed.dev/windows)和 [git 支持](https://zed.dev/git)——但我们对 Zed 的首要目标**从未改变**。随着我们在基础必备功能上与其他编辑器达到同等水平，这些“绕路”变得越来越少，使我们能够重新专注于我们最兴奋的事情：构建最棒的多人软件开发工具。

*目前的协作功能被视为 `alpha` 测试版，目前所有人均可免费使用！欢迎查阅 [源代码](https://github.com/zed-industries/zed/tree/main/crates/collab)。*

