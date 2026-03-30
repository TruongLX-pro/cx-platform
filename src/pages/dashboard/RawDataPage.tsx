import { useMemo, useState } from 'react'
import { rawDataRecords } from '../../data/dashboardData'

type RawTableRow = {
  id: string
  type: 'Khảo sát' | 'Khiếu nại'
  source: string
  touchpoint: string
  scoreOrTopic: string
  respondent: string
  relatedObject: string
  program: string
  product: string
  negative: 'positive' | 'warning' | 'negative'
  status: string
  statusTone: 'default' | 'warning'
}

type RawFilters = {
  dataType: string
  sourceSystem: string
  period: string
  product: string
  program: string
  respondentQuery: string
  negativeOnly: boolean
}

const initialFilters: RawFilters = {
  dataType: 'all',
  sourceSystem: 'all',
  period: '01/03/2026 - 24/03/2026',
  product: 'cam',
  program: 'all',
  respondentQuery: '',
  negativeOnly: false,
}

function buildSeedRows(): RawTableRow[] {
  const baseRows: RawTableRow[] = rawDataRecords.slice(0, 3).map((record) => {
    const isComplaint = record.recordType === 'complaint_case'
    const scoreOrTopic = isComplaint ? record.complaintCategory ?? 'N/A' : record.scoreValueRaw ?? 'N/A'
    const relatedObject = record.objectName && record.objectType ? `${record.objectType}: ${record.objectName}` : record.productName

    return {
      id: record.recordId,
      type: isComplaint ? 'Khiếu nại' : 'Khảo sát',
      source: record.sourceSystem,
      touchpoint: record.surveyType ?? record.touchpointId,
      scoreOrTopic,
      respondent: record.respondentType,
      relatedObject,
      program: record.programName,
      product: record.productName,
      negative: isComplaint ? 'negative' : record.negativeFlag ? 'warning' : 'positive',
      status: record.processingStatus ?? 'Hoàn thành',
      statusTone: record.processingStatus === 'Đang xử lý' ? 'warning' : 'default',
    }
  })

  const syntheticRows: RawTableRow[] = Array.from({ length: 15 }, (_, index) => ({
    id: `SR_20260324_00${index + 10}`,
    type: 'Khảo sát',
    source: 'Care',
    touchpoint: 'CES',
    scoreOrTopic: '7',
    respondent: 'Học sinh',
    relatedObject: 'CSKH: Nguyễn Văn A',
    program: 'RinoEdu',
    product: 'Toán tư duy',
    negative: 'positive',
    status: 'Hoàn thành',
    statusTone: 'default',
  }))

  return [...baseRows, ...syntheticRows]
}

export function RawDataPage() {
  const [filters, setFilters] = useState<RawFilters>(initialFilters)
  const tableRows = useMemo(buildSeedRows, [])
  const surveyCount = 10200
  const complaintCount = 2250
  const bugReportCount = 156
  const missingMappingCount = 15

  const updateFilter = <K extends keyof RawFilters>(key: K, value: RawFilters[K]) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  return (
    <section className="raw-data-page raw-data-page--stitch">
      <div className="page-header page-header--shell">
        <div>
          <h1>Dữ liệu phản hồi tập trung</h1>
          <p>Tra cứu, lọc và xuất dữ liệu phản hồi khảo sát và khiếu nại theo nhu cầu</p>
        </div>
        <div className="page-header__actions">
          <button className="button button--ghost" type="button">
            <span className="material-symbols-outlined" aria-hidden="true">
              refresh
            </span>
            Làm mới dữ liệu
          </button>
          <button className="button button--primary" type="button">
            <span className="material-symbols-outlined" aria-hidden="true">
              download
            </span>
            Xuất dữ liệu
          </button>
        </div>
      </div>

      <div className="stats-grid stats-grid--raw">
        <SummaryCard label="Tổng bản ghi" value="12,450" />
        <SummaryCard label="Bản ghi khảo sát" value={String(surveyCount)} accent="primary" />
        <SummaryCard label="Bản ghi khiếu nại" value={String(complaintCount)} accent="neutral" />
        <SummaryCard label="Bản ghi báo lỗi" value={String(bugReportCount)} accent="danger" icon="bug_report" />
        <SummaryCard label="Thiếu mapping" value={String(missingMappingCount)} accent="warning" icon="warning" borderAccent />
      </div>

      <section className="filter-card filter-card--shell raw-filter-shell">
        <div className="filter-grid raw-filter-grid">
          <FilterControl
            label="Loại dữ liệu"
            type="select"
            value={filters.dataType}
            onChange={(value) => updateFilter('dataType', value)}
            options={[
              { value: 'all', label: 'Tất cả' },
              { value: 'survey', label: 'Khảo sát' },
              { value: 'complaint', label: 'Khiếu nại' },
              { value: 'bug', label: 'Báo lỗi' },
            ]}
          />
          <FilterControl
            label="Hệ thống nguồn"
            type="select"
            value={filters.sourceSystem}
            onChange={(value) => updateFilter('sourceSystem', value)}
            options={[
              { value: 'all', label: 'Tất cả' },
              { value: 'care', label: 'Care' },
              { value: 'zalo', label: 'Zalo' },
              { value: 'ticket', label: 'Ticket' },
            ]}
          />
          <FilterControl
            label="Thời gian"
            type="text"
            value={filters.period}
            onChange={(value) => updateFilter('period', value)}
            icon="calendar_month"
          />
          <FilterControl
            label="Sản phẩm"
            type="select"
            value={filters.product}
            onChange={(value) => updateFilter('product', value)}
            options={[
              { value: 'cam', label: 'Tiếng Anh Cam' },
              { value: 'math', label: 'Toán tư duy' },
            ]}
          />
          <FilterControl
            label="Chương trình"
            type="select"
            value={filters.program}
            onChange={(value) => updateFilter('program', value)}
            options={[
              { value: 'all', label: 'Tất cả' },
              { value: 'rinoedu', label: 'RinoEdu' },
              { value: 'station', label: 'Station' },
            ]}
          />
          <FilterControl
            label="Người phản hồi"
            type="text"
            value={filters.respondentQuery}
            onChange={(value) => updateFilter('respondentQuery', value)}
            placeholder="Tìm tên/SĐT..."
          />
        </div>

        <div className="dashboard-filter-actions dashboard-filter-actions--between dashboard-filter-actions--topline">
          <div className="raw-filter-meta">
            <label className="raw-filter-check">
              <input
                type="checkbox"
                checked={filters.negativeOnly}
                onChange={(event) => updateFilter('negativeOnly', event.target.checked)}
              />
              <span>Chỉ xem Negative Flag</span>
            </label>
            <button className="button button--text" type="button">
              <span className="material-symbols-outlined" aria-hidden="true">
                filter_list
              </span>
              Bộ lọc nâng cao (12)
            </button>
          </div>

          <div className="dashboard-filter-actions">
            <button className="button button--minimal" type="button" onClick={() => setFilters(initialFilters)}>
              Đặt lại
            </button>
            <button className="button button--tinted" type="button">
              Áp dụng
            </button>
          </div>
        </div>
      </section>

      <section className="table-card table-card--raw-shell">
        <div className="raw-table-scroll custom-scrollbar">
          <table className="data-table data-table--raw data-table--raw-stitch">
            <thead>
              <tr>
                <th className="raw-check-col raw-sticky-col raw-sticky-col--check">
                  <input type="checkbox" />
                </th>
                <th className="raw-record-col raw-sticky-col raw-sticky-col--record">Record ID</th>
                <th>Loại</th>
                <th>Nguồn</th>
                <th>Touchpoint</th>
                <th>Điểm/Chủ đề</th>
                <th>Người phản hồi</th>
                <th>Đối tượng liên quan</th>
                <th>Chương trình</th>
                <th>Sản phẩm</th>
                <th className="u-center">Negative</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.id} className={row.type === 'Khiếu nại' ? 'raw-row--alert' : ''}>
                  <td className="raw-check-col raw-sticky-col raw-sticky-col--check">
                    <input type="checkbox" />
                  </td>
                  <td className="code-cell raw-record-col raw-sticky-col raw-sticky-col--record">{row.id}</td>
                  <td>
                    <span className={`survey-pill${row.type === 'Khiếu nại' ? ' survey-pill--danger' : ''}`}>{row.type}</span>
                  </td>
                  <td>{row.source}</td>
                  <td>{row.touchpoint}</td>
                  <td className={row.type === 'Khảo sát' ? 'raw-score-cell' : 'raw-topic-cell'}>{row.scoreOrTopic}</td>
                  <td className="raw-respondent">{row.respondent}</td>
                  <td>{row.relatedObject}</td>
                  <td>{row.program}</td>
                  <td>{row.product}</td>
                  <td className="u-center">
                    <span className={`material-symbols-outlined raw-negative raw-negative--${row.negative}`}>
                      {row.negative === 'negative' ? 'error' : row.negative === 'warning' ? 'warning' : 'check_circle'}
                    </span>
                  </td>
                  <td>
                    <span className={`raw-status-pill raw-status-pill--${row.statusTone}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="raw-table-footer">
          <div className="raw-table-footer__summary">
            Hiển thị <strong>1 - 50</strong> trên <strong>12,450</strong> bản ghi
          </div>

          <div className="raw-table-pagination">
            <button type="button">
              <span className="material-symbols-outlined">first_page</span>
            </button>
            <button type="button">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="raw-table-pages">
              <span className="raw-page-indicator raw-page-indicator--active">1</span>
              <span className="raw-page-indicator">2</span>
              <span className="raw-page-indicator">3</span>
              <span className="raw-page-ellipsis">...</span>
              <span className="raw-page-indicator">249</span>
            </div>
            <button type="button">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
            <button type="button">
              <span className="material-symbols-outlined">last_page</span>
            </button>
          </div>

          <div className="raw-table-footer__page-size">
            <span>Hàng trên trang:</span>
            <select defaultValue="50">
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
        </div>
      </section>
    </section>
  )
}

function SummaryCard({
  label,
  value,
  accent,
  icon,
  borderAccent,
}: {
  label: string
  value: string
  accent?: 'primary' | 'warning' | 'danger' | 'neutral'
  icon?: string
  borderAccent?: boolean
}) {
  return (
    <article className={`stat-card stat-card--raw${accent ? ` stat-card--${accent}` : ''}${borderAccent ? ' stat-card--border-accent' : ''}`}>
      <span>{label}</span>
      <div className={`stat-card__value-row stat-card__value-row--between${icon ? '' : ' stat-card__value-row--simple'}`}>
        <strong>{value}</strong>
        {icon ? (
          <span className="material-symbols-outlined stat-card__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
      </div>
    </article>
  )
}

function FilterControl({
  label,
  value,
  type,
  onChange,
  options = [],
  placeholder,
  icon,
}: {
  label: string
  value: string
  type: 'select' | 'text'
  onChange: (value: string) => void
  options?: Array<{ value: string; label: string }>
  placeholder?: string
  icon?: string
}) {
  return (
    <label className="field field--compact">
      <span>{label}</span>
      {type === 'select' ? (
        <div className="dashboard-tutor-select-wrap">
          <select className="dashboard-tutor-control dashboard-tutor-control--select raw-filter-control" value={value} onChange={(event) => onChange(event.target.value)}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined dashboard-tutor-select-icon" aria-hidden="true">
            keyboard_arrow_down
          </span>
        </div>
      ) : (
        <div className={`fake-select fake-select--control${icon ? ' fake-select--icon' : ''}`}>
          <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
          {icon ? (
            <span className="material-symbols-outlined" aria-hidden="true">
              {icon}
            </span>
          ) : null}
        </div>
      )}
    </label>
  )
}
