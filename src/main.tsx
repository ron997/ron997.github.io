import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/fragment-mono/latin-400.css'
import './styles/tokens.css'
import './styles/base.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
