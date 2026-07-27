import './App.css'
import { Routes, Route } from 'react-router'
import BasicChat from './pages/BasicChat'

function App() {

  return (
    <Routes>
        <Route path="/" element={<h1>Tindog page d'accueil</h1>} />
        <Route path="/register" element ={<h1>contenu actuel register</h1>}/>
        <Route path="/basicchat" element = {<BasicChat />} />
      </Routes>
  )
}
export default App