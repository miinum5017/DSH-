# Desktop Pet

在 DSH Web 界面右下角显示一只小鲸灵桌宠。

## 功能

- 空闲时轻微上下漂浮、摇尾巴、随机眨眼
- 点击（或聚焦后按 Enter / 空格）会说话并冒出爱心
- 按住拖动可以换位置
- 跟随 DSH 亮/暗主题的文字与气泡颜色
- 只在浏览器中渲染，不在 Host 侧做任何事

## 安装

### 从本地目录安装

在 DSH 中打开 **插件 → 添加插件 → 安装第三方插件**，选择本目录：

```text
packages/desktop-pet
```

### 从 Git 安装

```text
git+https://github.com/miinum5017/DSH-.git#<commit>&path:/packages/desktop-pet
```

### 从市场安装

市场索引条目由仓库根目录的 `index.json` 提供。安装后插件会出现在 **插件 → 已安装** 中。

## 结构

```text
desktop-pet/
├── package.json       # bundle manifest + dsh.client
├── cordis.patch.yml   # 插入 desktop-pet 插件行
├── index.js           # Host 侧空实现
├── client.js          # Web 侧桌宠组件
├── icon.svg           # 市场图标
├── locale/
│   ├── en.json
│   └── zh.json
└── README.md
```

## 说明

桌宠注册在 `shell.overlay` 插槽中。根节点是 `pointer-events: none`，只有宠物本体接收指针事件，因此不会挡住页面其他操作。

样式只引用 `--dsw-alias-*` 主题 token；鲸鱼本体的颜色属于插画，不随主题变化。
