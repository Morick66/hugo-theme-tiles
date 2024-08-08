---
title: Markdown基本语法
description: 这是一篇markdown语法示例文章，
color: "#B3D7E5"
featured: 2
keywords:
  - Hugo主题Stack
  - 博客搭建
  - 页面布局
  - Hugo
date: 2024-03-28
slug: "20240328122600"
image: markdown.jpg
coverURL: https://unsplash.com/photos/a-blue-and-white-swirl-on-a-light-blue-background-dv1pLjQqVmw
canonicalURL: 
categories:
  - 经验分享
math: false
tags:
  - 博客
  - Hugo
  - 主题
---

## 标题
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题

## 段落和换行
这是一个段落。Markdown 支持直接使用 HTML 标签。

要开始一个新的段落，只需要在两行文字之间加一个空行。

换行可以在行尾添加两个以上空格然后回车。

## 格式化
- 这是 *斜体* 文本。
- 这是 **粗体** 文本。
- 这是 ***斜体加粗*** 文本。
- 这是 ~~删除线~~ 文本。

## 列表
### 无序列表
- 项目1
- 项目2
  - 子项目2.1
  - 子项目2.2

### 有序列表
1. 第一项
2. 第二项
   1. 第二项的第一个子项
   2. 第二项的第二个子项

## 链接和图片

[这是一个无意义链接](https://www.example.com)

### 图片

![这是一张图片](markdown.jpg)

## 引用

> 这是一段引用文本。
>
> > 这是引用中的引用。

## 代码

`这是一行代码`

这是一个代码块。

可以包含多行代码。

```python
print("Hello, World!")
for i in range(10):
  print(i)
```

## 表格
| 标题1 | 标题2 | 标题3 |
|-------|-------|-------|
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |

## 水平线

---
或者
***
或者
___

## 任务列表

- [x] 已完成项目
- [ ] 未完成项目

## 转义字符

\*这不是斜体\*
