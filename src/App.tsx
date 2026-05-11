import { useEffect } from 'react'

import { WelcomePage } from '@/pages'

const fallbackTitle = 'Trip Planner'
const appTitle = import.meta.env.VITE_APP_TITLE?.trim() || fallbackTitle

function App() {
  useEffect(() => {
    document.title = appTitle
  }, [])

  return <WelcomePage />
}

export default App
