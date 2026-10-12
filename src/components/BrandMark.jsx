/**
 * 网站标志：一个简单的「书页 + 心形」图形。
 * 需要换标志时，直接替换这里的 SVG 内容即可。
 */
export function BrandMark({ className = 'brand__mark' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role="img"
      aria-label="心协学术空间标志"
    >
      <rect x="1" y="1" width="46" height="46" rx="12" fill="#EFEBE3" />
      <path
        d="M24 35.5c-6.6-4.1-10.6-7.8-10.6-12.3 0-3.5 2.7-6.2 6-6.2 2 0 3.7.9 4.6 2.4.9-1.5 2.6-2.4 4.6-2.4 3.3 0 6 2.7 6 6.2 0 4.5-4 8.2-10.6 12.3z"
        fill="#6D7F6B"
      />
      <path
        d="M13 38h22"
        stroke="#B1846A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
