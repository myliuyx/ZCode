/**
 * Linux 打包 target 覆盖解析。
 *
 * electron-builder.config.js 的 linux.target 默认包含 AppImage/deb/rpm/pacman，
 * 其中 rpm 需要构建机提供 rpmbuild，pacman 需要对应打包工具，
 * 在缺少这些工具的 CI runner 上会直接失败。
 * 这里允许用 ZCODE_DESKTOP_LINUX_TARGETS 收窄 target，让只具备基础工具链的
 * runner 也能产出可安装的包。
 *
 * 与 bundle.mjs 的其他平台参数保持一致：只在显式设置时才改变行为，
 * 未设置时沿用 electron-builder 配置里的默认 target。
 */

/**
 * 返回要传给 electron-builder 的 Linux target 位置参数。
 *
 * 返回 null 表示不覆盖，继续使用 electron-builder 配置里的默认 target。
 * 非 linux 平台一律返回 null：mac/win 的 target 由配置固定，
 * 误设该环境变量不应该静默改变这两个平台的产物集合。
 *
 * @param {{os?: string, env?: Record<string, string | undefined>}} options
 * @returns {string[] | null}
 */
export function resolveLinuxBuilderTargets({ os, env = process.env } = {}) {
  if (os !== "linux") {
    return null;
  }

  const rawTargets = env.ZCODE_DESKTOP_LINUX_TARGETS?.trim();
  if (!rawTargets) {
    return null;
  }

  // 过滤空片段：CI 里常见 "AppImage, deb" 这类带空格的写法，
  // 直接按逗号切分会把空串当成 target 传给 electron-builder。
  const targets = rawTargets
    .split(",")
    .map((target) => target.trim())
    .filter(Boolean);

  return targets.length > 0 ? targets : null;
}
