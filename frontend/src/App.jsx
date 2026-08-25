import SwipePage from './pages/SwipePage'
import MatchesPage from './pages/MatchesPage'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { RoomList } from './pages/Roomlist'
import MessagePanel from './pages/MessagePanel'
import Login from './pages/Login'
import LoginEmail from './pages/LoginEmail'

function App() {
  return (
    <Routes>
        <Route path="/" element={<h1>Tindog page d'accueil</h1>} />
        <Route path="/swipes" element={<SwipePage/>} />
        <Route path="/matches" element={<MatchesPage/>} />
        <Route path="/register" element ={<h1>contenu actuel register</h1>}/>
        <Route path="/roomlist" element = {<RoomList  />} />
        <Route path='/room/:roomId' element = {<MessagePanel />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/login/email" element = {<LoginEmail />} />
    </Routes>
  )
}

export default App