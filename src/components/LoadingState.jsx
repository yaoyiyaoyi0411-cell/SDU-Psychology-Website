export function LoadingState({ label = '正在加载…' }) {
  return <p className="empty">{label}</p>
}

export function ErrorState({ message = '内容加载失败，请刷新页面重试。' }) {
  return <p className="empty">{message}</p>
}
