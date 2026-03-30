import { DashboardHeader, DashboardTabs, FilterActions, FilterField, type DashboardTab } from './dashboardContent'

export type StationFilterState = {
  fromDate: string
  toDate: string
  center: string
  program: string
  feedbackType: string
  touchpoint: string
  surveyType: string
}

export const initialStationFilters: StationFilterState = {
  fromDate: '2023-10-01',
  toDate: '2023-10-31',
  center: 'all',
  program: 'all',
  feedbackType: 'all',
  touchpoint: 'all',
  surveyType: 'all',
}

const stationKpis = [
  { label: 'Điểm khảo sát TB', value: '4.2', suffix: '/5.0', badge: { icon: 'trending_up', text: '+0.2', tone: 'success' }, tone: 'primary' },
  { label: 'Tổng khảo sát', value: '8,420', meta: 'khảo sát hợp lệ', tone: 'neutral' },
  { label: 'Tổng khiếu nại', value: '42', badge: { icon: 'warning', text: '8 khẩn cấp', tone: 'danger' }, tone: 'warning' },
  { label: 'Thời gian xử lý khiếu nại trung bình', value: '1.4h', badge: { text: 'Đạt mục tiêu', tone: 'success' }, tone: 'neutral' },
  { label: 'Tổng báo lỗi', value: '156', meta: 'trong kỳ lọc', badge: { icon: 'trending_up', text: '↑ 12% so với kỳ trước', tone: 'danger' }, tone: 'danger-border' },
]

const stationCenters = [
  { name: 'Cơ sở Linh Đàm', score: '3.2/5', negative: '18.4%', complaints: '12', risk: 'Cần can thiệp ngay', riskTone: 'error' },
  { name: 'Cơ sở Nguyễn Tuân', score: '3.8/5', negative: '9.2%', complaints: '6', risk: 'Cần theo dõi', riskTone: 'warning' },
  { name: 'Cơ sở Long Biên', score: '4.5/5', negative: '2.1%', complaints: '1', risk: 'Ổn định', riskTone: 'primary' },
]

const parentSurvey = [
  { label: 'Giáo viên', value: '4.2', width: 84, tone: 'primary' },
  { label: 'Chương trình học', value: '3.9', width: 78, tone: 'primary-soft' },
  { label: 'Nhân viên chăm sóc', value: '4.5', width: 90, tone: 'primary-strong' },
]

const studentSurvey = [
  { label: 'Giáo viên', value: '4.6', width: 92, tone: 'primary' },
  { label: 'Nội dung bài học', value: '4.1', width: 82, tone: 'primary-soft' },
  { label: 'Cơ sở vật chất', value: '3.7', width: 74, tone: 'warning' },
]

const programSurvey = [
  { label: 'Tiếng Anh Cam', trend: '↑ 4%', trendTone: 'success', value: '4.4', width: 88, tone: 'primary' },
  { label: 'Tiếng Anh Station', trend: '→ 0%', trendTone: 'muted', value: '3.5', width: 70, tone: 'warning' },
  { label: 'Math Advanced', trend: '↓ 2%', trendTone: 'danger', value: '2.8', width: 56, tone: 'danger' },
]

const stationTouchpoints = [
  { name: 'Khu vực sảnh chờ & Check-in', volume: '1,204', score: '3.4', scoreTone: 'warning', negative: '12.5%', negativeTone: 'error', priority: 'Cao', priorityTone: 'error' },
  { name: 'Tương tác tại bãi đỗ xe', volume: '850', score: '3.7', scoreTone: 'muted', negative: '9.2%', negativeTone: 'warning', priority: 'Trung bình', priorityTone: 'warning' },
  { name: 'Trải nghiệm nhà vệ sinh', volume: '620', score: '3.1', scoreTone: 'error', negative: '15.8%', negativeTone: 'error', priority: 'Khẩn cấp', priorityTone: 'error underline' },
]

const complaintLegend = [
  { label: 'Giáo viên: 40%', tone: 'error' },
  { label: 'Lộ trình: 30%', tone: 'warning' },
  { label: 'CSKH: 20%', tone: 'primary' },
  { label: 'Khác: 10%', tone: 'muted' },
]

const stationStatuses = [
  { label: 'Đã tiếp nhận', value: '19%', count: '8', width: 19, tone: 'muted' },
  { label: 'Đang xử lý', value: '28%', count: '12', width: 28, tone: 'warning' },
  { label: 'Đã hoàn thành', value: '53%', count: '22', width: 53, tone: 'primary' },
]

const processingBars = [
  { label: '< 1h', height: '30%', tone: 'primary-soft' },
  { label: '1-2h', height: '50%', tone: 'primary-mid' },
  { label: '2-4h', height: '85%', tone: 'primary' },
  { label: '4-8h', height: '40%', tone: 'warning' },
  { label: '> 8h', height: '15%', tone: 'danger-soft' },
]

const teacherWarnings = [
  { name: 'Nguyễn Văn A', meta: 'Mỹ Đình', value: '3.2/5', tone: 'error' },
  { name: 'Trần Thị B', meta: 'Linh Đàm', value: '3.4/5', tone: 'error' },
  { name: 'Lê Văn C', meta: 'Long Biên', value: '3.8/5', tone: 'warning' },
]

const staffWarnings = [
  { name: 'Hoàng Diệu L', meta: 'Bảo vệ', value: '2.1/5', tone: 'error' },
  { name: 'Phạm Minh K', meta: 'Tư vấn', value: '2.8/5', tone: 'error' },
  { name: 'Đỗ Hùng D', meta: 'Lễ tân', value: '3.1/5', tone: 'warning' },
]

const programWarnings = [
  { name: 'English for Kids', meta: 'Level 1', value: '3.0/5', tone: 'error' },
  { name: 'Tiếng Anh Station', meta: 'Level 2', value: '3.2/5', tone: 'error' },
  { name: 'Math Advanced', meta: 'Khối 6', value: '3.6/5', tone: 'warning' },
]

const options = {
  center: [{ value: 'all', label: 'Tất cả cơ sở' }],
  program: [{ value: 'all', label: 'Tất cả chương trình' }],
  feedbackType: [
    { value: 'all', label: 'Tất cả' },
    { value: 'survey', label: 'Khảo sát' },
    { value: 'complaint', label: 'Khiếu nại' },
    { value: 'bug', label: 'Báo lỗi' },
  ],
  touchpoint: [{ value: 'all', label: 'Tất cả điểm chạm' }],
  surveyType: [{ value: 'all', label: 'Tất cả loại' }],
}

export function StationDashboardContent({
  activeTab,
  setActiveTab,
  filters,
  updateFilter,
  resetFilters,
}: {
  activeTab: DashboardTab
  setActiveTab: (tab: DashboardTab) => void
  filters: StationFilterState
  updateFilter: <K extends keyof StationFilterState>(key: K, value: StationFilterState[K]) => void
  resetFilters: () => void
}) {
  return (
    <>
      <DashboardHeader
        title="Dashboard quản trị trải nghiệm khách hàng Offline"
        description="Theo dõi nhanh chất lượng trải nghiệm khách hàng tại mô hình Offline"
      />
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <section className="filter-card filter-card--shell dashboard-filter-panel">
        <div className="dashboard-filter-grid dashboard-filter-grid--station">
          <FilterField label="Từ ngày" type="date" value={filters.fromDate} onChange={(value) => updateFilter('fromDate', value)} />
          <FilterField label="Đến ngày" type="date" value={filters.toDate} onChange={(value) => updateFilter('toDate', value)} />
          <FilterField label="Cơ sở" type="select" value={filters.center} options={options.center} onChange={(value) => updateFilter('center', value)} />
          <FilterField label="Chương trình" type="select" value={filters.program} options={options.program} onChange={(value) => updateFilter('program', value)} />
          <FilterField label="Loại phản hồi" type="select" value={filters.feedbackType} options={options.feedbackType} onChange={(value) => updateFilter('feedbackType', value)} />
          <FilterField label="Điểm chạm" type="select" value={filters.touchpoint} options={options.touchpoint} onChange={(value) => updateFilter('touchpoint', value)} />
          <FilterField label="Loại khảo sát" type="select" value={filters.surveyType} options={options.surveyType} onChange={(value) => updateFilter('surveyType', value)} />
        </div>
        <FilterActions onReset={resetFilters} />
      </section>

      <section className="station-kpis">
        {stationKpis.map((item) => (
          <article key={item.label} className={`station-kpi station-kpi--${item.tone}`}>
            <p>{item.label}</p>
            <div className="station-kpi__value">
              <strong>{item.value}</strong>
              {item.suffix ? <span>{item.suffix}</span> : null}
            </div>
            {item.meta ? <small className="station-kpi__meta">{item.meta}</small> : null}
            {item.badge ? (
              <div className={`station-kpi__badge station-kpi__badge--${item.badge.tone}`}>
                {item.badge.icon ? <span className="material-symbols-outlined">{item.badge.icon}</span> : null}
                {item.badge.text}
              </div>
            ) : null}
          </article>
        ))}
      </section>

      <section className="station-card station-card--table">
        <div className="station-card__header station-card__header--centers">
          <div className="station-card__header-main">
            <div className="station-card__icon station-card__icon--danger">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <h2>Cơ sở rủi ro</h2>
              <p>Phân tích rủi ro vận hành offline theo cơ sở</p>
            </div>
          </div>
          <div className="station-card__legend">
            <div><span className="station-dot station-dot--error" />Cần can thiệp ngay</div>
            <div><span className="station-dot station-dot--warning" />Cần theo dõi</div>
            <div><span className="station-dot station-dot--primary" />Ổn định</div>
          </div>
        </div>
        <div className="station-table-wrap">
          <table className="station-table station-table--centers">
            <colgroup>
              <col className="station-col station-col--center-name" />
              <col className="station-col station-col--metric" />
              <col className="station-col station-col--metric" />
              <col className="station-col station-col--metric" />
              <col className="station-col station-col--risk" />
              <col className="station-col station-col--chevron" />
            </colgroup>
            <thead>
              <tr>
                <th>Cơ sở</th>
                <th className="u-center">Điểm TB</th>
                <th className="u-center">Tỷ lệ tiêu cực</th>
                <th className="u-center">Khiếu nại</th>
                <th>Mức rủi ro</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {stationCenters.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td className="u-center"><span className={`station-score-badge station-score-badge--${item.riskTone === 'warning' ? 'warning' : item.riskTone === 'error' ? 'error' : 'primary'}`}>{item.score}</span></td>
                  <td className="u-center"><span className={`station-score-badge station-score-badge--${item.riskTone === 'warning' ? 'warning' : item.riskTone === 'error' ? 'error' : 'primary'}`}>{item.negative}</span></td>
                  <td className="u-center">{item.complaints}</td>
                  <td><span className={`station-pill station-pill--${item.riskTone}`}>{item.risk}</span></td>
                  <td className="u-right"><span className="material-symbols-outlined station-chevron">chevron_right</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="station-survey-grid">
        <StationScoreCard title="Khảo sát phụ huynh" description="Hài lòng theo tiêu chí" data={parentSurvey} />
        <StationScoreCard title="Khảo sát học sinh" description="Hài lòng theo trải nghiệm" data={studentSurvey} />
        <StationProgramCard />
      </div>

      <section className="station-card station-card--table">
        <div className="station-card__header">
          <div>
            <h2>Điểm chạm rủi ro tại cơ sở</h2>
            <p>Phân tích sâu các điểm giao tiếp thực tế</p>
          </div>
          <button className="station-link-button" type="button">
            Xem chi tiết
          </button>
        </div>
        <div className="station-table-wrap">
          <table className="station-table station-table--touchpoints">
            <colgroup>
              <col className="station-col station-col--touchpoint-name" />
              <col className="station-col station-col--touchpoint-metric" />
              <col className="station-col station-col--touchpoint-metric" />
              <col className="station-col station-col--touchpoint-metric" />
              <col className="station-col station-col--touchpoint-priority" />
            </colgroup>
            <thead>
              <tr>
                <th>Điểm chạm</th>
                <th className="u-right">Lượng PH</th>
                <th className="u-right">Điểm TB</th>
                <th className="u-right">Tiêu cực (%)</th>
                <th>Ưu tiên</th>
              </tr>
            </thead>
            <tbody>
              {stationTouchpoints.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td className="u-right">{item.volume}</td>
                  <td className="u-right"><span className={`station-score-badge station-score-badge--${item.scoreTone}`}>{item.score}</span></td>
                  <td className={`u-right station-text-tone station-text-tone--${item.negativeTone}`}>{item.negative}</td>
                  <td><span className={`station-pill station-pill--${item.priorityTone}`}>{item.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="station-analysis-grid">
        <article className="station-card station-card--center">
          <h4>Khiếu nại theo đối tượng</h4>
          <div className="station-complaint-donut">
            <svg viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f1f5f9" strokeWidth="3" />
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#EA2D2D" strokeDasharray="40 100" strokeLinecap="round" strokeWidth="3.2" />
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#FF9E08" strokeDasharray="30 100" strokeDashoffset="-40" strokeLinecap="round" strokeWidth="3.2" />
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#2563eb" strokeDasharray="20 100" strokeDashoffset="-70" strokeLinecap="round" strokeWidth="3.2" />
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#94A3B8" strokeDasharray="10 100" strokeDashoffset="-90" strokeLinecap="round" strokeWidth="3.2" />
            </svg>
            <div className="station-complaint-donut__center">
              <strong>42</strong>
              <span>Ca xử lý</span>
            </div>
          </div>
          <div className="station-complaint-legend">
            {complaintLegend.map((item) => (
              <div key={item.label}>
                <span className={`station-legend-box station-legend-box--${item.tone}`} />
                {item.label}
              </div>
            ))}
          </div>
        </article>

        <article className="station-card">
          <h4>Trạng thái xử lý khiếu nại</h4>
          <div className="station-status-list">
            {stationStatuses.map((item) => (
              <div key={item.label} className="station-status-item">
                <div className="station-status-item__head">
                  <span>{item.label}</span>
                  <strong className={`station-text-tone station-text-tone--${item.tone}`}>
                    {item.value} <small>({item.count})</small>
                  </strong>
                </div>
                <div className="station-status-item__track">
                  <div className={`station-status-item__fill station-status-item__fill--${item.tone}`} style={{ width: `${item.width}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="station-card station-card--processing">
          <h4>Thời gian xử lý khiếu nại</h4>
          <div className="station-processing-bars">
            {processingBars.map((item) => (
              <div key={item.label} className={`station-processing-bars__item station-processing-bars__item--${item.tone}`} style={{ height: item.height }} title={item.label} />
            ))}
          </div>
          <div className="station-processing-labels">
            {processingBars.map((item) => (
              <span key={item.label}>{item.label}</span>
            ))}
          </div>
          <div className="station-processing-target">
            <p>Mục tiêu: &lt; 2h</p>
            <strong>
              Hiện tại: 1.4h <span>(Đạt)</span>
            </strong>
          </div>
        </article>
      </div>

      <section className="station-card station-card--rankings">
        <div className="station-card__header station-card__header--warning">
          <div className="station-card__icon station-card__icon--danger">
            <span className="material-symbols-outlined">trending_down</span>
          </div>
          <div className="station-card__header-copy station-card__header-copy--warning">
            <h2>5 cảnh báo ưu tiên</h2>
            <p>Đối tượng có điểm hài lòng thấp nhất trong kỳ</p>
          </div>
        </div>
        <div className="station-ranking-grid">
          <StationWarningColumn title="Giáo viên" items={teacherWarnings} />
          <StationWarningColumn title="Nhân viên" items={staffWarnings} />
          <StationWarningColumn title="Chương trình" items={programWarnings} truncate />
        </div>
      </section>

      <footer className="dashboard-tutor-footer">© 2026 RINO EDU</footer>
    </>
  )
}

function StationScoreCard({
  title,
  description,
  data,
}: {
  title: string
  description: string
  data: Array<{ label: string; value: string; width: number; tone: string }>
}) {
  return (
    <article className="station-card">
      <div className="station-score-card__header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span>Điểm TB (1-5)</span>
      </div>
      <div className="station-score-list">
        {data.map((item) => (
          <div key={item.label} className="station-score-list__item">
            <div className="station-score-list__head">
              <span>{item.label}</span>
              <strong className={`station-text-tone station-text-tone--${item.tone === 'warning' ? 'warning' : 'primary'}`}>{item.value}</strong>
            </div>
            <div className="station-score-list__track">
              <div className={`station-score-list__fill station-score-list__fill--${item.tone}`} style={{ width: `${item.width}%` }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

function StationProgramCard() {
  return (
    <article className="station-card">
      <div className="station-score-card__header">
        <div>
          <h3>Theo chương trình</h3>
          <p>Phân tách theo môn học</p>
        </div>
        <span>Điểm TB (1-5)</span>
      </div>
      <div className="station-score-list">
        {programSurvey.map((item) => (
          <div key={item.label} className="station-score-list__item">
            <div className="station-score-list__head station-score-list__head--program">
              <div className="station-program-title">
                <span>{item.label}</span>
                <em className={`station-mini-badge station-mini-badge--${item.trendTone}`}>{item.trend}</em>
              </div>
              <strong className={`station-text-tone station-text-tone--${item.tone === 'danger' ? 'error' : item.tone}`}>{item.value}</strong>
            </div>
            <div className="station-score-list__track">
              <div className={`station-score-list__fill station-score-list__fill--${item.tone}`} style={{ width: `${item.width}%` }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

function StationWarningColumn({
  title,
  items,
  truncate,
}: {
  title: string
  items: Array<{ name: string; meta: string; value: string; tone: string }>
  truncate?: boolean
}) {
  return (
    <div className="station-warning-column">
      <h4>{title}</h4>
      <div className="station-warning-list">
        {items.map((item) => (
          <div key={`${title}-${item.name}`} className="station-warning-row">
            <span className={truncate ? 'truncate' : ''}>
              {item.name}
              <small>{item.meta}</small>
            </span>
            <strong className={`station-score-badge station-score-badge--${item.tone}`}>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
