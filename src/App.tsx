import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { DashboardPlaceholderPage } from './pages/DashboardPlaceholderPage'
import { DashboardOverviewPage } from './pages/dashboard/DashboardOverviewPage'
import { RawDataPage } from './pages/dashboard/RawDataPage'
import { TemplateBuilderPage } from './pages/template/TemplateBuilderPage'
import { TemplateDetailPage } from './pages/template/TemplateDetailPage'
import { TemplateListPage } from './pages/template/TemplateListPage'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardOverviewPage />} />
        <Route path="/touchpoints" element={<DashboardPlaceholderPage sectionTitle="Điểm chạm" />} />
        <Route
          path="/survey-responses"
          element={<DashboardPlaceholderPage sectionTitle="Phản hồi khảo sát" />}
        />
        <Route path="/complaints" element={<DashboardPlaceholderPage sectionTitle="Khiếu nại" />} />
        <Route path="/reports" element={<DashboardPlaceholderPage sectionTitle="Báo cáo" />} />
        <Route path="/cx-data" element={<RawDataPage />} />
        <Route path="/templates" element={<TemplateListPage />} />
        <Route path="/templates/new" element={<TemplateBuilderPage mode="multi" />} />
        <Route path="/templates/new-single" element={<TemplateBuilderPage mode="single" />} />
        <Route path="/templates/:templateId" element={<TemplateDetailPage />} />
        <Route path="/templates/:templateId/edit" element={<TemplateBuilderPage mode="edit" />} />
      </Route>
    </Routes>
  )
}

export default App
