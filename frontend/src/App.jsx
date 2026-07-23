import './App.css'
import { Routes, Route } from 'react-router'

function App() {

  return (
    <Routes>
        <Route path="/" element={<h1>Tindog page d'accueil</h1>} />
        <Route path="/register" element ={<h1>contenu actuel register</h1>}/>
      </Routes>
  )
}
export default App