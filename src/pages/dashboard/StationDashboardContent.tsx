import { DashboardHeader, DashboardTabs, FilterActions, FilterField, type DashboardTab } from './dashboardContent'

export type StationFilterState = {
  fromDate: string
  toDate: string
  center: string
  product: string
  program: string
  feedbackType: string
  touchpoint: string
}

export const initialStationFilters: StationFilterState = {
  fromDate: '2026-03-01',
  toDate: '2026-03-31',
  center: 'all',
  product: 'all',
  program: 'all',
  feedbackType: 'all',
  touchpoint: 'all',
}

const stationKpis = [
  { label: 'Điểm khảo sát TB', value: '4.2', suffix: '/5.0', badge: { icon: 'trending_up', text: '+0.2', tone: 'success' }, tone: 'primary' },
  { label: 'Tổng khảo sát', value: '8,420', meta: 'Khảo sát hợp lệ', tone: 'neutral' },
  { label: 'Tổng khiếu nại', value: '42', badge: { icon: 'warning', text: '8 khẩn cấp', tone: 'danger' }, tone: 'warning' },
  { label: 'Thời gian xử lý khiếu nại TB', value: '1.4h', badge: { text: 'Đạt mục tiêu', tone: 'success' }, tone: 'neutral' },
  { label: 'Tổng báo lỗi', value: '156', meta: 'Trong kỳ lọc', badge: { icon: 'trending_up', text: '↑ 12% so với kỳ trước', tone: 'danger' }, tone: 'danger-border' },
]

const stationCenters = [
  { name: 'Cơ sở Linh Đàm', score: '3.2', negative: '18.4%', complaints: '12', risk: 'Cần can thiệp ngay', riskTone: 'error' },
  { name: 'Cơ sở Nguyễn Tuân', score: '3.8', negative: '9.2%', complaints: '6', risk: 'Cần theo dõi', riskTone: 'warning' },
  { name: 'Cơ sở Long Biên', score: '4.5', negative: '2.1%', complaints: '1', risk: 'Ổn định', riskTone: 'primary' },
  { name: 'Cơ sở Mỹ Đình', score: '4.0', negative: '6.8%', complaints: '4', risk: 'Cần theo dõi', riskTone: 'warning' },
  { name: 'Cơ sở Hà Đông', score: '4.3', negative: '3.4%', complaints: '2', risk: 'Ổn định', riskTone: 'primary' },
]

const stationTouchpoints = [
  { name: 'Khu vực sảnh chờ & Check-in', volume: '1,204', score: '3.4', scoreTone: 'warning', negative: '12.5%', negativeTone: 'error', priority: 'Cao', priorityTone: 'error' },
  { name: 'Tương tác tại bãi đỗ xe', volume: '850', score: '3.7', scoreTone: 'muted', negative: '9.2%', negativeTone: 'warning', priority: 'Trung bình', priorityTone: 'warning' },
  { name: 'Trải nghiệm nhà vệ sinh', volume: '620', score: '3.1', scoreTone: 'error', negative: '15.8%', negativeTone: 'error', priority: 'Khẩn cấp', priorityTone: 'error underline' },
  { name: 'Tư vấn đầu vào tại quầy', volume: '745', score: '3.9', scoreTone: 'warning', negative: '7.4%', negativeTone: 'warning', priority: 'Theo dõi', priorityTone: 'warning' },
  { name: 'Bàn hỗ trợ học vụ', volume: '518', score: '4.1', scoreTone: 'primary', negative: '4.3%', negativeTone: 'warning', priority: 'Ổn định', priorityTone: 'primary' },
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
  { label: 'Tiếng Anh Cambridge', trend: '↑ 4%', trendTone: 'success', value: '4.4', width: 88, tone: 'primary' },
  { label: 'Tiếng Anh Station', trend: '→ 0%', trendTone: 'muted', value: '3.5', width: 70, tone: 'warning' },
  { label: 'Tiếng Anh Digital Teacher', trend: '↓ 2%', trendTone: 'danger', value: '2.8', width: 56, tone: 'danger' },
]

const complaintByObject = [
  { label: 'Giáo viên: 40%', tone: 'error' },
  { label: 'Lộ trình: 30%', tone: 'warning' },
  { label: 'CSKH: 20%', tone: 'primary' },
  { label: 'Khác: 10%', tone: 'muted' },
]

const complaintStatus = [
  { label: 'Mới: 19%', tone: 'primary' },
  { label: 'Đang xử lý: 28%', tone: 'warning' },
  { label: 'Đã hoàn thành: 53%', tone: 'muted' },
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
  { name: 'Phạm Thị D', meta: 'Nguyễn Tuân', value: '3.9/5', tone: 'warning' },
  { name: 'Hoàng Văn E', meta: 'Hà Đông', value: '4.0/5', tone: 'warning' },
]

const staffWarnings = [
  { name: 'Hoàng Diệu L', meta: 'Bảo vệ', value: '2.1/5', tone: 'error' },
  { name: 'Phạm Minh K', meta: 'Tư vấn', value: '2.8/5', tone: 'error' },
  { name: 'Đỗ Hùng D', meta: 'Lễ tân', value: '3.1/5', tone: 'warning' },
  { name: 'Vũ Minh T', meta: 'CSKH', value: '3.3/5', tone: 'warning' },
  { name: 'Lê Thu H', meta: 'Học vụ', value: '3.5/5', tone: 'warning' },
]

const programWarnings = [
  { name: 'Tiếng Anh Station', meta: 'Rino Station', value: '3.0/5', tone: 'error' },
  { name: 'Toán tư duy Station', meta: 'Rino Station', value: '3.2/5', tone: 'error' },
  { name: 'Tiếng Anh Cambridge', meta: 'Rino Edu', value: '3.6/5', tone: 'warning' },
  { name: 'Tiếng Anh IELTS', meta: 'Ieltspeed', value: '3.8/5', tone: 'warning' },
  { name: 'Tiếng Anh Digital Teacher', meta: 'Rino Digi', value: '4.0/5', tone: 'warning' },
]

const options = {
  center: [
    { value: 'all', label: 'Tất cả cơ sở' },
    { value: 'linh-dam', label: 'Cơ sở Linh Đàm' },
    { value: 'nguyen-tuan', label: 'Cơ sở Nguyễn Tuân' },
    { value: 'long-bien', label: 'Cơ sở Long Biên' },
    { value: 'my-dinh', label: 'Cơ sở Mỹ Đình' },
  ],
  product: [
    { value: 'all', label: 'Tất cả' },
    { value: 'Rino Edu', label: 'Rino Edu' },
    { value: 'Rino Station', label: 'Rino Station' },
    { value: 'Rino Digi', label: 'Rino Digi' },
    { value: 'Ieltspeed', label: 'Ieltspeed' },
  ],
  program: [
    { value: 'all', label: 'Tất cả chương trình' },
    { value: 'Tiếng Anh Cambridge', label: 'Tiếng Anh Cambridge' },
    { value: 'Tiếng Anh IELTS', label: 'Tiếng Anh IELTS' },
    { value: 'Tiếng Anh Kindie Tutor', label: 'Tiếng Anh Kindie Tutor' },
    { value: 'Chương trình Toán tư duy Tutor', label: 'Chương trình Toán tư duy Tutor' },
    { value: 'Tiếng Anh Station', label: 'Tiếng Anh Station' },
    { value: 'Toán tư duy Station', label: 'Toán tư duy Station' },
    { value: 'Tiếng Anh Digital Teacher', label: 'Tiếng Anh Digital Teacher' },
  ],
  feedbackType: [
    { value: 'all', label: 'Tất cả' },
    { value: 'survey', label: 'Khảo sát' },
    { value: 'complaint', label: 'Khiếu nại' },
    { value: 'bug', label: 'Báo lỗi' },
  ],
  touchpoint: [
    { value: 'all', label: 'Tất cả điểm chạm' },
    { value: 'Khu vực sảnh chờ & Check-in', label: 'Khu vực sảnh chờ & Check-in' },
    { value: 'Tương tác tại bãi đỗ xe', label: 'Tương tác tại bãi đỗ xe' },
    { value: 'Trải nghiệm nhà vệ sinh', label: 'Trải nghiệm nhà vệ sinh' },
    { value: 'Tư vấn đầu vào tại quầy', label: 'Tư vấn đầu vào tại quầy' },
    { value: 'Bàn hỗ trợ học vụ', label: 'Bàn hỗ trợ học vụ' },
  ],
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
          <FilterField label="Sản phẩm" type="select" value={filters.product} options={options.product} onChange={(value) => updateFilter('product', value)} />
          <FilterField label="Chương trình" type="select" value={filters.program} options={options.program} onChange={(value) => updateFilter('program', value)} />
          <FilterField label="Loại phản hồi" type="select" value={filters.feedbackType} options={options.feedbackType} onChange={(value) => updateFilter('feedbackType', value)} />
          <FilterField label="Điểm chạm" type="select" value={filters.touchpoint} options={options.touchpoint} onChange={(value) => updateFilter('touchpoint', value)} />
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

      <div className="station-top-grid">
        <section className="station-card station-card--table">
          <div className="station-card__header station-card__header--centers">
            <div className="station-card__header-main">
              <div className="station-card__icon station-card__icon--danger">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h2>Đánh giá Cơ sở</h2>
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
                  <th className="u-center">Tiêu cực</th>
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

        <section className="station-card station-card--table">
          <div className="station-card__header">
            <div>
              <h2>Điểm chạm rủi ro</h2>
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
                  <th className="u-right">Phản hồi</th>
                  <th className="u-right">Điểm</th>
                  <th className="u-right">Tiêu cực</th>
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
      </div>

      <div className="station-survey-grid">
        <StationScoreCard title="Khảo sát phụ huynh" description="Hài lòng theo tiêu chí" data={parentSurvey} />
        <StationScoreCard title="Khảo sát học sinh" description="Hài lòng theo trải nghiệm" data={studentSurvey} />
        <StationProgramCard />
      </div>

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
            {complaintByObject.map((item) => (
              <div key={item.label}>
                <span className={`station-legend-box station-legend-box--${item.tone}`} />
                {item.label}
              </div>
            ))}
          </div>
        </article>

        <article className="station-card station-card--center">
          <h4>Trạng thái xử lý khiếu nại</h4>
          <div className="station-complaint-donut">
            <svg viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f1f5f9" strokeWidth="3" />
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#2563eb" strokeDasharray="19 100" strokeLinecap="round" strokeWidth="3.2" />
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#FF9E08" strokeDasharray="28 100" strokeDashoffset="-19" strokeLinecap="round" strokeWidth="3.2" />
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#94A3B8" strokeDasharray="53 100" strokeDashoffset="-47" strokeLinecap="round" strokeWidth="3.2" />
            </svg>
            <div className="station-complaint-donut__center">
              <strong>42</strong>
              <span>Tổng cộng</span>
            </div>
          </div>
          <div className="station-complaint-legend">
            {complaintStatus.map((item) => (
              <div key={item.label}>
                <span className={`station-legend-box station-legend-box--${item.tone}`} />
                {item.label}
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
          <p>Phân tách theo nhóm đào tạo</p>
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
