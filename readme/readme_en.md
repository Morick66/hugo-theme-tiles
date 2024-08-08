<p align="left">
<img align="left" style="margin: 0 10px 0 0; width: 50px; border-radius:5px;box-sizing: border-box; padding: 0;" src="/static/images/avatar.png">
<h1>Hugo-theme-tiles</h1>
</p>
</br>
<p align="left">
<a href="https://www.morick66.com/"><img src="https://img.shields.io/badge/Framework-Hugo-E4AE3A?logo=hugo&logoColor=white" /></a>
<a href="https://github.com/CaiJimmy/hugo-theme-stack"><img src="https://img.shields.io/badge/Derived-Stack-blue?logo=github&logoColor=white" /></a>
</p>

<p align="left">
<a href="https://github.com/Morick66/hugo-theme-tiles">中文</a>/English
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Demo](#demo)
  - [Demo Website—Tiles demo](#demo-websitetiles-demo)
- [Features](#features)
- [Installation \& Usage](#installation--usage)
  - [Prerequisites](#prerequisites)
  - [Installing the Theme](#installing-the-theme)
  - [Configuration](#configuration)
- [Content Management](#content-management)
  - [Pages](#pages)
  - [Article Frontmatter](#article-frontmatter)
  - [Categories](#categories)
  - [Images](#images)
- [Shortcodes](#shortcodes)
- [Supported Services](#supported-services)
  - [Basic Services](#basic-services)
  - [Pieces](#pieces)
- [Acknowledgments](#acknowledgments)
  - [Used Projects](#used-projects)
  - [Referenced Blog Websites](#referenced-blog-websites)
- [License](#license)

## Demo

### Demo Website—[Tiles demo](https://tiles.morick66.com/)

## Features

- Light and dark themes
- Sidebar
- Search
- Table of contents
- Responsive image viewing based on [Lightbox2](https://github.com/lokesh/lightbox2)
- Widget displaying random articles

## Installation & Usage

### Prerequisites

  - The theme requires Hugo's extended version

### Installing the Theme

**git clone**

```bash
git clone git@github.com:Morick66/hugo-theme-tiles.git themes/hugo-theme-tiles
```

**Git submodule**

```bash
git submodule add git@github.com:Morick66/hugo-theme-tiles.git themes/hugo-theme-tiles
```

### Configuration

**Basic Configuration**

1. Copy the `config.toml` file from the exampleSite directory to the root directory, and customize the configuration.
2. Copy the `content` folder from the exampleSite directory to the root directory, and customize the content.

## Content Management

### Pages

For adding pages, create a `_index.md` file in the `content/page` directory.

**Page Frontmatter Example:**

```yaml
---
title: Immediate
description: Snippets
color: "#E4AE3A"
layout: pieces
slug: pieces
menu:
  main:
    weight: -90
    params:
      icon: pieces
---
```
**Explanation:**

- `title`: Page title.
- `description`: Page description.
- `color`: Theme color of the page.
- `layout`: Page layout HTML template, located in the `layouts/_default` directory.
- `slug`: Page path.
- `menu`
  - `main`:
    - `weight`: Weight of the menu item for ordering.
    - `params`:
      - `icon`: Icon for the menu item.

### Article Frontmatter

Create an article folder in the `content/post` directory and create an `index.md` file.

**Article Frontmatter Example:**

```yaml
---
title: Hello World!
description: Hello World!
color: "#6D4B42"
featured: 
keywords: 
date: 2024-03-19
slug: "202403201844"
image: cover.jpg
coverURL: https://images/path/url
canonicalURL: 
categories: 
math: false
tags:
---
```
**Explanation:**

- `title`: Article title.
- `description`: Article description.
- `color`: Article theme color.
- `featured`: Whether set as featured, can be set as `1` or `2`, i.e., the first and second featured articles on the homepage, each article can only have one `1` and `2`.
- `keywords`: Article keywords.
- `date`: Article publication date.
- `slug`: Article path.
- `image`: Article cover image.
- `coverURL`: Source link for the article cover image.
- `canonicalURL`: Original article URL.
- `categories`: Article categories.
- `math`: Whether to enable math formulas.
- `tags`: Article tags.

### Categories

To create a category, create a category folder in the `content/categories` directory and create an `_index.md` file.
**Category Frontmatter Example:**
```yaml
---
title: Experience Sharing
description: My knowledge and experience sharing, hoping to help you.
slug: experience
keywords:
  - Experience
  - Share
  - Blog
---
```
**Explanation:**

- `title`: Category title.
- `description`: Category description.
- `slug`: Category path.
- `keywords`: Category keywords.

### Images

- All images can be saved in the `static/images` directory. Use the `[image](images/imageName.jpg)` format in articles to refer to them. (Hard to preview in markdown editors)
- Can be stored at the same level directory as the article `index.md`, using the `[image](imageName.jpg)` for reference. (Convenient for preview in markdown editors)
- Use image hosting services

## Shortcodes

Refer to specific styles on the [Demo website](https://tiles.morick66.com/p/20240321055915/).

![alt text](https://github.com/Morick66/hugo-theme-tiles/blob/main/images/screenshot.png?raw=true)

**NetEase Music**

```
{{< netease 518904119 0 >}}
```

**Spotify**

```
{{< spotify type="track" id="3YFGh5Kga1K40yUhuCVffM" height="80px">}}
```

**Centered Quote**

```
{{< quote-center >}}
Centered Quote
{{< /quote-center >}}
```

**Source Quote**

```
{{< quote author="Morick" source="Morick莫里克" url="https://www.morick66.com/">}}
Pretend to be an alien
{{< /quote >}}
```

**Collapsible Title**

```
{{% fold "Collapsible Content Title" %}}

This is a piece of collapsible content, supports markdown

{{% /fold %}}
```

**Note**

```
{{< notice notice-note >}}
Notice—Note
{{< /notice >}}
```

**Tip**

```
{{< notice notice-tip >}}
Notice—Tip
{{< /notice >}}
```

**Info**

```
{{< notice notice-info >}}
Notice—Info
{{< /notice >}}
```

**Warning**

```
{{< notice notice-warning >}}
Notice—Warning
{{< /notice >}}
```

## Supported Services

### Basic Services
- Comments—[Twikoo](https://twikoo.js.org/)
- Statistics—[umami](https://umami.is/)

> **Twikoo** and **umami** deployment and usage please refer to the official documentation

### [Pieces](https://github.com/Morick66/Pieces)

> **Immediate page ([Pieces](https://github.com/Morick66/Pieces))** The data source is a small app built and primarily used by myself, deployed using docker on my own server, and is not a long-term maintained open-source project. Please use with caution.

If using, please modify the `assets/js/pieces.js` file where `const baseURL = '/data/';` to your domain. The example uses website static data.

You can choose not to use Pieces or switch to other similar services (like [memos](https://github.com/usememos/memos)).

If you need to use other services, please modify the `assets/js/pieces.js` file accordingly.

## Acknowledgments

### Used Projects

| Project | License |
| --- | --- |
| [Stack](https://github.com/CaiJimmy/hugo-theme-stack) | GPL-3.0 |
| [Lightbox2](https://github.com/lokesh/lightbox2) | MIT |
|[Normalize.css](https://github.com/necolas/normalize.css)| MIT |

### Referenced Blog Websites

- [张洪HEO](https://blog.zhheo.com/)
- [Leonus](https://blog.leonus.cn/)

## License

This project is licensed under the [GNU General Public License Version 3 (GPL-3.0)](https://www.gnu.org/licenses/gpl-3.0.html).