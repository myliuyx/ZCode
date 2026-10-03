ZCode $VERSION

由 GitHub Actions 从源码构建的三平台安装包。

> 这些包以 **Preview / TEST** 身份构建，连接测试后端，不会覆盖已安装的正式版 ZCode。

## 下载

| 平台 | 文件 | 说明 |
| --- | --- | --- |
| macOS (Apple Silicon) | `*-mac-arm64_TEST.dmg` | 双击打开，将 ZCode 拖入「应用程序」 |
| macOS (备用) | `*-mac-arm64_TEST.zip` | DMG 无法打开时使用 |
| Windows (x64) | `*-win-x64_TEST.exe` | NSIS 安装包，可选安装目录 |
| Linux (x64) | `*-linux-x86_64_TEST.AppImage` | 需执行权限：`chmod +x *.AppImage` |
| Linux (x64) | `*-linux-amd64_TEST.deb` | Debian / Ubuntu：`sudo apt install ./<file>.deb` |

## 安装后

### macOS：解除隔离属性

这些包**未做 Apple 公证**，macOS 首次打开会拦截。安装后执行：

```bash
sudo xattr -rd com.apple.quarantine /Applications/ZCode.app
```

### Windows：SmartScreen 提示

未做代码签名，SmartScreen 可能显示「Windows 已保护你的电脑」：

1. 点击 **更多信息**
2. 点击 **仍要运行**

### Linux

AppImage 需要 fuse 支持；若提示 fuse 相关错误，执行 `sudo apt install libfuse2`。

## 已知限制

- 仅构建 macOS arm64、Windows x64、Linux x64；macOS x64（Intel）与 Linux arm64 未包含
- Linux 仅产出 AppImage 与 deb；rpm / pacman 需要构建机具备 `rpmbuild` 等工具，标准 CI 环境不具备
- 应用内自动更新依赖服务端下发的 manifest，本仓库构建的包不提供独立更新源；请从 Releases 页面手动获取新版本

## 构建信息

- 版本：`$VERSION`（取自仓库根 `package.json`）
- 提交：`$COMMIT_SHA`
- 构建：`https://github.com/myliuyx/ZCode/actions/runs/$RUN_ID`

源码遵循 Apache-2.0，第三方许可见仓库内 `THIRD-PARTY-NOTICES.md`。
