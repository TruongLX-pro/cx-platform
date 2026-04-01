import { DashboardHeader, DashboardTabs, FilterActions, FilterField, type DashboardTab } from './dashboardContent'

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
  subject: 'all',
  touchpoint: 'all',
  feedbackType: 'all',
}

const tutorKpis = [
  { label: 'Điểm khảo sát TB', value: '4.2', suffix: '/ 5.0', note: '+0.2 so với kỳ trước', tone: 'primary', trend: true, noteTone: 'primary' },
  { label: 'Tổng khảo sát', value: '45,201', note: 'Trong kỳ lọc', tone: 'neutral' },
  { label: 'Tổng khiếu nại', value: '248', note: 'Trong kỳ lọc', tone: 'error' },
  { label: 'Thời gian xử lý TB', value: '4.2%', note: 'Trong kỳ lọc', tone: 'warning' },
  { label: 'Tổng báo lỗi', value: '156', note: '+12% so với kỳ trước', tone: 'error', trend: true, noteTone: 'error' },
]

const programReviews = [
  { name: 'Tiếng Anh Cambridge', volume: '8,640', score: '4.8', scoreTone: 'primary', negative: '2.1%', negativeTone: 'muted' },
  { name: 'Tiếng Anh IELTS', volume: '6,120', score: '4.5', scoreTone: 'primary', negative: '3.8%', negativeTone: 'warning' },
  { name: 'Tiếng Anh Kindie Tutor', volume: '4,580', score: '4.2', scoreTone: 'warning', negative: '5.4%', negativeTone: 'warning' },
  { name: 'Chương trình Toán tư duy Tutor', volume: '9,320', score: '4.7', scoreTone: 'primary', negative: '2.6%', negativeTone: 'muted' },
  { name: 'Tiếng Anh Digital Teacher', volume: '5,140', score: '4.4', scoreTone: 'primary', negative: '4.2%', negativeTone: 'warning' },
]

const riskTouchpoints = [
  { name: 'Sau buổi học thử', volume: '1,240', score: '3.2', scoreTone: 'error', negative: '12.5%', negativeTone: 'error' },
  { name: 'Xác nhận lịch học', volume: '856', score: '4.1', scoreTone: 'warning', negative: '6.2%', negativeTone: 'warning' },
  { name: 'Gia hạn khóa học', volume: '3,412', score: '4.8', scoreTone: 'primary', negative: '1.2%', negativeTone: 'muted' },
  { name: 'Tư vấn đầu vào', volume: '965', score: '3.9', scoreTone: 'warning', negative: '7.1%', negativeTone: 'warning' },
  { name: 'Hỗ trợ học vụ', volume: '744', score: '3.6', scoreTone: 'warning', negative: '8.4%', negativeTone: 'warning' },
]

const parentSurvey = [
  { label: 'Giáo viên', value: '4.6', width: 92, tone: 'primary' },
  { label: 'Lộ trình học', value: '4.3', width: 86, tone: 'primary-soft' },
  { label: 'CSKH', value: '4.1', width: 82, tone: 'primary' },
]

const studentSurvey = [
  { label: 'Giáo viên', value: '4.5', width: 90, tone: 'primary' },
  { label: 'Nội dung bài học', value: '4.2', width: 84, tone: 'primary-soft' },
  { label: 'Bài tập về nhà', value: '4.0', width: 80, tone: 'warning' },
]

const complaintByObject = [
  { label: 'Giáo viên: 42%', tone: 'error' },
  { label: 'CSKH: 28%', tone: 'warning' },
  { label: 'Chương trình: 18%', tone: 'primary' },
  { label: 'Khác: 12%', tone: 'muted' },
]

const timeDistribution = [
  { label: 'Trong ngày', value: '42%', width: 42, tone: 'primary' },
  { label: '1-3 ngày', value: '35%', width: 35, tone: 'primary' },
  { label: '4-7 ngày', value: '15%', width: 15, tone: 'warning' },
  { label: 'Trên 7 ngày', value: '8%', width: 8, tone: 'error' },
]

const teacherWarnings = [
  { name: 'Nguyễn Văn A', meta: 'Cambridge K1', value: '2.4/5', tone: 'error' },
  { name: 'Trần Thị B', meta: 'IELTS Foundation', value: '2.8/5', tone: 'error' },
  { name: 'Lê Văn C', meta: 'Kindie Tutor', value: '3.1/5', tone: 'warning' },
  { name: 'Phạm Thị D', meta: 'Math Tutor 5', value: '3.3/5', tone: 'warning' },
  { name: 'Hoàng Văn E', meta: 'Cambridge Movers', value: '3.5/5', tone: 'warning' },
]

const staffWarnings = [
  { name: 'Trần Bảo Ngân', meta: 'CSKH', value: '1.9/5', tone: 'error' },
  { name: 'Lý Gia Hân', meta: 'Học vụ', value: '2.5/5', tone: 'error' },
  { name: 'Vũ Minh Tú', meta: 'Tư vấn đầu vào', value: '3.0/5', tone: 'warning' },
  { name: 'Đỗ Thùy Trang', meta: 'Điều phối lớp', value: '3.2/5', tone: 'warning' },
  { name: 'Phan Tuấn Anh', meta: 'Vận hành khảo sát', value: '3.4/5', tone: 'warning' },
]

const programWarnings = [
  { name: 'Tiếng Anh Kindie Tutor', meta: 'Rino Edu', value: '3.5/5', tone: 'warning' },
  { name: 'Tiếng Anh Station', meta: 'Rino Station', value: '3.7/5', tone: 'warning' },
  { name: 'Tiếng Anh Digital Teacher', meta: 'Rino Digi', value: '3.9/5', tone: 'warning' },
  { name: 'Toán tư duy Station', meta: 'Rino Station', value: '4.0/5', tone: 'warning' },
  { name: 'Tiếng Anh IELTS', meta: 'Ieltspeed', value: '4.1/5', tone: 'warning' },
]

const filterOptions = {
  productType: [
    { value: 'all', label: 'Tất cả' },
    { value: 'Rino Edu', label: 'Rino Edu' },
    { value: 'Rino Station', label: 'Rino Station' },
    { value: 'Rino Digi', label: 'Rino Digi' },
    { value: 'Ieltspeed', label: 'Ieltspeed' },
  ],
  program: [
    { value: 'all', label: 'Tất cả' },
    { value: 'Tiếng Anh Cambridge', label: 'Tiếng Anh Cambridge' },
    { value: 'Tiếng Anh IELTS', label: 'Tiếng Anh IELTS' },
    { value: 'Tiếng Anh Kindie Tutor', label: 'Tiếng Anh Kindie Tutor' },
    { value: 'Chương trình Toán tư duy Tutor', label: 'Chương trình Toán tư duy Tutor' },
    { value: 'Tiếng Anh Station', label: 'Tiếng Anh Station' },
    { value: 'Toán tư duy Station', label: 'Toán tư duy Station' },
    { value: 'Tiếng Anh Digital Teacher', label: 'Tiếng Anh Digital Teacher' },
  ],
  subject: [
    { value: 'all', label: 'Tất cả' },
    { value: 'english', label: 'Tiếng Anh' },
    { value: 'math', label: 'Toán tư duy' },
  ],
  touchpoint: [
    { value: 'all', label: 'Tất cả' },
    { value: 'Sau buổi học thử', label: 'Sau buổi học thử' },
    { value: 'Xác nhận lịch học', label: 'Xác nhận lịch học' },
    { value: 'Gia hạn khóa học', label: 'Gia hạn khóa học' },
    { value: 'Tư vấn đầu vào', label: 'Tư vấn đầu vào' },
    { value: 'Chăm sóc sau bán', label: 'Chăm sóc sau bán' },
    { value: 'Hỗ trợ học vụ', label: 'Hỗ trợ học vụ' },
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
      <DashboardHeader
        title="Dashboard quản trị trải nghiệm khách hàng"
        description="Theo dõi nhanh chất lượng trải nghiệm khách hàng trên toàn hệ thống"
      />
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
            <h2>Đánh giá chương trình</h2>
          </div>
          <table className="data-table dashboard-table dashboard-table--tutor dashboard-table--programs">
            <thead>
              <tr>
                <th>Chương trình</th>
                <th className="u-right">Phản hồi</th>
                <th className="u-right">Điểm</th>
                <th className="u-right">Tiêu cực</th>
              </tr>
            </thead>
            <tbody>
              {programReviews.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td className="u-right">{item.volume}</td>
                  <td className="u-right">
                    <span className={`dashboard-tutor-score dashboard-tutor-score--${item.scoreTone}`}>{item.score}</span>
                  </td>
                  <td className="u-right">
                    <span className={`dashboard-tutor-rate dashboard-tutor-rate--${item.negativeTone}`}>{item.negative}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="dashboard-card dashboard-tutor-program-card dashboard-card--table-split">
          <div className="dashboard-card__header">
            <h2>Điểm chạm rủi ro</h2>
          </div>
          <table className="data-table dashboard-table dashboard-table--tutor dashboard-table--programs">
            <thead>
              <tr>
                <th>Điểm chạm</th>
                <th className="u-right">Phản hồi</th>
                <th className="u-right">Điểm</th>
                <th className="u-right">Tiêu cực</th>
              </tr>
            </thead>
            <tbody>
              {riskTouchpoints.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td className="u-right">{item.volume}</td>
                  <td className="u-right">
                    <span className={`dashboard-tutor-score dashboard-tutor-score--${item.scoreTone}`}>{item.score}</span>
                  </td>
                  <td className="u-right">
                    <span className={`dashboard-tutor-rate dashboard-tutor-rate--${item.negativeTone}`}>{item.negative}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <div className="dashboard-tutor-survey-grid">
          <SurveyScoreCard title="Khảo sát phụ huynh" description="Hài lòng theo tiêu chí" data={parentSurvey} />
          <SurveyScoreCard title="Khảo sát học sinh" description="Hài lòng theo trải nghiệm" data={studentSurvey} />
        </div>

        <div className="dashboard-tutor-analysis-grid">
          <article className="dashboard-card dashboard-card--center">
            <h4>Khiếu nại theo đối tượng</h4>
            <div className="station-complaint-donut">
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f1f5f9" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#EA2D2D" strokeDasharray="42 100" strokeLinecap="round" strokeWidth="3.2" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#FF9E08" strokeDasharray="28 100" strokeDashoffset="-42" strokeLinecap="round" strokeWidth="3.2" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#2563eb" strokeDasharray="18 100" strokeDashoffset="-70" strokeLinecap="round" strokeWidth="3.2" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#94A3B8" strokeDasharray="12 100" strokeDashoffset="-88" strokeLinecap="round" strokeWidth="3.2" />
              </svg>
              <div className="station-complaint-donut__center">
                <strong>248</strong>
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

          <article className="dashboard-card dashboard-tutor-donut-card">
            <h4>Trạng thái khiếu nại</h4>
            <div className="station-complaint-donut">
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f1f5f9" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#2563eb" strokeDasharray="15 100" strokeLinecap="round" strokeWidth="3.2" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#FF9E08" strokeDasharray="25 100" strokeDashoffset="-15" strokeLinecap="round" strokeWidth="3.2" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#94A3B8" strokeDasharray="60 100" strokeDashoffset="-40" strokeLinecap="round" strokeWidth="3.2" />
              </svg>
              <div className="station-complaint-donut__center">
                <strong>248</strong>
                <span>Tổng cộng</span>
              </div>
            </div>
            <div className="station-complaint-legend">
              <div>
                <span className="station-legend-box station-legend-box--primary" />
                Mới: 15%
              </div>
              <div>
                <span className="station-legend-box station-legend-box--warning" />
                Đang xử lý: 25%
              </div>
              <div>
                <span className="station-legend-box station-legend-box--muted" />
                Đã xong: 60%
              </div>
            </div>
          </article>

          <article className="dashboard-card dashboard-tutor-time-card">
            <h4>Phân bổ thời gian xử lý khiếu nại</h4>
            <div className="dashboard-tutor-time">
              {timeDistribution.map((item) => (
                <div key={item.label} className="dashboard-tutor-time__item">
                  <div className="dashboard-tutor-time__head">
                    <span>{item.label}</span>
                    <strong className={`dashboard-tutor-text-tone dashboard-tutor-text-tone--${item.tone}`}>{item.value}</strong>
                  </div>
                  <div className="dashboard-tutor-time__track">
                    <div className={`dashboard-tutor-time__fill dashboard-tutor-time__fill--${item.tone}`} style={{ width: `${item.width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <section className="station-card station-card--rankings dashboard-tutor-warning-shell">
          <div className="station-card__header station-card__header--warning">
            <div className="station-card__icon station-card__icon--danger">
              <span className="material-symbols-outlined">trending_down</span>
            </div>
            <div className="station-card__header-copy station-card__header-copy--warning">
              <h2>5 cảnh báo ưu tiên</h2>
              <p>Đối tượng có điểm hài lòng thấp nhất cần theo dõi trong kỳ</p>
            </div>
          </div>
          <div className="station-ranking-grid">
            <WarningColumn title="Giáo viên" items={teacherWarnings} />
            <WarningColumn title="Nhân viên" items={staffWarnings} />
            <WarningColumn title="Chương trình" items={programWarnings} truncate />
          </div>
        </section>
      </div>

      <footer className="dashboard-tutor-footer">© 2026 RINO EDU</footer>
    </>
  )
}

function SurveyScoreCard({
  title,
  description,
  data,
}: {
  title: string
  description: string
  data: Array<{ label: string; value: string; width: number; tone: string }>
}) {
  return (
    <article className="dashboard-card">
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

function WarningColumn({
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
