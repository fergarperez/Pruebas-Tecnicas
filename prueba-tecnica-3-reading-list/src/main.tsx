import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import LectureListProvider from './components/LectureListContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LectureListProvider>
      <App />
    </LectureListProvider>
  </StrictMode>,
)
