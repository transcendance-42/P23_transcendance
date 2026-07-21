import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SwipePage from './pages/SwipePage'
import MatchesPage from './pages/MatchesPage'
import ChatPage from './pages/ChatPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SwipePage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/chat/:matchId" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App