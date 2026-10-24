import SwipePage from './pages/SwipePage'
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
import DogProfilePage from './pages/DogProfilePage'
import ScrollToTop from './components/ui/ScrollToTop'
import PresenceProvider from './auth/presenceProvider'
import RequireAdmin from './auth/RequireAdmin'
import UsersLayout from './pages/UsersLayout'
import OfflineBanner from './components/ui/OfflineBanner'
import NotFound from './pages/NotFound'


function App() {
  return (
    <>
      <ScrollToTop/>
      <OfflineBanner/>
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
      <Route path="/users" element={<RequireAdmin><UsersLayout /></RequireAdmin>} />
			<Route element={<RequireProfileComplete><Outlet /> </RequireProfileComplete>}>
          <Route element={<PresenceProvider><Outlet /> </PresenceProvider>}>
            <Route path="/swipes"      element={<SwipePage/>} />
            <Route path="/chat"        element={<ChatLayout/>} />
            <Route path="/chat/:roomId" element={<ChatLayout/>} />
            <Route path="/dogs/:id" element={<DogProfilePage/>} />
          </Route>  
			</Route>
		</Route>
    <Route path="*" element={<NotFound />} />
    </Routes>
</>
  )
}

export default App