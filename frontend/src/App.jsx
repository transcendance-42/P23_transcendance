import './App.css'
import { Routes, Route } from 'react-router'
import BasicChat from './pages/BasicChat'
import Chatroom from './pages/Chatroom'
import Chat from './pages/Chat'

function App() {

  return (
    <Routes>
        <Route path="/" element={<h1>Tindog page d'accueil</h1>} />
        <Route path="/register" element ={<h1>contenu actuel register</h1>}/>
        <Route path="/basicchat" element = {<BasicChat />} />
        <Route path="/chatroom" element = {<Chatroom />} />
        <Route path="/chat" element = {<Chat />} />
    </Routes>
  )
}
export default App