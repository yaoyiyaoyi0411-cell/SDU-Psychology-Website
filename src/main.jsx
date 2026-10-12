import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// 样式按「设计变量 → 基础样式」的顺序加载，方便后续统一调整主题。
import './styles/tokens.css'
import './styles/base.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
