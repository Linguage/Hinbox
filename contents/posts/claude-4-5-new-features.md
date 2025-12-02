---
sender: "Hinbox"
subject: "Claude 4.5 新特性"
snippet: ""
overview: >
  
date: "2025-12-02"
labels: ["Inbox"]
isStarred: false
isRead: false
mdTheme: amp
---
# Claude 4.5 新特性

- 来源：[What's new in Claude 4.5](https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-5#key-improvements-in-opus-4-5-over-opus-4-1)

Claude 4.5 推出了三款针对不同用例设计的模型：

- **Claude Opus 4.5**：我们最智能的模型，结合了极致的能力与实用的性能。非常适合复杂的专业任务、专业软件工程和高级智能体。价格比之前的 Opus 模型更亲民。
- **Claude Sonnet 4.5**：我们用于复杂智能体和编程的最佳模型，在大多数任务中拥有最高智力水平。
- **Claude Haiku 4.5**：我们最快且最智能的 Haiku 模型，具有接近前沿的性能。这也是首个支持扩展思维（extended thinking）的 Haiku 模型。

## Opus 4.5 相比 Opus 4.1 的主要改进

### 极致智力

Claude Opus 4.5 代表了我们最智能的模型，结合了极致的能力与实用的性能。它在推理、编程和复杂问题解决任务上实现了阶梯式的提升，同时保持了 Opus 系列一贯的高质量输出。

### Effort 参数

Claude Opus 4.5 是唯一支持 [Effort 参数](https://platform.claude.com/docs/en/build-with-claude/effort)的模型，允许您控制 Claude 在响应时使用的 Token 数量。这使您能够通过单个模型在回复的详尽程度和 Token 效率之间进行权衡。

Effort 参数会影响响应中的所有 Token，包括文本回复、工具调用和扩展思维。您可以选择：

- **High effort（高）**：最大程度的详尽性，适用于复杂的分析和详细的解释。
- **Medium effort（中）**：平衡的方法，适用于大多数生产用例。
- **Low effort（低）**：最节省 Token 的响应，适用于大批量自动化任务。

### 卓越的计算机使用能力

Claude Opus 4.5 引入了[增强的计算机使用能力](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)，新增了缩放（zoom）操作，能够以全分辨率详细检查特定的屏幕区域。这使得 Claude 能够检查在标准截图中可能不清楚的细微 UI 元素、小字体文本和详细的视觉信息。

缩放功能在以下方面特别有价值：

- 检查微小的 UI 元素和控件
- 阅读精细的印刷品或详细文本
- 分析信息密集的复杂界面
- 在采取行动前验证精确的视觉细节

### 实用性能

Claude Opus 4.5 以比之前的 Opus 模型[更亲民的价格](https://platform.claude.com/docs/en/about-claude/pricing)提供旗舰级的智力，使先进的 AI 能力能够应用于更广泛的应用程序和用例。

### 思维块保留

Claude Opus 4.5 [自动保留所有之前的思维块](https://platform.claude.com/docs/en/build-with-claude/extended-thinking#thinking-block-preservation-in-claude-opus-4-5)贯穿整个对话，在扩展的多轮交互和工具使用会话中保持推理的连续性。这确保了 Claude 在处理复杂的、长期运行的任务时，可以有效利用其完整的推理历史。

## Sonnet 4.5 相比 Sonnet 4 的主要改进

### 卓越的编程能力

Claude Sonnet 4.5 是我们需要迄今为止最好的编程模型，在整个开发生命周期中都有显著改进：

- **SWE-bench Verified 表现**：在编程基准测试中达到先进的最前沿水平
- **增强的规划和系统设计**：更好的架构决策和代码组织
- **改进的安全工程**：更稳健的安全实践和漏洞检测
- **更好的指令遵循**：更精确地遵守编程规范和要求

当启用[扩展思维](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)时，Claude Sonnet 4.5 在编程任务上的表现显著更好。扩展思维默认是禁用的，但我们建议在进行复杂的编程工作时启用它。请注意，扩展思维会影响 [Prompt 缓存效率](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#caching-with-thinking-blocks)。有关配置详情，请参阅[迁移指南](https://platform.claude.com/docs/en/about-claude/models/migrating-to-claude-4#extended-thinking-recommendations)。

### 智能体能力

Claude Sonnet 4.5 在智能体能力方面引入了重大进展：

- **扩展的自主操作**：Sonnet 4.5 可以独立工作数小时，同时保持清晰度和对渐进式进展的专注。该模型一次稳步推进少量任务，而不是试图一次性完成所有任务。它提供基于事实的进度更新，准确反映已完成的工作。
- **上下文感知**：Claude 现在会在整个对话过程中追踪其 Token 使用情况，并在每次工具调用后接收更新。这种感知能力有助于防止过早放弃任务，并使其能在长期运行的任务中更有效地执行。有关技术细节，请参阅[上下文感知](https://platform.claude.com/docs/en/build-with-claude/context-windows#context-awareness-in-claude-sonnet-4-5)和[Prompt 指南](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices#context-awareness-and-multi-window-workflows)。
- **增强的工具使用**：该模型更有效地使用并行工具调用，在研究期间同时发起多个推测性搜索，并一次读取多个文件以更快地构建上下文。通过改进跨多个工具和信息源的协调能力，使模型能够在智能体搜索和编程工作流中有效利用广泛的能力。
- **高级上下文管理**：Sonnet 4.5 在外部文件中保持出色的状态追踪，在跨会话中保持目标导向。结合更有效的上下文窗口使用和我们新的上下文管理 API 功能，该模型可以优化处理跨扩展会话的信息，以随时间推移保持连贯性。

Claude Sonnet 4.5 拥有一种改进的沟通方式，即简洁、直接且自然。它提供基于事实的进度更新，并且可能会在工具调用后跳过冗长的总结以保持工作流的势头（尽管可以通过 Prompt 调整这一点）。

有关使用此沟通风格的详细指导，请参阅 [Claude 4 最佳实践](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices)。

### 创意内容生成

Claude Sonnet 4.5 在创意内容任务方面表现出色：

- **演示文稿和动画**：在创建幻灯片和视觉内容方面，匹敌或超过 Claude Opus 4.1 和 Opus 4.5
- **创意才华**：生成润色过的、专业的内容，并具有很强的指令遵循能力
- **初次尝试质量**：在初次尝试中即可生成可用的、设计良好的内容

## Haiku 4.5 相比 Haiku 3.5 的主要改进

Claude Haiku 4.5 代表了 Haiku 模型系列的变革性飞跃，为我们最快的模型类别带来了前沿能力：

### 极速且接近前沿的智力

Claude Haiku 4.5 以更低的成本和更快的速度提供了与 Sonnet 4 相当的接近前沿的性能：

- **接近前沿的智力**：在推理、编程和复杂任务上匹敌 Sonnet 4 的性能
- **增强的速度**：速度是 Sonnet 4 的两倍以上，并针对每秒输出 Token 数 (OTPS) 进行了优化
- **最佳的性价比**：以三分之一的成本提供接近前沿的智力，非常适合大批量部署

### 扩展思维能力

Claude Haiku 4.5 是**首个支持扩展思维的 Haiku 模型**，为 Haiku 系列带来了高级推理能力：

- **极速推理**：访问 Claude 的内部推理过程以解决复杂问题
- **思维摘要**：为生产级部署提供摘要式的思维输出
- **穿插思维**：在工具调用之间进行思考，以实现更复杂的多步骤工作流
- **预算控制**：配置思维 Token 预算，以平衡推理深度与速度

必须通过在 API 请求中添加 `thinking` 参数来显式启用扩展思维。有关实现细节，请参阅[扩展思维文档](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)。

当启用[扩展思维](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)时，Claude Haiku 4.5 在编程和推理任务上的表现显著更好。扩展思维默认是禁用的，但我们建议在处理复杂问题解决、编程工作和多步推理时启用它。请注意，扩展思维会影响 [Prompt 缓存效率](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#caching-with-thinking-blocks)。有关配置详情，请参阅[迁移指南](https://platform.claude.com/docs/en/about-claude/models/migrating-to-claude-4#extended-thinking-recommendations)。

### 上下文感知

Claude Haiku 4.5 具有**上下文感知**功能，使模型能够在整个对话过程中追踪其剩余的上下文窗口：

- **Token 预算追踪**：Claude 在每次工具调用后收到关于剩余上下文容量的实时更新
- **更好的任务持久性**：通过了解可用的工作空间，模型可以更有效地执行任务
- **多上下文窗口工作流**：改进了跨扩展会话的状态转换处理

这是首个具有原生上下文感知能力的 Haiku 模型。有关 Prompt 指南，请参阅 [Claude 4 最佳实践](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices#context-awareness-and-multi-window-workflows)。

### 强大的编程和工具使用

Claude Haiku 4.5 提供了现代 Claude 模型所期望的强大编程能力：

- **编程熟练度**：在代码生成、调试和重构任务上表现出色
- **全工具支持**：兼容所有 Claude 4 工具，包括 bash、代码执行、文本编辑器、网络搜索和计算机使用
- **增强的计算机使用**：针对自主桌面交互和浏览器自动化工作流进行了优化
- **并行工具执行**：为复杂工作流高效协调多个工具

Haiku 4.5 专为需要兼顾智力和效率的用例而设计：

- **实时应用**：交互式用户体验的快速响应时间
- **大批量处理**：大规模部署的经济高效型智力
- **免费层实现**：以可接受的价格提供优质的模型质量
- **子智能体架构**：用于多智能体系统的快速、智能的智能体
- **大规模计算机使用**：经济高效的自主桌面和浏览器自动化

## 新 API 功能

### 编程式工具调用 (Beta)

[编程式工具调用](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling)允许 Claude 在代码执行容器内通过编写代码以编程方式调用您的工具，而无需每次工具调用都经过模型的往返交互。这显著降低了多工具工作流的延迟，并通过允许 Claude 在数据到达模型上下文窗口之前对其进行过滤或处理来减少 Token 消耗。

```python
tools=[
    {
        "type": "code_execution_20250825",
        "name": "code_execution"
    },
    {
        "name": "query_database",
        "description": "Execute a SQL query against the sales database. Returns a list of rows as JSON objects.",
        "input_schema": {...},
        "allowed_callers": ["code_execution_20250825"]  # Enable programmatic calling
    }
]
```

主要优势：

- **降低延迟**：消除工具调用之间与模型的往返交互
- **Token 效率**：在返回给 Claude 之前，以编程方式处理和过滤工具结果
- **复杂工作流**：支持循环、条件逻辑和批处理

[工具搜索工具](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)使 Claude 能够通过按需动态发现和加载工具来处理数百或数千个工具。Claude 不必预先将所有工具定义加载到上下文窗口中，而是搜索您的工具目录并仅加载其所需的工具。

提供两种搜索变体：

- **Regex** (`tool_search_tool_regex_20251119`)：Claude 构建正则表达式模式来搜索工具名称、描述和参数
- **BM25** (`tool_search_tool_bm25_20251119`)：Claude 使用自然语言查询来搜索工具

```python
tools=[
    {
        "type": "tool_search_tool_regex_20251119",
        "name": "tool_search_tool_regex"
    },
    {
        "name": "get_weather",
        "description": "Get the weather at a specific location",
        "input_schema": {...},
        "defer_loading": True  # Load on-demand via search
    }
]
```

这种方法解决了两个关键挑战：

- **上下文效率**：通过不预先加载所有工具定义，节省 10-20K Token
- **工具选择准确性**：即使有 100 多个可用工具，也能保持高准确性

### Effort 参数 (Beta)

[Effort 参数](https://platform.claude.com/docs/en/build-with-claude/effort)允许您控制 Claude 在响应时使用的 Token 数量，在响应详尽性和 Token 效率之间进行权衡：

```python
response = client.beta.messages.create(
    model="claude-opus-4-5-20251101",
    betas=["effort-2025-11-24"],
    max_tokens=4096,
    messages=[{"role": "user", "content": "..."}],
    output_config={
        "effort": "medium"  # "low", "medium", or "high"
    }
)
```

Effort 参数会影响响应中的所有 Token，包括文本回复、工具调用和扩展思维。较低的 Effort 级别产生更简洁的响应和最少的解释，而较高的 Effort 则提供详细的推理和全面的答案。

### 工具使用示例 (Beta)

[工具使用示例](https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use#providing-tool-use-examples)允许您提供有效的工具输入具体示例，以帮助 Claude 了解如何更有效地使用您的工具。这对于具有嵌套对象、可选参数或格式敏感输入的复杂工具特别有用。

```python
tools=[
    {
        "name": "get_weather",
        "description": "Get the current weather in a given location",
        "input_schema": {...},
        "input_examples": [
            {
                "location": "San Francisco, CA",
                "unit": "fahrenheit"
            },
            {
                "location": "Tokyo, Japan",
                "unit": "celsius"
            },
            {
                "location": "New York, NY"  # Demonstrates optional 'unit' parameter
            }
        ]
    }
]
```

示例包含在 Prompt 中与工具架构并列，向 Claude 展示格式良好的工具调用的具体模式。每个示例必须根据该工具的 `input_schema` 有效。

### 记忆工具 (Beta)

新的[记忆工具](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)使 Claude 能够在上下文窗口之外存储和检索信息：

```python
tools=[
    {
        "type": "memory_20250818",
        "name": "memory"
    }
]
```

这允许：

- 随时间推移构建知识库
- 跨会话维护项目状态
- 通过基于文件的存储保留实际上无限的上下文

### 上下文编辑

使用[上下文编辑](https://platform.claude.com/docs/en/build-with-claude/context-editing)通过自动清除工具调用来进行智能上下文管理：

```python
response = client.beta.messages.create(
    betas=["context-management-2025-06-27"],
    model="claude-sonnet-4-5",  # or claude-haiku-4-5
    max_tokens=4096,
    messages=[{"role": "user", "content": "..."}],
    context_management={
        "edits": [
            {
                "type": "clear_tool_uses_20250919",
                "trigger": {"type": "input_tokens", "value": 500},
                "keep": {"type": "tool_uses", "value": 2},
                "clear_at_least": {"type": "input_tokens", "value": 100}
            }
        ]
    },
    tools=[...]
)
```

此功能会在接近 Token 限制时自动删除较旧的工具调用和结果，帮助管理长期运行的智能体会话中的上下文。

### 增强的停止原因

Claude 4.5 模型引入了一个新的 `model_context_window_exceeded` 停止原因，明确指示生成何时因达到上下文窗口限制而停止，而不是请求的 `max_tokens` 限制。这使得在应用程序逻辑中更容易处理上下文窗口限制。

```json
{
  "stop_reason": "model_context_window_exceeded",
  "usage": {
    "input_tokens": 150000,
    "output_tokens": 49950
  }
}
```

### 改进的工具参数处理

Claude 4.5 模型包含一个错误修复，可保留工具调用字符串参数中的预期格式。以前，字符串参数中的尾随换行符有时会被错误地剥离。此修复确保需要精确格式（如文本编辑器）的工具能够准确接收预期的参数。

**示例：**

```json
// 之前：最后的换行符被意外剥离
{
  "type": "tool_use",
  "id": "toolu_01A09q90qw90lq917835lq9",
  "name": "edit_todo",
  "input": {
    "file": "todo.txt",
    "contents": "1. Chop onions.\n2. ???\n3. Profit"
  }
}

// 之后：尾随换行符按预期保留
{
  "type": "tool_use",
  "id": "toolu_01A09q90qw90lq917835lq9",
  "name": "edit_todo",
  "input": {
    "file": "todo.txt",
    "contents": "1. Chop onions.\n2. ???\n3. Profit\n"
  }
}
```

### Token 计数优化

Claude 4.5 模型包含自动优化以提高模型性能。这些优化可能会向请求添加少量 Token，但**您无需为这些系统添加的 Token 付费**。

## Claude 4 引入的功能

以下功能是在 Claude 4 中引入的，并适用于所有 Claude 4 模型，包括 Claude Sonnet 4.5 和 Claude Haiku 4.5。

### 新的拒绝（Refusal）停止原因

Claude 4 模型引入了一个新的 `refusal` 停止原因，用于模型出于安全原因拒绝生成内容的情况：

```json
{
  "id": "msg_014XEDjypDjFzgKVWdFUXxZP",
  "type": "message",
  "role": "assistant",
  "model": "claude-sonnet-4-5",
  "content": [{"type": "text", "text": "I would be happy to assist you. You can "}],
  "stop_reason": "refusal",
  "stop_sequence": null,
  "usage": {
    "input_tokens": 564,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "output_tokens": 22
  }
}
```

使用 Claude 4 模型时，您应该更新应用程序以[处理 `refusal` 停止原因](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/handle-streaming-refusals)。

### 摘要式思维 (Summarized thinking)

启用扩展思维后，Claude 4 模型的 Messages API 会返回 Claude 完整思维过程的摘要。摘要式思维提供了扩展思维的全部智力优势，同时防止滥用。

虽然 API 在 Claude 3.7 和 4 模型之间是一致的，但扩展思维的流式响应可能会以“块状”模式传输，流式事件之间可能存在延迟。

有关更多信息，请参阅[扩展思维文档](https://platform.claude.com/docs/en/build-with-claude/extended-thinking#summarized-thinking)。

### 穿插思维 (Interleaved thinking)

Claude 4 模型支持将工具使用与扩展思维穿插进行，允许进行更自然的对话，其中工具使用和回复可以与常规消息混合。

有关更多信息，请参阅[扩展思维文档](https://platform.claude.com/docs/en/build-with-claude/extended-thinking#interleaved-thinking)。

### 行为差异

Claude 4 模型有明显的行为变化，可能会影响您构建 Prompt 的方式：

#### 沟通风格的变化

- **更简洁直接**：Claude 4 模型的沟通效率更高，解释更少冗长
- **更自然的语气**：回复稍微更具对话性，减少了机器味
- **注重效率**：完成动作后可能会跳过详细总结以保持工作流势头（如果需要，您可以通过 Prompt 要求更多细节）

#### 指令遵循

Claude 4 模型经过训练可进行精确的指令遵循，需要更明确的指导：

- **明确行动**：如果您希望 Claude 采取行动，请使用直接的语言，如“进行这些更改”或“实施此功能”，而不是“您可以建议更改吗”
- **清晰说明期望行为**：Claude 将精确遵循指令，因此具体说明您想要什么有助于获得更好的结果

有关使用这些模型的全面指导，请参阅 [Claude 4 Prompt 工程最佳实践](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices)。

### 更新的文本编辑器工具

文本编辑器工具已针对 Claude 4 模型进行了更新，更改如下：

- **工具类型**：`text_editor_20250728`
- **工具名称**：`str_replace_based_edit_tool`
- 不再支持 `undo_edit` 命令

如果您从 Claude Sonnet 3.7 迁移并正在使用文本编辑器工具：

```python
# Claude Sonnet 3.7
tools=[
    {
        "type": "text_editor_20250124",
        "name": "str_replace_editor"
    }
]

# Claude 4 Models
tools=[
    {
        "type": "text_editor_20250728",
        "name": "str_replace_based_edit_tool"
    }
]
```

有关更多信息，请参阅[文本编辑器工具文档](https://platform.claude.com/docs/en/agents-and-tools/tool-use/text-editor-tool)。

### 更新的代码执行工具

如果您正在使用代码执行工具，请确保使用最新版本 `code_execution_20250825`，该版本添加了 Bash 命令和文件操作功能。

旧版本 `code_execution_20250522`（仅 Python）仍然可用，但不建议用于新实现。

有关迁移说明，请参阅[代码执行工具文档](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool#upgrade-to-latest-tool-version)。

## 定价和可用性

### 定价

Claude 4.5 模型保持了具有竞争力的定价：

| 模型 | 输入 | 输出 |
| --- | --- | --- |
| Claude Opus 4.5 | $5 / 百万 Token | $25 / 百万 Token |
| Claude Sonnet 4.5 | $3 / 百万 Token | $15 / 百万 Token |
| Claude Haiku 4.5 | $1 / 百万 Token | $5 / 百万 Token |

有关更多详细信息，请参阅[定价文档](https://platform.claude.com/docs/en/about-claude/pricing)。

### 第三方平台定价

从 Claude 4.5 模型（Opus 4.5、Sonnet 4.5 和 Haiku 4.5）开始，AWS Bedrock 和 Google Vertex AI 提供两种端点类型：

- **全球端点 (Global endpoints)**：动态路由以实现最大可用性
- **区域端点 (Regional endpoints)**：保证数据通过特定地理区域路由，**价格溢价 10%**

**此区域定价适用于所有 Claude 4.5 模型：Opus 4.5、Sonnet 4.5 和 Haiku 4.5。**

**Claude API (1P) 默认为全球模式，不受此更改影响。** Claude API 仅提供全球服务（等同于其他提供商的全球端点产品和定价）。

有关实施细节和迁移指南：

- [AWS Bedrock 全球与区域端点](https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock#global-vs-regional-endpoints)
- [Google Vertex AI 全球与区域端点](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai#global-vs-regional-endpoints)

### 可用性

Claude 4.5 模型可通过以下方式获取：

| 模型 | Claude API | Amazon Bedrock | Google Cloud Vertex AI |
| --- | --- | --- | --- |
| Claude Opus 4.5 | `claude-opus-4-5-20251101` | `anthropic.claude-opus-4-5-20251101-v1:0` | `claude-opus-4-5@20251101` |
| Claude Sonnet 4.5 | `claude-sonnet-4-5-20250929` | `anthropic.claude-sonnet-4-5-20250929-v1:0` | `claude-sonnet-4-5@20250929` |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` | `anthropic.claude-haiku-4-5-20251001-v1:0` | `claude-haiku-4-5@20251001` |

也可通过 Claude.ai 和 Claude Code 平台使用。

## 迁移指南

破坏性更改和迁移要求因您升级前的模型而异。有关详细的迁移说明，包括分步指南、破坏性更改和迁移清单，请参阅[迁移到 Claude 4.5](https://platform.claude.com/docs/en/about-claude/models/migrating-to-claude-4)。

迁移指南涵盖以下场景：

- **Claude Sonnet 3.7 → Sonnet 4.5**：包含破坏性更改的完整迁移路径
- **Claude Haiku 3.5 → Haiku 4.5**：包含破坏性更改的完整迁移路径
- **Claude Sonnet 4 → Sonnet 4.5**：更改极少的快速升级
- **Claude Opus 4.1 → Sonnet 4.5**：无破坏性更改的无缝升级
- **Claude Opus 4.1 → Opus 4.5**：无破坏性更改的无缝升级
- **Claude Opus 4.5 → Sonnet 4.5**：无破坏性更改的无缝降级

[最佳实践](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices)

[学习 Claude 4.5 模型的 Prompt 工程技巧](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices)

[模型概览](https://platform.claude.com/docs/en/about-claude/models/overview)

[将 Claude 4.5 模型与其他 Claude 模型进行比较](https://platform.claude.com/docs/en/about-claude/models/overview)

[迁移指南](https://platform.claude.com/docs/en/about-claude/models/migrating-to-claude-4)

[从以前的模型升级](https://platform.claude.com/docs/en/about-claude/models/migrating-to-claude-4)