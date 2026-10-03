import assert from "node:assert/strict";
import test from "node:test";

import { resolveLinuxBuilderTargets } from "../desktop-linux-targets.mjs";

test("未设置 ZCODE_DESKTOP_LINUX_TARGETS 时返回 null，保持配置默认 target", () => {
  assert.equal(resolveLinuxBuilderTargets({ os: "linux", env: {} }), null);
  assert.equal(
    resolveLinuxBuilderTargets({ os: "linux", env: { ZCODE_DESKTOP_LINUX_TARGETS: "" } }),
    null,
  );
  assert.equal(
    resolveLinuxBuilderTargets({
      os: "linux",
      env: { ZCODE_DESKTOP_LINUX_TARGETS: "   " },
    }),
    null,
  );
});

test("按逗号切分并去掉空白项", () => {
  assert.deepEqual(
    resolveLinuxBuilderTargets({
      os: "linux",
      env: { ZCODE_DESKTOP_LINUX_TARGETS: "AppImage, deb" },
    }),
    ["AppImage", "deb"],
  );
});

test("忽略空片段，避免拼出多余的位置参数", () => {
  assert.deepEqual(
    resolveLinuxBuilderTargets({
      os: "linux",
      env: { ZCODE_DESKTOP_LINUX_TARGETS: "AppImage,,deb, " },
    }),
    ["AppImage", "deb"],
  );
});

test("非 linux 平台忽略该环境变量，不静默改动 mac/win 产物", () => {
  for (const os of ["mac", "win"]) {
    assert.equal(
      resolveLinuxBuilderTargets({
        os,
        env: { ZCODE_DESKTOP_LINUX_TARGETS: "AppImage,deb" },
      }),
      null,
    );
  }
});
