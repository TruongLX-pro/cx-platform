import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { DashboardPlaceholderPage } from './pages/DashboardPlaceholderPage'
import { LoginPage } from './pages/LoginPage'
import { DashboardOverviewPage } from './pages/dashboard/DashboardOverviewPage'
import { RawDataPage } from './pages/dashboard/RawDataPage'
import { TouchpointBuilderPage } from './pages/touchpoint/TouchpointBuilderPage'
import { TouchpointDetailPage } from './pages/touchpoint/TouchpointDetailPage'
import { TouchpointListPage } from './pages/touchpoint/TouchpointListPage'
import { TemplateBuilderPage } from './pages/template/TemplateBuilderPage'
import { TemplateDetailPage } from './pages/template/TemplateDetailPage'
import { TemplateListPage } from './pages/template/TemplateListPage'

const SESSION_KEY = 'cx-platform-session'

interface SessionUser {
  username: string
  name: string
  role: string
}

function App() {
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null)

  useEffect(() => {
    const storedSession = window.localStorage.getItem(SESSION_KEY)

    if (!storedSession) return

    try {
      setCurrentUser(JSON.parse(storedSession) as SessionUser)
    } catch {
      window.localStorage.removeItem(SESSION_KEY)
    }
  }, [])

  function handleLogin(username: string) {
    const normalizedUsername = username.trim()
    const nextUser: SessionUser = {
      username: normalizedUsername,
      name: normalizedUsername || 'Người dùng CX Platform',
      role: 'Người dùng nội bộ',
    }

    setCurrentUser(nextUser)
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser))
  }

  function handleLogout() {
    setCurrentUser(null)
    window.localStorage.removeItem(SESSION_KEY)
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          currentUser ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
        }
      />
      <Route
        element={
          currentUser ? (
            <AppShell
              currentUser={{ name: currentUser.name, role: currentUser.role }}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardOverviewPage />} />
        <Route path="/touchpoints" element={<TouchpointListPage />} />
        <Route path="/touchpoints/new" element={<TouchpointBuilderPage mode="create" />} />
        <Route path="/touchpoints/:touchpointId" element={<TouchpointDetailPage />} />
        <Route path="/touchpoints/:touchpointId/edit" element={<TouchpointBuilderPage mode="edit" />} />
        <Route path="/survey-responses" element={<DashboardPlaceholderPage sectionTitle="Phản hồi khảo sát" />} />
        <Route path="/complaints" element={<DashboardPlaceholderPage sectionTitle="Khiếu nại" />} />
        <Route path="/reports" element={<DashboardPlaceholderPage sectionTitle="Báo cáo" />} />
        <Route path="/cx-data" element={<RawDataPage />} />
        <Route path="/templates" element={<TemplateListPage />} />
        <Route path="/templates/new" element={<TemplateBuilderPage mode="create" />} />
        <Route path="/templates/:templateId" element={<TemplateDetailPage />} />
        <Route path="/templates/:templateId/edit" element={<TemplateBuilderPage mode="edit" />} />
      </Route>
    </Routes>
  )
}

export default App
