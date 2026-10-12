/**
 * 通用格式化工具
 */

/**
 * 把 "2026-10-08" 变成 "2026 年 10 月 8 日"
 * 用法：formatDate('2026-10-08')
 */
export function formatDate(value) {
  if (!value) return ''
  const parts = String(value).split('-')
  if (parts.length !== 3) return String(value)
  const [year, month, day] = parts
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`
}

/**
 * 把 "2026-10-08" 变成 "2026.10.08"，用于卡片上的紧凑显示
 */
export function formatDateCompact(value) {
  if (!value) return ''
  return String(value).replaceAll('-', '.')
}

/**
 * 取昵称的第一个字，用作头像占位
 */
export function initialOf(name) {
  const text = String(name || '').trim()
  if (!text) return '匿'
  return text.slice(0, 1)
}

/**
 * 清理用户输入的文本：去掉首尾空白、把连续空行压成一个空行
 */
export function normalizeText(value) {
  return String(value || '')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
