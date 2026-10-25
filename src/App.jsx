import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import FigmaIntro from './pages/FigmaIntro'
import FigmaAuth from './pages/FigmaAuth'
import FigmaHome from './pages/FigmaHome'
import FigmaSettings from './pages/FigmaSettings'
import FigmaProfessors from './pages/FigmaProfessors'
import FigmaStudent from './pages/FigmaStudent'
import FigmaResults from './pages/FigmaResults'
import FigmaForum from './pages/FigmaForum'
import FigmaThread from './pages/FigmaThread'
import FigmaMessages from './pages/FigmaMessages'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<FigmaIntro />} />
        <Route path="/auth" element={<FigmaAuth />} />
        <Route path="/sso" element={<FigmaAuth />} />
        <Route path="/login" element={<FigmaAuth />} />
        <Route path="/figma-login" element={<FigmaAuth />} />
        <Route path="/create-account" element={<FigmaAuth />} />
        <Route path="/home" element={<FigmaHome />} />
        <Route path="/student-home" element={<FigmaHome />} />
        <Route path="/teacher-home" element={<FigmaHome />} />
        <Route path="/settings" element={<FigmaSettings />} />
        <Route path="/professors" element={<FigmaProfessors />} />
        <Route path="/student" element={<FigmaStudent />} />
        <Route path="/results" element={<FigmaResults />} />
        <Route path="/forum" element={<FigmaForum />} />
        <Route path="/thread/:threadId" element={<FigmaThread />} />
        <Route path="/messages/:kind/:counterpartId" element={<FigmaMessages />} />
        <Route path="*" element={<FigmaIntro />} />
      </Routes>
    </AuthProvider>
  )
}
