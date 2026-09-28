import SwipePage from './pages/SwipePage'
import MatchesPage from './pages/MatchesPage'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import LoginEmail from './pages/LoginEmail'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Profile from './pages/Profile'
import RegisterDog from './pages/RegisterDog'
import ChatLayout from './pages/ChatLayout'
import OAuthCallback from './pages/OAuthCallback'

function App() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/swipes" element={<SwipePage/>} />
        <Route path="/matches" element={<MatchesPage/>} />
        <Route path="/register" element ={<Register/>}/>
        <Route path="/registerDog" element ={<RegisterDog/>}/>
        <Route path="/login" element = {<Login />} />
        <Route path="/login/email" element = {<LoginEmail />} />
        <Route path="/privacy" element = {<Privacy />} />
        <Route path="/terms" element = {<Terms/>} />
        <Route path="/profile" element = {<Profile/>}/>
        <Route path="/chat" element ={<ChatLayout/>}/>
        <Route path="/chat/:roomId" element={<ChatLayout/>} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
    </Routes>
  )
}

export default App