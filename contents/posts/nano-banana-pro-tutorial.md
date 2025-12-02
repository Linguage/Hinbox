---
sender: "Hinbox"
subject: "Nano Banana Pro 完整开发者教程"
snippet: ""
overview: >
  
date: "2025-12-02"
labels: ["Inbox"]
isStarred: false
isRead: false
mdTheme: amp
---


# Nano Banana Pro 完整开发者教程

[![封面图像](https://pbs.twimg.com/media/G6X0IolbUAAoOCo?format=jpg&name=large)][1]


探索这一下一代 AI 模型的高级功能——包括思维能力、搜索溯源和惊艳的 4K 输出——将如何赋能你构建复杂且富有创意的应用程序。

虽然 Flash 模型（Nano Banana）带来了速度和实惠，但 Pro 版本引入了“思维”能力、搜索溯源和高保真 4K 输出。是时候在复杂的创意任务上“大展身手”了！

本指南将通过 [Gemini 开发者 API][3] 带你了解 Nano Banana Pro 的高级功能。

**本指南将涵盖：**
1. 在 Google AI Studio 中使用 Nano Banana Pro
2. 项目设置
3. 初始化客户端
4. 基础生成（经典用法）
5. “思维”过程
6. 搜索溯源
7. 高分辨率 4K 生成
8. 多语言能力
9. 高级图像混合
10. Pro 专属演示
11. 最佳实践和提示词技巧

> **注意**：如需本文的交互式版本，请查看 [Python 指南 (Cookbook)][4] 或 AI Studio 的 [Javascript 笔记本][5]。

---

## 1. 在 Google AI Studio 中使用 Nano Banana Pro

虽然最终用户可以在 [Gemini 应用][6] 中访问 Nano Banana Pro，但开发者原型设计和测试提示词的最佳环境是 [Google AI Studio][7]。

AI Studio 是一个游乐场，让你在编写任何代码之前就能试验所有可用的 AI 模型，它也是使用 Gemini API 进行构建的入口。

与 Nano-Banana 不同，Pro 版本没有免费层级，这意味着你需要选择一个启用了计费功能的 API 密钥（请参阅下文的“项目设置”部分）。

[![AI Studio 界面](https://pbs.twimg.com/media/G6XvNuTa0AAdoTn?format=jpg&name=large)][8]

> **提示**：你也可以在 AI Studio 的 [ai.studio/apps][9] 直接 Vibe Code（凭感编程）Nano Banana Web 应用，或者探索代码并改编现有的 [应用案例][10]。

## 2. 项目设置

要跟随本指南操作，你需要以下内容：

*   一个来自 [Google AI Studio][11] 的 API 密钥。
*   为你的项目设置计费。
*   适用于 [Python][12] 或 [JavaScript/TypeScript][13] 的 Google Gen AI SDK。

如果你已经是拥有所有这些配置的硬核 Gemini API 用户，太棒了！请跳过本节直接进入下一节。否则，请按以下步骤开始：

### 步骤 A：获取你的 API 密钥

当你首次登录 AI Studio 时，系统会自动创建一个 Google Cloud 项目和一个 API 密钥。

打开 [API 密钥管理屏幕][14] 并点击“复制”图标以复制你的 API 密钥。

[![获取 API Key](https://pbs.twimg.com/media/G6XvZ89asAAnQ0S?format=jpg&name=large)][15]

### 步骤 B：启用计费

因为 Nano Banana Pro 没有免费层级。你必须在你的 Google Cloud 项目上启用计费。

在 [API 密钥管理屏幕][16] 中，点击项目旁边的 **设置计费 (Set up billing)**，并按照屏幕上的说明进行操作。

[![启用计费](https://pbs.twimg.com/media/G6XvWHWacAAEDAi?format=jpg&name=large)][17]

> **Nano Banana Pro 的费用是多少？**
>
> 使用 Nano Banana Pro 生成图像比 Flash 版本更昂贵，尤其是 4K 图像。在本文发布时，生成一张 1K 或 2K 图像的费用为 **$0.134**，而 4K 图像为 **$0.24**（外加输入和文本输出的 token 费用）。
> 请查看文档中的 [定价][18] 以获取最新详情。

> **专业提示**：要节省 50% 的生成成本，你可以使用 [批处理 (Batch) API][19]。作为交换，你可能需要等待最多 24 小时才能拿到图像。

### 步骤 C：安装 SDK

选择你偏好语言的 SDK。

**Python:**
```bash
pip install -U google-genai
# 安装用于图像处理的 Pillow 库
pip install Pillow
```

**JavaScript / TypeScript:**
```bash
npm install @google/genai
```

> *注意：以下示例使用 Python SDK 进行演示。在 JavaScript 中使用 Nano Banana 的等效代码片段请参考此 [JS 笔记本][5]。*

## 3. 初始化客户端

要使用 Pro 模型，你需要使用 `gemini-3-pro-image-preview` 模型 ID。

```python
from google import genai
from google.genai import types

# 初始化客户端
client = genai.Client(api_key="YOUR_API_KEY")

# 设置模型 ID
PRO_MODEL_ID = "gemini-3-pro-image-preview"
```

## 4. 基础生成（经典用法）

在介绍高级功能之前，让我们先看一个标准生成示例。你可以使用 `response_modalities`（获取文本和图像或仅获取图像）和 `aspect_ratio`（宽高比）来控制输出。

```python
# 提示词：创建一张逼真的暹罗猫图片，左眼绿色，右眼蓝色
prompt = "Create a photorealistic image of a siamese cat with a green left eye and a blue right one"
# 宽高比选项: "1:1","2:3","3:2","3:4","4:3","4:5","5:4","9:16","16:9" 或 "21:9"
aspect_ratio = "16:9"

response = client.models.generate_content(
    model=PRO_MODEL_ID,
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=['Text', 'Image'], # 或者仅 ['Image']
        image_config=types.ImageConfig(
            aspect_ratio=aspect_ratio,
        )
    )
)

# 显示图像
for part in response.parts:
    if image:= part.as_image():
        image.save("cat.png")
```

[![示例图像：猫](https://pbs.twimg.com/media/G6XwpVpbgAAORXI?format=jpg&name=medium)][20]

聊天模式也是一个选项（实际上这也是我推荐用于多轮编辑的模式）。请查看第 8 个示例“多语言 Banana”中的例子。

## 5. “思维”过程

Nano Banana Pro 不仅仅是在绘画；它在思考。这意味着它可以在生成图像之前，对你最复杂、最刁钻的提示词进行推理。最棒的是什么？你可以窥探它的大脑！

要启用此功能，请在 `thinking_config` 中设置 `include_thoughts=True`。

```python
# 提示词：创建一张不寻常但逼真的、可能会病毒式传播的图片
prompt = "Create an unusual but realistic image that might go viral"
aspect_ratio = "16:9"

response = client.models.generate_content(
    model=PRO_MODEL_ID,
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=['Text', 'Image'],
        image_config=types.ImageConfig(
            aspect_ratio=aspect_ratio,
        ),
        thinking_config=types.ThinkingConfig(
            include_thoughts=True # 启用思维展示
        )
    )
)

# 显示图像和思维过程
for part in response.parts:
  if part.thought:
    print(f"Thought: {part.text}")
  elif image:= part.as_image():
    image.save("viral.png")
```

你应该会得到类似这样的输出：

```text
## Imagining Llama Commuters (想象美洲驼通勤者)

I'm focusing on the llamas now. The goal is to capture them as
daily commuters on a bustling bus in La Paz, Bolivia...
(我现在正专注于美洲驼。目标是将它们描绘成玻利维亚拉巴斯繁忙公交车上的日常通勤者...)

[IMAGE]

## Visualizing the Concept (可视化概念)

I'm now fully immersed in the requested scenario...
(我现在完全沉浸在请求的场景中...)
```

[![思维过程示例图](https://pbs.twimg.com/media/G6XxIxGaEAA-_4r?format=jpg&name=large)][21]

这种透明度有助于你理解模型是如何解读你的请求的。这就像是在和你的画师对话！

## 6. 搜索溯源 (实时魔法)

最具颠覆性的功能之一是 **搜索溯源 (Search Grounding)**。Nano Banana Pro 不会停留在过去；它可以访问 Google 搜索的实时数据，生成准确、最新的图像。想要天气信息？没问题。

例如，你可以要求它可视化当前的天气预报：

```python
# 提示词：将东京未来 5 天的当前天气预报可视化为简洁、现代的天气图表。添加我每天应该穿什么的可视化建议。
prompt = "Visualize the current weather forecast for the next 5 days in Tokyo as a clean, modern weather chart. add a visual on what i should wear each day"

response = client.models.generate_content(
    model=PRO_MODEL_ID,
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=['Text', 'Image'],
        image_config=types.ImageConfig(
            aspect_ratio="16:9",
        ),
        tools=[{"google_search": {}}] # 启用 Google 搜索
    )
)

# 保存图像
for part in response.parts:
    if image:= part.as_image():
        image.save("weather.png")

# 显示来源 (你必须始终这样做)
print(response.candidates[0].grounding_metadata.search_entry_point.rendered_content)
```

[![天气预报图](https://pbs.twimg.com/media/G6XxUgraAAEqo94?format=jpg&name=large)][22]

## 7. 追求极致：4K 生成

需要打印级质量的图像？Nano Banana Pro 支持 4K 分辨率。因为有时候，大就是好。

```python
# 提示词：一张橡树经历所有季节的照片
prompt = "A photo of an oak tree experiencing every season" 
# 分辨率选项: "1K", "2K", "4K", 注意必须大写。
resolution = "4K" 

response = client.models.generate_content(
    model=PRO_MODEL_ID,
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=['Text', 'Image'],
        image_config=types.ImageConfig(
            aspect_ratio="1:1",
            image_size=resolution
        )
    )
)
```

[![4K 示例图](https://pbs.twimg.com/media/G6Xxf5zbwAA272v?format=jpg&name=large)][23]

> **注意**：4K 生成成本更高，请明智使用！

## 8. 多语言 Banana (多语言能力)

该模型可以生成并翻译图像中的文本，支持超过十几种语言。它基本上就是你眼前的通用翻译机。

```python
# 生成西班牙语信息图
# 提示词：制作一张适合六年级学生的、用西班牙语解释爱因斯坦广义相对论的信息图
message = "Make an infographic explaining Einstein's theory of General Relativity suitable for a 6th grader in Spanish"

response = chat.send_message(message,
    config=types.GenerateContentConfig(
        image_config=types.ImageConfig(aspect_ratio="16:9")
    )
)

# 保存图像
for part in response.parts:
    if image:= part.as_image():
        image.save("relativity.png")
```

[![西班牙语信息图](https://pbs.twimg.com/media/G6Xxvc_bQAAMjIz?format=jpg&name=large)][24]

```python
# 将其翻译成日语
# 提示词：将此信息图翻译成日语，保持其他所有内容不变
message = "Translate this infographic in Japanese, keeping everything else the same"

response = chat.send_message(message)

# 保存图像
for part in response.parts:
    if image:= part.as_image():
        image.save("relativity_JP.png")
```

[![日语信息图](https://pbs.twimg.com/media/G6XxxpZbYAEJ5xQ?format=jpg&name=large)][25]

## 9. 混合起来！(高级图像混合)

Flash 模型最多可以混合 3 张图像，而 Pro 模型最多可以处理 **14 张图像**！这简直就是一个提示词里的派对。非常适合创建复杂的拼贴画或展示你的整个产品线。

```python
# 混合多张图像
response = client.models.generate_content(
    model=PRO_MODEL_ID,
    contents=[
        "An office group photo of these people, they are making funny faces.", # 这些人的办公室合影，他们在做鬼脸。
        PIL.Image.open('John.png'),
        PIL.Image.open('Jane.png'),
        # ... 最多添加 14 张图像
    ],
)

# 保存图像
for part in response.parts:
    if image:= part.as_image():
        image.save("group_picture.png")
```

[![群像混合示例](https://pbs.twimg.com/media/G6XyAQTbMAAB0oK?format=jpg&name=large)][26]

> **注意**：如果你想要角色具有非常高的保真度，请限制在 5 个以内，这对于派对之夜来说已经足够多了！

## 10. 炫技时间！(Pro 专属演示)

以下是一些只有使用 Nano Banana Pro 才能实现的示例。准备好被惊艳吧：

### 个性化像素艺术 (搜索溯源)

> **提示词**："Search the web then generate an image of isometric perspective, detailed pixel art that shows the career of Guillaume Vernade"
> (搜索网络，然后生成一张等轴测视角的详细像素艺术图像，展示 Guillaume Vernade 的职业生涯)

这利用搜索溯源来查找有关某人的具体信息，并以特定风格将其可视化。

[![像素艺术示例](https://pbs.twimg.com/media/G6XyJNeaQAACFpl?format=jpg&name=large)][27]

### 复杂文本集成

> **提示词**："Show me an infographic about how sonnets work, using a sonnet about bananas written in it, along with a lengthy literary analysis of the poem. Good vintage aesthetics"
> (给我看一张关于十四行诗如何运作的信息图，其中包含一首关于香蕉的十四行诗，以及对该诗的详细文学分析。采用优质的复古美学风格)

该模型可以生成连贯的长文本，并将其完美集成到复杂的布局中。

[![文本集成示例](https://pbs.twimg.com/media/G6XyLLBbAAA8IfB?format=jpg&name=large)][28]

### 高保真样机

> **提示词**："A photo of a program for the Broadway show about TCG players on a nice theater seat, it's professional and well made, glossy, we can see the cover and a page showing a photo of the stage."
> (一张放在精致剧院座位上的、关于 TCG 玩家的百老汇演出节目单的照片，看起来专业且制作精良，有光泽，可以看到封面和展示舞台照片的内页。)

创建具有准确光照和纹理的印刷品逼真样机。

[![样机示例](https://pbs.twimg.com/media/G6XyNKPaMAA4Y8q?format=jpg&name=large)][29]

## 11. Nano Banana 和 Nano Banana Pro 的最佳实践及提示词技巧

为了通过 Nano Banana 模型获得最佳效果，请遵循以下提示词准则：

*   **极度具体 (Be Hyper-Specific)**：你提供的主体、颜色、光照和构图细节越多，你对输出的控制权就越大。
*   **提供上下文和意图 (Provide Context and Intent)**：解释图像的目的或期望的氛围。模型对上下文的理解将影响其创意选择。
*   **迭代和优化 (Iterate and Refine)**：不要指望第一次尝试就完美。利用模型的对话能力进行增量更改并优化你的图像。
*   **使用分步指令 (Use Step-by-Step Instructions)**：对于复杂的场景，将你的提示词分解为一系列清晰、连续的指令。
*   **使用正面描述 (Use Positive Framing)**：与其使用“没有汽车”这样的负面提示，不如从正面描述所需的场景：“一条空旷、废弃的街道，没有任何交通迹象。”
*   **善用搜索溯源 (Use search grounding to your advantage)**：当你明确希望模型使用实时或现实世界数据时，要非常精确。“搜索网络关于奥林匹克里昂队上一场比赛的信息并制作图表”比仅仅说“里昂队上一场比赛的图表”效果更好（后者可能也行，但不要冒险）。
*   **使用 [批处理 (Batch) API][19] 降低成本并获得更多配额**：批处理 API 是一种一起发送少量或大量请求的方法。它们可能需要长达 24 小时来处理，但作为交换，你可以节省 50% 的生成成本。而且配额也更高！

若要深入了解最佳实践，请查阅文档中的 [提示词指南][30] 以及官方博客上发布的 Nano Banana [提示词最佳实践][31]。

---

## 结语

Nano Banana Pro (Gemini 3 Pro Image) 开启了 AI 图像生成的新前沿。凭借其思考、搜索和 4K 渲染能力，它是一个属于严肃创作者（以及认真玩乐者）的工具。

准备好尝试了吗？前往 [Google AI Studio][11]，尝试或自定义我们的 [应用][10]，或者查看 [指南 (cookbook)][4]。

***

## 参考链接列表

[1]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992266839351840768
[2]: https://x.com/GoogleAIStudio/status/1992267030050083091/analytics
[3]: https://ai.google.dev/
[4]: https://colab.sandbox.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Get_Started_Nano_Banana.ipynb
[5]: https://ai.studio/apps/bundled/get_started_image_out?fullscreenApplet=true
[6]: https://gemini.google.com/
[7]: https://aistudio.google.com/banana-pro
[8]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992261429228130304
[9]: https://ai.studio/apps
[10]: https://aistudio.google.com/apps?source=showcase&showcaseTag=nano-banana
[11]: https://aistudio.google.com/
[12]: https://github.com/googleapis/python-genai
[13]: https://github.com/googleapis/js-genai
[14]: https://aistudio.google.com/api-keys
[15]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992261639320809472
[16]: https://aistudio.google.com/projects
[17]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992261573390528512
[18]: https://ai.google.dev/gemini-api/docs/pricing#gemini-3-pro-image-preview
[19]: https://ai.google.dev/gemini-api/docs/image-generation?batch=file#batch-api
[20]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992263003157528576
[21]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992263543102771200
[22]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992263744852983809
[23]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992263940576100352
[24]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992264207719677952
[25]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992264245409701889
[26]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992264496371675136
[27]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992264650231267328
[28]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992264683932549120
[29]: https://x.com/GoogleAIStudio/article/1992267030050083091/media/1992264718082519040
[30]: https://ai.google.dev/gemini-api/docs/image-generation#prompt-guide
[31]: https://developers.googleblog.com/en/how-to-prompt-gemini-2-5-flash-image-generation-for-the-best-results/