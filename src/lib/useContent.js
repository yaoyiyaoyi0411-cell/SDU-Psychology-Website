import { useEffect, useState } from 'react'

/**
 * 一个很小的数据读取 Hook。
 *
 * 内容函数都返回 Promise，因此页面需要处理「加载中 / 出错 / 有数据」三种状态。
 * 把这段逻辑收在 Hook 里，页面代码会干净很多。
 *
 * 用法：
 *   const { data, loading, error } = useContent(() => listReadingNotes(), [])
 */
export function useContent(loader, deps = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let alive = true
    setState({ data: null, loading: true, error: null })

    Promise.resolve()
      .then(loader)
      .then((data) => {
        if (alive) setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (alive) setState({ data: null, loading: false, error })
      })

    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
