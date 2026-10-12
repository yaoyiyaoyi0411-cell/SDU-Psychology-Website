/**
 * 「演示内容」标记。
 * 第一版要求所有示例内容都有明确标注，因此这个徽标会出现在
 * 每一张示例卡片和示例文章上。
 */
export function DemoBadge({ label = '演示内容' }) {
  return <span className="demo-badge">{label}</span>
}
