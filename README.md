# 第三视角天体微信小程序 Demo

这是一个基于微信小程序 Canvas 2D API 实现的 3D 宇宙探索模拟项目。你可以在这个虚拟的宇宙中自由穿梭，观察太阳系、恒星、以及黑洞、星云等特殊天体。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 特性

- **纯 Canvas 绘制**：所有天体和背景均使用 Canvas 2D API 动态绘制，无任何图片素材。
- **3D 投影**：通过简单的数学计算，将 3D 坐标投影到 2D 画布上，实现了伪 3D 效果。
- **动态宇宙**：程序化生成数千颗闪烁的恒星，构建了一个广阔的星空背景。
- **太阳系模拟**：包含了太阳系八大行星，它们按照各自的轨道和速度进行公转。
- **特殊天体**：加入了黑洞、白洞（类星体模拟）、中子星、星云等特殊天体，并配有独特的视觉效果。
- **交互体验**：
  - **单指拖拽**：旋转观察视角。
  - **双指缩放**：拉近或推远视距。
  - **点击天体**：显示该天体的详细信息卡片。

## 📸 预览

![宇宙全景](<https://youke1.picui.cn/s1/2025/11/04/690a1df662169.jpg>)

## 🚀 如何运行

1.  **克隆仓库**
    ```bash
    git clone https://github.com/byJming/third-person-universe-miniprogram.git
    ```
2.  **打开微信开发者工具**
    - 点击“导入”，选择刚刚克隆下来的项目文件夹。
    - **AppID**：使用微信官方提供的测试号 `touristappid`，或填入你自己的 AppID。
3.  **编译运行**
    - 点击“编译”按钮即可在模拟器或真机上预览。

## 🛠️ 技术实现核心

本项目的核心在于 `pages/index/index.js` 文件中的 `project3D` 函数，它负责将三维空间中的坐标点 `(x, y, z)` 转换为屏幕上的二维坐标 `(screenX, screenY)`。

其基本原理是透视投影：
```javascript
const factor = PERSPECTIVE / (PERSPECTIVE + depth);
const screenX = centerX + rotatedX * factor * scale;
const screenY = centerY + y * factor * scale;
```
- `PERSPECTIVE`：定义了视点与投影平面之间的距离，影响透视效果的强度。
- `depth`：物体在 Z 轴上的深度。
- `scale`：用于实现缩放效果。

所有天体的位置更新和绘制都在 `animate` 函数中通过 `requestAnimationFrame` 循环调用，实现了流畅的动画效果。

## 📂 项目结构

```
.
├── app.js                  # 小程序逻辑
├── app.json                # 小程序公共配置
├── app.wxss                # 小程序公共样式表
├── pages
│   └── index
│       ├── index.js        # 页面逻辑（核心代码）
│       ├── index.json      # 页面配置
│       ├── index.wxml      # 页面结构
│       └── index.wxss      # 页面样式
├── project.config.json     # 项目配置
└── sitemap.json            # 站点地图配置
```

## 📄 开源许可

本项目基于 [MIT License](LICENSE) 开源。