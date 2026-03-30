import { BottomTable, DashboardHeader, DashboardTabs, FilterActions, FilterField, type DashboardTab } from './dashboardContent'

export type TutorFilterState = {
  fromDate: string
  toDate: string
  productType: string
  program: string
  subject: string
  touchpoint: string
  feedbackType: string
}

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10)
}

function getDefaultTutorDateRange() {
  const today = new Date()
  const oneMonthAgo = new Date(today)
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

  return {
    fromDate: toDateInputValue(oneMonthAgo),
    toDate: toDateInputValue(today),
  }
}

const defaultTutorDateRange = getDefaultTutorDateRange()

export const initialTutorFilters: TutorFilterState = {
  fromDate: defaultTutorDateRange.fromDate,
  toDate: defaultTutorDateRange.toDate,
  productType: 'all',
  program: 'all',
  subject: 'math',
  touchpoint: 'after-class',
  feedbackType: 'all',
}

const tutorKpis = [
  { label: 'Điểm khảo sát TB', value: '4.2', suffix: '/ 5.0', note: '+0.2 so với kỳ trước', tone: 'primary', trend: true, noteTone: 'primary' },
  { label: 'Tổng khảo sát', value: '45,201', note: 'Trong kỳ lọc', tone: 'neutral' },
  { label: 'Tổng khiếu nại', value: '248', note: 'Trong kỳ lọc', tone: 'error' },
  { label: 'Thời gian xử lý TB', value: '4.2%', note: 'Trong kỳ lọc', tone: 'warning' },
  { label: 'Tổng báo lỗi', value: '156', note: '+12% so với kỳ trước', tone: 'error', trend: true, noteTone: 'error' },
]

const qualityPrograms = [
  { name: 'Tiếng Anh Cambridge', volume: '8,640', score: '4.8', scoreTone: 'primary', negative: '2.1%', negativeTone: 'muted' },
  { name: 'Tiếng Anh IELTS', volume: '6,120', score: '4.5', scoreTone: 'primary', negative: '3.8%', negativeTone: 'warning' },
  { name: 'Tiếng Anh Kindie Tutor', volume: '4,580', score: '4.2', scoreTone: 'warning', negative: '5.4%', negativeTone: 'warning' },
  { name: 'Chương trình Toán tư duy Tutor', volume: '9,320', score: '4.7', scoreTone: 'primary', negative: '2.6%', negativeTone: 'muted' },
]

const touchpoints = [
  { name: 'Sau buổi học thử', volume: '1,240', score: '3.2', scoreTone: 'error', negative: '12.5%', negativeTone: 'error' },
  { name: 'Xác nhận lịch học', volume: '856', score: '4.1', scoreTone: 'warning', negative: '6.2%', negativeTone: 'warning' },
  { name: 'Gia hạn khóa học', volume: '3,412', score: '4.8', scoreTone: 'primary', negative: '1.2%', negativeTone: 'muted' },
]

const objectQuality = [
  { label: 'Giáo viên', value: '4.92', note: 'Hài lòng nhất', tone: 'primary' },
  { label: 'Chương trình', value: '4.15', note: 'Cần cải thiện', tone: 'warning' },
  { label: 'CSKH', value: '4.68', note: 'Ổn định', tone: 'primary' },
]

const timeDistribution = [
  { label: 'Trong ngày', value: '42%', width: 42, tone: 'primary' },
  { label: '1-3 ngày', value: '35%', width: 35, tone: 'primary' },
  { label: '4-7 ngày', value: '15%', width: 15, tone: 'warning' },
  { label: 'Trên 7 ngày', value: '8%', width: 8, tone: 'error' },
]

const bottomTeachers: Array<[string, string]> = [
  ['Nguyễn Văn A', '2.4'],
  ['Trần Thị B', '2.8'],
  ['Lê Văn C', '3.1'],
  ['Phạm Thị D', '3.2'],
  ['Hoàng Văn E', '3.5'],
]

const bottomStaff: Array<[string, string]> = [
  ['Trần Bảo Ngân', '1.9'],
  ['Lý Gia Hân', '2.5'],
  ['Vũ Minh Tú', '3.0'],
  ['Đỗ Thùy Trang', '3.3'],
  ['Phan Tuấn Anh', '3.4'],
]

const bottomPrograms: Array<[string, string]> = [
  ['Khóa luyện phát âm sơ cấp', '3.5'],
  ['Toán tư duy nâng cao - Lớp 5', '3.7'],
  ['Giao tiếp công sở tích hợp', '3.8'],
  ['Học máy căn bản (Python)', '3.9'],
  ['Tiếng Anh thương mại cơ bản', '4.0'],
]

const filterOptions = {
  productType: [{ value: 'all', label: 'Tất cả' }, { value: 'rinoedu', label: 'RinoEdu' }],
  program: [{ value: 'all', label: 'Tất cả' }, { value: 'tutor', label: 'Gia sư Tutor' }],
  subject: [{ value: 'math', label: 'Toán học' }, { value: 'english', label: 'Tiếng Anh' }],
  touchpoint: [
    { value: 'after-class', label: 'Sau buổi học' },
    { value: 'schedule-confirmation', label: 'Xác nhận lịch học' },
    { value: 'renewal', label: 'Gia hạn khóa học' },
  ],
  feedbackType: [
    { value: 'all', label: 'Tất cả' },
    { value: 'survey', label: 'Khảo sát' },
    { value: 'complaint', label: 'Khiếu nại' },
    { value: 'bug', label: 'Báo lỗi' },
  ],
}

export function TutorDashboardContent({
  activeTab,
  setActiveTab,
  filters,
  updateFilter,
  resetFilters,
}: {
  activeTab: DashboardTab
  setActiveTab: (tab: DashboardTab) => void
  filters: TutorFilterState
  updateFilter: <K extends keyof TutorFilterState>(key: K, value: TutorFilterState[K]) => void
  resetFilters: () => void
}) {
  return (
    <>
      <DashboardHeader title="Dashboard quản trị trải nghiệm khách hàng" description="Theo dõi nhanh chất lượng trải nghiệm khách hàng trên toàn hệ thống" />
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <section className="filter-card filter-card--shell dashboard-filter-panel">
        <div className="dashboard-filter-grid dashboard-filter-grid--tutor">
          <FilterField label="Từ ngày" type="date" value={filters.fromDate} onChange={(value) => updateFilter('fromDate', value)} />
          <FilterField label="Đến ngày" type="date" value={filters.toDate} onChange={(value) => updateFilter('toDate', value)} />
          <FilterField label="Sản phẩm" type="select" value={filters.productType} options={filterOptions.productType} onChange={(value) => updateFilter('productType', value)} />
          <FilterField label="Chương trình" type="select" value={filters.program} options={filterOptions.program} onChange={(value) => updateFilter('program', value)} />
          <FilterField label="Môn học" type="select" value={filters.subject} options={filterOptions.subject} onChange={(value) => updateFilter('subject', value)} />
          <FilterField label="Điểm chạm" type="select" value={filters.touchpoint} options={filterOptions.touchpoint} onChange={(value) => updateFilter('touchpoint', value)} />
          <FilterField label="Loại phản hồi" type="select" value={filters.feedbackType} options={filterOptions.feedbackType} onChange={(value) => updateFilter('feedbackType', value)} />
        </div>
        <FilterActions onReset={resetFilters} />
      </section>

      <section className="dashboard-tutor-kpis">
        {tutorKpis.map((item) => (
          <article key={item.label} className={`dashboard-tutor-kpi dashboard-tutor-kpi--${item.tone}`}>
            <p>{item.label}</p>
            <div className="dashboard-tutor-kpi__value">
              <strong>{item.value}</strong>
              {item.suffix ? <span>{item.suffix}</span> : null}
            </div>
            <div className={`dashboard-tutor-kpi__note${item.noteTone ? ` dashboard-tutor-kpi__note--${item.noteTone}` : ''}`}>
              {item.trend ? <span className="material-symbols-outlined">trending_up</span> : null}
              {item.note}
            </div>
          </article>
        ))}
      </section>

      <div className="dashboard-tutor-main-grid">
        <article className="dashboard-card dashboard-tutor-program-card dashboard-card--table-split">
          <div className="dashboard-card__header">
            <h2>Chất lượng theo chương trình</h2>
          </div>
          <table className="data-table dashboard-table dashboard-table--tutor dashboard-table--programs">
            <thead>
              <tr>
                <th>Chương trình</th>
                <th className="u-right">Lượng phản hồi</th>
                <th className="u-right">Điểm TB</th>
                <th className="u-right">Tỷ lệ tiêu cực</th>
              </tr>
            </thead>
            <tbody>
              {qualityPrograms.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td className="u-right">{item.volume}</td>
                  <td className="u-right"><span className={`dashboard-tutor-score dashboard-tutor-score--${item.scoreTone}`}>{item.score}</span></td>
                  <td className="u-right"><span className={`dashboard-tutor-rate dashboard-tutor-rate--${item.negativeTone}`}>{item.negative}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="dashboard-card dashboard-tutor-chart-card">
          <div className="dashboard-card__header dashboard-card__header--legend">
            <h2>Tổng quan phản hồi theo thời gian</h2>
            <div className="dashboard-tutor-legend">
              <div><span className="dashboard-tutor-dot dashboard-tutor-dot--primary" /><small>Lượng phản hồi</small></div>
              <div><span className="dashboard-tutor-dot dashboard-tutor-dot--warning" /><small>Tỷ lệ tiêu cực (%)</small></div>
            </div>
          </div>
          <div className="dashboard-tutor-chart">
            <div className="dashboard-tutor-axis dashboard-tutor-axis--left"><span>8k</span><span>6k</span><span>4k</span><span>2k</span><span>0</span></div>
            <div className="dashboard-tutor-chart__canvas">
              <div className="dashboard-tutor-chart__columns">
                <div style={{ height: '70%' }} />
                <div style={{ height: '55%' }} />
                <div style={{ height: '80%' }} />
                <div style={{ height: '45%' }} />
                <div style={{ height: '65%' }} />
                <div style={{ height: '90%' }} />
                <div style={{ height: '60%' }} />
              </div>
              <svg className="dashboard-tutor-chart__lines" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,80 Q25,20 50,60 T100,30" fill="none" stroke="#2563eb" strokeOpacity="0.8" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                <path d="M0,85 Q25,60 50,75 T100,40" fill="none" stroke="#f59e0b" strokeWidth="3" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <div className="dashboard-tutor-axis dashboard-tutor-axis--right"><span>15%</span><span>11%</span><span>7%</span><span>4%</span><span>0%</span></div>
          </div>
          <div className="dashboard-tutor-chart__labels"><span>01/10</span><span>05/10</span><span>10/10</span><span>15/10</span><span>20/10</span><span>25/10</span><span>30/10</span></div>
        </article>

        <article className="dashboard-card dashboard-card--table-full">
          <div className="dashboard-card__header"><h2>Điểm chạm rủi ro</h2></div>
          <table className="data-table dashboard-table dashboard-table--tutor">
            <thead>
              <tr><th>Điểm chạm</th><th className="u-right">Lượng phản hồi</th><th className="u-right">Điểm TB</th><th className="u-right">Tỷ lệ tiêu cực</th></tr>
            </thead>
            <tbody>
              {touchpoints.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td className="u-right">{item.volume}</td>
                  <td className="u-right"><span className={`dashboard-tutor-score dashboard-tutor-score--${item.scoreTone}`}>{item.score}</span></td>
                  <td className="u-right"><span className={`dashboard-tutor-rate dashboard-tutor-rate--${item.negativeTone}`}>{item.negative}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="dashboard-card dashboard-tutor-object-card">
          <div className="dashboard-card__header"><h2>Chất lượng theo đối tượng</h2></div>
          <div className="dashboard-tutor-object-grid">
            {objectQuality.map((item) => (
              <div key={item.label} className={`dashboard-tutor-object dashboard-tutor-object--${item.tone}`}>
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                <span>{item.note}</span>
              </div>
            ))}
          </div>
        </article>

        <div className="dashboard-tutor-side-grid">
          <article className="dashboard-card dashboard-tutor-donut-card">
            <h4>Trạng thái khiếu nại</h4>
            <div className="dashboard-tutor-donut">
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#2563eb" strokeDasharray="70, 100" strokeLinecap="round" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#f59e0b" strokeDasharray="20, 100" strokeDashoffset="-70" strokeLinecap="round" strokeWidth="3.5" />
              </svg>
              <div className="dashboard-tutor-donut__center"><strong>248</strong><span>Tổng cộng</span></div>
            </div>
            <div className="dashboard-tutor-donut__tags">
              <span className="dashboard-tutor-tag dashboard-tutor-tag--primary">Mới (15%)</span>
              <span className="dashboard-tutor-tag dashboard-tutor-tag--warning">Đang xử lý (25%)</span>
              <span className="dashboard-tutor-tag dashboard-tutor-tag--muted">Đã xong (60%)</span>
            </div>
          </article>

          <article className="dashboard-card">
            <h4>Phân bổ thời gian</h4>
            <div className="dashboard-tutor-time">
              {timeDistribution.map((item) => (
                <div key={item.label} className="dashboard-tutor-time__item">
                  <div className="dashboard-tutor-time__head"><span>{item.label}</span><strong className={`dashboard-tutor-text-tone dashboard-tutor-text-tone--${item.tone}`}>{item.value}</strong></div>
                  <div className="dashboard-tutor-time__track"><div className={`dashboard-tutor-time__fill dashboard-tutor-time__fill--${item.tone}`} style={{ width: `${item.width}%` }} /></div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="dashboard-tutor-bottom-grid">
          <BottomTable icon="person_off" title="5 giáo viên điểm thấp nhất" rows={bottomTeachers} />
          <BottomTable icon="support_agent" title="5 nhân viên điểm thấp nhất" rows={bottomStaff} />
          <BottomTable icon="auto_stories" title="5 chương trình điểm thấp nhất" rows={bottomPrograms} truncate />
        </div>
      </div>
      <footer className="dashboard-tutor-footer">© 2026 RINO EDU</footer>
    </>
  )
}
