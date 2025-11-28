/**
 * Giscus 留言系统配置
 *
 * 📖 配置步骤（详细教程请查看：GISCUS_CONFIG_GUIDE.md）
 *
 * 1. 安装 Giscus App: https://github.com/apps/giscus
 * 2. 在 GitHub 仓库中启用 Discussions
 * 3. 访问 https://giscus.app 获取 repoId 和 categoryId
 * 4. 替换下面的配置参数
 */

export const giscusConfig = {
  // 你的 GitHub 仓库（格式：username/repo-name）
  // 例如：'lcj/vueblog'
  // 如何获取：在你的 GitHub 仓库页面，URL 是 https://github.com/username/repository-name
  // 复制 username/repository-name 部分
  repo: "lqlcj/vueblog",

  // 从 https://giscus.app 获取的 repo-id
  // 格式：R_xxxxxxxxxxxxxxxxxx
  // 在 giscus.app 配置页面生成的代码中，找到 data-repo-id 属性的值
  repoId: "R_kgDOQeYIXQ",

  // Discussions 分类名称
  // 通常是 'Announcements'（如果你创建了自定义分类，填写分类名称）
  category: "Announcements",

  // 从 https://giscus.app 获取的 category-id
  // 格式：DIC_kwxxxxxxxxxxxxx
  // 在 giscus.app 配置页面生成的代码中，找到 data-category-id 属性的值
  categoryId: "DIC_kwDOQeYIXc4CzKkr",

  // 映射方式：pathname（路径）| url（完整URL）| title（标题）| og:title
  // 推荐使用 'pathname'，使用页面路径作为留言标识
  mapping: "pathname",

  // 是否启用表情反应（👍 ❤️ 等）
  reactionsEnabled: true,

  // 是否发送元数据（通常不需要）
  emitMetadata: false,

  // 输入框位置：top（顶部）| bottom（底部）
  inputPosition: "bottom",

  // 主题：light | dark | dark_dimmed | transparent_dark | preferred_color_scheme
  // light: 浅色主题
  // dark: 深色主题
  // dark_dimmed: 暗色主题（GitHub 风格）
  // transparent_dark: 透明暗色
  // preferred_color_scheme: 跟随系统主题
  theme: "light",

  // 语言设置
  // zh-CN: 简体中文
  // zh-TW: 繁体中文
  // en: 英文
  lang: "zh-CN",
};
