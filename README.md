# DSH- Plugin Market

这个仓库是一个 DSH 插件市场索引源，目前上架了 [桌宠](packages/desktop-pet)。

## 已上架插件

| 插件 | 说明 |
|---|---|
| [桌宠](packages/desktop-pet) | 右下角的小鲸灵，会漂浮、眨眼、说话，可拖拽 |

桌宠的索引条目由 `scripts/update-market.mjs` 自动写入，`commit` 指向包含插件包的 Git 提交。

## 市场地址

把 `index.json` 提交到 `main` 分支后，DSH 里添加以下地址之一：

- Raw（无需开启 Pages，推送后立即可用）：

  ```text
  https://raw.githubusercontent.com/miinum5017/DSH-/main/index.json
  ```

- GitHub Pages（在 Settings → Pages 里选择 `main` / `/(root)` 后）：

  ```text
  https://miinum5017.github.io/DSH-/index.json
  ```

注意：**不要填** `https://github.com/miinum5017/DSH-.git`。  
它是 Git 克隆地址，不是 JSON 索引地址。

## 目录

```text
.
├── index.json                 # DSH 插件市场索引（格式 1）
├── packages/
│   └── desktop-pet/           # 桌宠插件包
├── scripts/
│   └── update-market.mjs      # 用当前 Git commit 更新索引条目
└── README.md
```

## 发布桌宠

第一次发布分两次提交：先提交插件包，再让脚本把该提交的 SHA 写进索引。

```powershell
cd "C:\Users\lenovo\OneDrive\Documents\deepseek-harness\default-workspace\market-repo"

# 1. 提交插件包
git add packages scripts README.md
git commit -m "Add desktop pet plugin"

# 2. 用当前 HEAD 的 commit SHA 更新 index.json
node scripts/update-market.mjs

# 3. 提交索引
git add index.json
git commit -m "List desktop pet in market"

# 4. 推送
git -c http.sslBackend=openssl push -u origin main
```

之后更新桌宠版本：

1. 修改 `packages/desktop-pet/package.json` 的 `version`
2. 提交插件包
3. 运行 `node scripts/update-market.mjs`
4. 提交 `index.json`
5. 推送

`update-market.mjs` 会保留旧版本条目，只替换同版本条目，因此市场里可以同时保留多个版本。

## 索引条目格式

每个插件至少需要：

```json
{
  "name": "@your-scope/dsh-plugin-hello",
  "title": {
    "en": "Hello",
    "zh": "问候"
  },
  "description": {
    "en": "A minimal DSH plugin.",
    "zh": "一个最小的 DSH 插件。"
  },
  "author": "your-name",
  "versions": [
    {
      "version": "1.0.0",
      "publishTimestamp": 1767225600,
      "source": {
        "type": "npm"
      },
      "engines": {
        "dsh": ">=0.2.0 <0.3.0"
      }
    }
  ]
}
```

如果插件发布在本仓库的子目录，使用 Git 来源：

```json
{
  "name": "@miinum5017/dsh-plugin-hello",
  "title": {
    "en": "Hello",
    "zh": "问候"
  },
  "versions": [
    {
      "version": "1.0.0",
      "publishTimestamp": 1767225600,
      "source": {
        "type": "git",
        "url": "https://github.com/miinum5017/DSH-",
        "commit": "完整的 40 位小写 commit SHA",
        "path": "packages/hello"
      },
      "engines": {
        "dsh": ">=0.2.0 <0.3.0"
      }
    }
  ]
}
```

`publishTimestamp` 是 Unix 秒，不是毫秒。

## 插件包要求

插件包本身必须是 DSH bundle，`package.json` 至少包含：

```json
{
  "name": "@miinum5017/dsh-plugin-hello",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": "./index.js"
  },
  "dsh": {
    "bundle": {
      "patch": "./cordis.patch.yml"
    }
  }
}
```

并在 `cordis.patch.yml` 里插入自己的插件行：

```yaml
- insert:
    - id: hello
      name: '@miinum5017/dsh-plugin-hello'
```

没有 `dsh.bundle.patch` 的包会在安装时被拒绝。

## 在 DSH 里使用

**插件 → 发现 → 添加索引源**，填入 Raw 地址。  
市场会显示「DSH- 插件市场」，进入桌宠条目后点安装即可。
