import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PlayerLayout from './components/layout/PlayerLayout'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HowItWorksPage from './pages/HowItWorksPage'
import DashboardPage from './pages/DashboardPage'
import GamesLobbyPage from './pages/GamesLobbyPage'
import WalletPage from './pages/WalletPage'
import LeaderboardPage from './pages/LeaderboardPage'
import ProfilePage from './pages/ProfilePage'
import PronosEliminatorLobbyPage from './pages/PronosEliminatorLobbyPage'
import PronosContestPage from './pages/PronosContestPage'
import PronosPalmaresPage from './pages/PronosPalmaresPage'
import BankPariLobbyPage from './pages/BankPariLobbyPage'
import CreateSplitPage from './pages/CreateSplitPage'
import SplitDetailPage from './pages/SplitDetailPage'
import DenyeSivivanLobbyPage from './pages/DenyeSivivanLobbyPage'
import LastManStandingPage from './pages/LastManStandingPage'
import WeeklyPickPage from './pages/WeeklyPickPage'
import VirtualFootballPage from './pages/VirtualFootballPage'
import VirtualHorseRacingLobbyPage from './pages/VirtualHorseRacingLobbyPage'
import VirtualHorseRacingPage from './pages/VirtualHorseRacingPage'
import CardShowdownPage from './pages/CardShowdownPage'
import PredictionDuelPage from './pages/PredictionDuelPage'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public routes with Navbar + Footer */}
      <Route
        path="/"
        element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1"><LandingPage /></main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/enskri"
        element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1"><RegisterPage /></main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/konekte"
        element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1"><LoginPage /></main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/kijan-li-mache"
        element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1"><HowItWorksPage /></main>
            <Footer />
          </div>
        }
      />

      {/* Authenticated routes with PlayerLayout (Sidebar + BottomNav) */}
      <Route element={<PlayerLayout />}>
        {/* Open Routes (Can be explored without login) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/jwet" element={<GamesLobbyPage />} />
        <Route path="/klasman" element={<LeaderboardPage />} />

        {/* Section 3: Sports Game Flows (Open to explore, auth on payment) */}
        <Route path="/pronos" element={<PronosEliminatorLobbyPage />} />
        <Route path="/pronos/:contestId" element={<PronosContestPage />} />
        <Route path="/pronos/:contestId/palmares" element={<PronosPalmaresPage />} />
        <Route path="/bank-pari" element={<BankPariLobbyPage />} />
        <Route path="/bank-pari/:splitId" element={<SplitDetailPage />} />
        <Route path="/sivivan" element={<DenyeSivivanLobbyPage />} />
        <Route path="/sivivan/:id" element={<LastManStandingPage />} />
        <Route path="/sivivan/:id/chwazi" element={<WeeklyPickPage />} />

        {/* Section 4: Simulated Game Flows (Open to explore, auth on payment) */}
        <Route path="/virtual/football/:matchId" element={<VirtualFootballPage />} />
        <Route path="/virtual/horses" element={<VirtualHorseRacingLobbyPage />} />
        <Route path="/virtual/horses/:raceId" element={<VirtualHorseRacingPage />} />
        <Route path="/virtual/cards" element={<CardShowdownPage />} />
        <Route path="/duels/:duelId" element={<PredictionDuelPage />} />

        {/* Protected Routes (Require Login immediately) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/potfey" element={<WalletPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/bank-pari/kreye" element={<CreateSplitPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
