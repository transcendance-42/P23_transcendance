import SwipePage from './pages/SwipePage'
import MatchesPage from './pages/MatchesPage'
import './App.css'
import {Routes, Route } from 'react-router'
import BasicChat from './pages/BasicChat'
import Chatroom from './pages/Chatroom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import LoginEmail from './pages/LoginEmail'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/swipes" element={<SwipePage/>} />
        <Route path="/matches" element={<MatchesPage/>} />
        <Route path="/register" element ={<h1>contenu actuel register</h1>}/>
        <Route path="/basicchat" element = {<BasicChat />} />
        <Route path="/chatroom" element = {<Chatroom />} />
        <Route path="/chat" element = {<Chat />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/login/email" element = {<LoginEmail />} />
    </Routes>
  )
}

export default App