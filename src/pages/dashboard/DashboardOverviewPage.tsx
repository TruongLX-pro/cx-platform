import { useState } from 'react'
import { RinoDigiPlaceholder, type DashboardTab } from './dashboardContent'
import { StationDashboardContent, initialStationFilters, type StationFilterState } from './StationDashboardContent'
import { TutorDashboardContent, initialTutorFilters, type TutorFilterState } from './TutorDashboardContent'

export function DashboardOverviewPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('tutor')
  const [tutorFilters, setTutorFilters] = useState<TutorFilterState>(initialTutorFilters)
  const [stationFilters, setStationFilters] = useState<StationFilterState>(initialStationFilters)

  const updateTutorFilter = <K extends keyof TutorFilterState,>(key: K, value: TutorFilterState[K]) => {
    setTutorFilters((current) => ({ ...current, [key]: value }))
  }

  const updateStationFilter = <K extends keyof StationFilterState,>(key: K, value: StationFilterState[K]) => {
    setStationFilters((current) => ({ ...current, [key]: value }))
  }

  return (
    <section className={`dashboard-page${activeTab === 'station' ? ' dashboard-page--station' : ' dashboard-page--tutor'}`}>
      {activeTab === 'tutor' ? (
        <TutorDashboardContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filters={tutorFilters}
          updateFilter={updateTutorFilter}
          resetFilters={() => setTutorFilters(initialTutorFilters)}
        />
      ) : activeTab === 'station' ? (
        <StationDashboardContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filters={stationFilters}
          updateFilter={updateStationFilter}
          resetFilters={() => setStationFilters(initialStationFilters)}
        />
      ) : (
        <RinoDigiPlaceholder activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </section>
  )
}
