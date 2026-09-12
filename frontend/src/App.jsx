import SwipePage from './pages/SwipePage'
import MatchesPage from './pages/MatchesPage'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { RoomList } from './pages/Roomlist'
import MessagePanel from './pages/MessagePanel'
import Login from './pages/Login'
import LoginEmail from './pages/LoginEmail'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/swipes" element={<SwipePage/>} />
        <Route path="/matches" element={<MatchesPage/>} />
        <Route path="/register" element ={<Register/>}/>
        <Route path="/roomlist" element = {<RoomList  />} />
        <Route path='/room/:roomId' element = {<MessagePanel />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/login/email" element = {<LoginEmail />} />
        <Route path="/profile" element = {<Profile/>}/>
    </Routes>
  )
}

export default App