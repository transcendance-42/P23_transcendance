import SwipePage from './pages/SwipePage'
import MatchesPage from './pages/MatchesPage'
import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import LoginEmail from './pages/LoginEmail'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Profile from './pages/Profile'
import RegisterDog from './pages/RegisterDog'
import ChatLayout from './pages/ChatLayout'
import RequireAuth from './auth/RequireAuth'
import OAuthCallback from './pages/OAuthCallback'
import RequireProfileComplete from './auth/profileComplete'
import PresenceProvider from './auth/presenceProvider'
import { RoomList } from './pages/Roomlist'

function App() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/login/email" element={<LoginEmail/>} />
        <Route path="/privacy" element = {<Privacy />} />
        <Route path="/terms" element = {<Terms/>} />

    <Route element={<RequireAuth><Outlet /></RequireAuth>}>
			<Route path="/oauth-callback" element={<OAuthCallback />} />
			<Route path="/profile"     element={<Profile/>} />
			<Route path="/registerDog" element={<RegisterDog/>} />

			<Route element={<RequireProfileComplete><Outlet /> </RequireProfileComplete>}>
          <Route element={<PresenceProvider><Outlet /> </PresenceProvider>}>
            <Route path="/swipes"      element={<SwipePage/>} />
            <Route path="/matches" element={<ChatLayout/>} />
            <Route path="/matches/:roomId" element={<ChatLayout/>} />
          </Route>  
			</Route>
		</Route>
    </Routes>
  )
}

export default App