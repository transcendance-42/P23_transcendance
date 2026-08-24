import './App.css'
import { Routes, Route } from 'react-router-dom'
import { RoomList } from './pages/Roomlist'
import MessagePanel from './pages/MessagePanel'


function App() {

  return (
    <Routes>
        <Route path="/" element={<h1>Tindog page d'accueil</h1>} />
        <Route path="/register" element ={<h1>contenu actuel register</h1>}/>
        <Route path="/roomlist" element = {<RoomList  />} />
        <Route path='/room/:id' element = {<MessagePanel />} />
    </Routes>
  )
}
export default App