# Nest Admin 登录页设计规范 (Design System)

本文档总结了 `frontend/src/views/login/index.vue` 登录页面的设计风格、颜色系统及交互规范。

## 1. 设计风格 (Design Style)

该页面采用 **Modern Glassmorphism (现代毛玻璃)** 结合 **Fluid Aesthetics (流体美学)** 的设计风格。

- **毛玻璃效果 (Glassmorphism)**：通过 `backdrop-filter: blur(16px)` 和半透明背景色实现，增加界面的层次感和通透感。
- **流体背景 (Fluid Background)**：使用动态的渐变圆球 (Blobs) 和颗粒感叠加层 (Grain Overlay)，营造灵动且具有质感的视觉体验。
- **极简主义 (Minimalism)**：清晰的布局、充足的留白以及直观的图标引导。

## 2. 颜色系统 (Color System)

### 2.1 品牌色 (Brand Colors)
- **Primary (主色)**: `#8B5CF6` (Violet-500) - 用于主按钮、焦点环、品牌标识。
- **Secondary (辅助色)**: `#EC4899` (Pink-500) - 用于装饰性元素、渐变色。

### 2.2 基础背景色 (Backgrounds)
- **Light Mode (浅色模式)**:
  - 页面背景: `#F3F4F6` (Gray-100)
  - 卡片背景: `rgba(255, 255, 255, 0.7)`
- **Dark Mode (深色模式)**:
  - 页面背景: `#0F172A` (Slate-900)
  - 卡片背景: `rgba(17, 25, 40, 0.7)`

### 2.3 文本颜色 (Typography Colors)
- **标题**: `Gray-900` (浅色) / `White` (深色)
- **正文**: `Gray-600` (浅色) / `Gray-300` (深色)
- **辅助/占位符**: `Gray-500` / `Gray-400`

## 3. 字体系统 (Typography)

- **Display (展示字体)**: `'Space Grotesk', sans-serif` - 用于标题和品牌名称，具有现代感和几何特征。
- **Sans (正文字体)**: `'Inter', sans-serif` - 用于表单、按钮和常规文本，确保极佳的可读性。

## 4. 关键组件规范 (Component Specifications)

### 4.1 登录卡片 (Login Card)
- **圆角**: `3xl` (24px)
- **阴影**: `shadow-2xl`
- **边框**: `1px solid rgba(255, 255, 255, 0.5)` (浅色) / `rgba(255, 255, 255, 0.1)` (深色)

### 4.2 输入框 (Inputs)
- **高度**: `py-3` (约 44px)
- **背景**: `bg-white/50` (浅色) / `bg-slate-800/50` (深色)
- **交互**: 聚焦时显示 `ring-2 ring-primary`。

### 4.3 按钮 (Buttons)
- **主按钮**: 线性渐变结合扫光动画 (`shimmer`)。
- **悬浮效果**: `hover:scale-[1.02]` 微动效。

## 5. 动画规范 (Animations)

- **Blob Animation**: 7秒循环的位移与缩放动画，增加背景活力。
- **Shimmer Effect**: 1.5秒循环的扫光动画，引导用户点击登录。
- **Fade-in-up**: 页面加载时左侧内容的平滑入场动效。

---
*更新日期：2026-02-27*
