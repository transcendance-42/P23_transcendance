import SwipePage from './pages/SwipePage'
import MatchesPage from './pages/MatchesPage'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import LoginEmail from './pages/LoginEmail'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Profile from './pages/Profile'
import RegisterDog from './pages/RegisterDog'
import ChatLayout from './pages/ChatLayout'
import RequireAuth from './auth/RequireAuth'

function App() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/login/email" element={<LoginEmail/>} />

        <Route path="/swipes"      element={<RequireAuth><SwipePage/></RequireAuth>} />
        <Route path="/matches"     element={<RequireAuth><MatchesPage/></RequireAuth>} />
        <Route path="/profile"     element={<RequireAuth><Profile/></RequireAuth>} />
        <Route path="/registerDog" element={<RequireAuth><RegisterDog/></RequireAuth>} />
        <Route path="/chat"        element={<RequireAuth><ChatLayout/></RequireAuth>} />
        <Route path="/chat/:roomId" element={<RequireAuth><ChatLayout/></RequireAuth>} />
    </Routes>
  )
}

export default App