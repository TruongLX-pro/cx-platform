import { useState, type ReactNode } from 'react'
import { CustomSelect } from '../../components/CustomSelect'

type RawDataType = 'survey' | 'complaint' | 'bug'

type RawTableRow = {
  id: string
  dataType: Exclude<RawDataType, ''>
  source: string
  touchpoint: string
  surveyType?: string
  score?: string
  topic?: string
  issueContent?: string
  respondent: string
  relatedObject: string
  program: string
  product: string
  negative: 'positive' | 'warning' | 'negative'
  status: string
  statusTone: 'default' | 'warning'
  submittedAt: string
}

type RawFilters = {
  dataType: RawDataType
  sourceSystem: string
  period: string
  product: string
  program: string
  touchpoint: string
  respondentQuery: string
  negativeOnly: boolean
}

type RawColumn = {
  key: string
  header: string
  className?: string
  render: (row: RawTableRow) => ReactNode
}

const sampleProducts = ['Rino Edu', 'Rino Station', 'Rino Digi', 'Ieltspeed']

const samplePrograms = [
  'Tiếng Anh Cambridge',
  'Tiếng Anh IELTS',
  'Tiếng Anh Kindie Tutor',
  'Chương trình Toán tư duy Tutor',
  'Tiếng Anh Station',
  'Toán tư duy Station',
  'Tiếng Anh Digital Teacher',
]

const sampleTouchpoints = [
  'Sau buổi học thử',
  'Xác nhận lịch học',
  'Gia hạn khóa học',
  'Khu vực sảnh chờ & Check-in',
  'Tư vấn đầu vào',
  'Hỗ trợ kỹ thuật',
  'Chăm sóc sau bán',
]

const initialFilters: RawFilters = {
  dataType: 'survey',
  sourceSystem: 'all',
  period: '01/03/2026 - 31/03/2026',
  product: 'all',
  program: 'all',
  touchpoint: 'all',
  respondentQuery: '',
  negativeOnly: false,
}

const rawRows: RawTableRow[] = [
  {
    id: 'SR_20260324_0001',
    dataType: 'survey',
    source: 'Care',
    touchpoint: 'Sau buổi học thử',
    surveyType: 'CSAT',
    score: '4.8',
    respondent: 'Phụ huynh',
    relatedObject: 'Giáo viên: Trần Thị B',
    program: 'Tiếng Anh Cambridge',
    product: 'Rino Edu',
    negative: 'positive',
    status: 'Hoàn thành',
    statusTone: 'default',
    submittedAt: '24/03/2026 10:00',
  },
  {
    id: 'SR_20260324_0002',
    dataType: 'survey',
    source: 'Zalo ZNS',
    touchpoint: 'Xác nhận lịch học',
    surveyType: 'NPS',
    score: '4.1',
    respondent: 'Học sinh',
    relatedObject: 'Chương trình: Tiếng Anh IELTS',
    program: 'Tiếng Anh IELTS',
    product: 'Ieltspeed',
    negative: 'warning',
    status: 'Hoàn thành',
    statusTone: 'default',
    submittedAt: '24/03/2026 14:20',
  },
  {
    id: 'SR_20260324_0003',
    dataType: 'survey',
    source: 'Care',
    touchpoint: 'Gia hạn khóa học',
    surveyType: 'CES',
    score: '4.9',
    respondent: 'Phụ huynh',
    relatedObject: 'Chương trình: Tiếng Anh Kindie Tutor',
    program: 'Tiếng Anh Kindie Tutor',
    product: 'Rino Edu',
    negative: 'positive',
    status: 'Hoàn thành',
    statusTone: 'default',
    submittedAt: '24/03/2026 16:45',
  },
  {
    id: 'CC_20260325_0001',
    dataType: 'complaint',
    source: 'Ticket',
    touchpoint: 'Khu vực sảnh chờ & Check-in',
    topic: 'Thái độ tiếp đón',
    respondent: 'Phụ huynh',
    relatedObject: 'Cơ sở: Station Mỹ Đình',
    program: 'Tiếng Anh Station',
    product: 'Rino Station',
    negative: 'negative',
    status: 'Đang xử lý',
    statusTone: 'warning',
    submittedAt: '25/03/2026 11:00',
  },
  {
    id: 'CC_20260325_0002',
    dataType: 'complaint',
    source: 'Call center / Hotline',
    touchpoint: 'Tư vấn đầu vào',
    topic: 'Tư vấn chưa rõ ràng',
    respondent: 'Phụ huynh',
    relatedObject: 'Nhân viên: Hoàng Diệu L',
    program: 'Toán tư duy Station',
    product: 'Rino Station',
    negative: 'warning',
    status: 'Đang xử lý',
    statusTone: 'warning',
    submittedAt: '25/03/2026 15:30',
  },
  {
    id: 'BG_20260326_0001',
    dataType: 'bug',
    source: 'App',
    touchpoint: 'Hỗ trợ kỹ thuật',
    issueContent: 'Lỗi không vào được bài học',
    respondent: 'Học sinh',
    relatedObject: 'Tài khoản: DT_1024',
    program: 'Tiếng Anh Digital Teacher',
    product: 'Rino Digi',
    negative: 'negative',
    status: 'Mở mới',
    statusTone: 'warning',
    submittedAt: '26/03/2026 09:15',
  },
  {
    id: 'BG_20260326_0002',
    dataType: 'bug',
    source: 'Web',
    touchpoint: 'Hỗ trợ kỹ thuật',
    issueContent: 'Lỗi nộp bài không thành công',
    respondent: 'Phụ huynh',
    relatedObject: 'Tài khoản: WEB_7788',
    program: 'Tiếng Anh IELTS',
    product: 'Ieltspeed',
    negative: 'warning',
    status: 'Đang xác minh',
    statusTone: 'warning',
    submittedAt: '26/03/2026 17:40',
  },
]

export function RawDataPage() {
  const [filters, setFilters] = useState<RawFilters>(initialFilters)
  const [pageSize, setPageSize] = useState<'50' | '100' | '200'>('50')

  const updateFilter = <K extends keyof RawFilters>(key: K, value: RawFilters[K]) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const tableRows = rawRows.filter((row) => {
    if (row.dataType !== filters.dataType) return false
    if (filters.sourceSystem !== 'all' && row.source.toLowerCase() !== filters.sourceSystem) return false
    if (filters.product !== 'all' && row.product !== filters.product) return false
    if (filters.program !== 'all' && row.program !== filters.program) return false
    if (filters.touchpoint !== 'all' && row.touchpoint !== filters.touchpoint) return false
    if (filters.negativeOnly && row.negative === 'positive') return false
    if (
      filters.respondentQuery.trim() &&
      !`${row.respondent} ${row.relatedObject}`.toLowerCase().includes(filters.respondentQuery.trim().toLowerCase())
    ) {
      return false
    }

    return true
  })

  const columns = getColumnsByType(filters.dataType)
  const emptyColSpan = 2 + columns.length

  return (
    <section className="raw-data-page raw-data-page--stitch">
      <div className="page-header page-header--shell">
        <div>
          <h1>Dữ liệu phản hồi tập trung</h1>
          <p>Tra cứu, lọc và xuất dữ liệu khảo sát, khiếu nại và báo lỗi theo nhu cầu vận hành.</p>
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

      <section className="filter-card filter-card--shell raw-filter-shell">
        <div className="filter-grid raw-filter-grid">
          <FilterControl
            label="Loại dữ liệu"
            type="select"
            value={filters.dataType}
            onChange={(value) => updateFilter('dataType', value as RawDataType)}
            options={[
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
              { value: 'zalo zns', label: 'Zalo ZNS' },
              { value: 'ticket', label: 'Ticket' },
              { value: 'call center / hotline', label: 'Call center / Hotline' },
              { value: 'app', label: 'App' },
              { value: 'web', label: 'Web' },
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
            options={[{ value: 'all', label: 'Tất cả' }, ...sampleProducts.map((product) => ({ value: product, label: product }))]}
          />
          <FilterControl
            label="Chương trình"
            type="select"
            value={filters.program}
            onChange={(value) => updateFilter('program', value)}
            options={[{ value: 'all', label: 'Tất cả' }, ...samplePrograms.map((program) => ({ value: program, label: program }))]}
          />
          <FilterControl
            label="Điểm chạm"
            type="select"
            value={filters.touchpoint}
            onChange={(value) => updateFilter('touchpoint', value)}
            options={[{ value: 'all', label: 'Tất cả' }, ...sampleTouchpoints.map((touchpoint) => ({ value: touchpoint, label: touchpoint }))]}
          />
          <FilterControl
            label="Người phản hồi"
            type="text"
            value={filters.respondentQuery}
            onChange={(value) => updateFilter('respondentQuery', value)}
            placeholder="Tìm tên / đối tượng liên quan..."
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
              <span>Chỉ xem bản ghi có Negative Flag</span>
            </label>
            <button className="button button--text" type="button">
              <span className="material-symbols-outlined" aria-hidden="true">
                filter_list
              </span>
              Bộ lọc nâng cao
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
                  <input type="checkbox" aria-label="Chọn tất cả bản ghi" />
                </th>
                <th className="raw-record-col raw-sticky-col raw-sticky-col--record">Record ID</th>
                {columns.map((column) => (
                  <th key={column.key}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.length === 0 ? (
                <tr>
                  <td className="muted-text" colSpan={emptyColSpan}>
                    Không tìm thấy bản ghi phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                tableRows.map((row) => (
                  <tr key={row.id} className={row.negative === 'negative' ? 'raw-row--alert' : ''}>
                    <td className="raw-check-col raw-sticky-col raw-sticky-col--check">
                      <input type="checkbox" aria-label={`Chọn bản ghi ${row.id}`} />
                    </td>
                    <td className="code-cell raw-record-col raw-sticky-col raw-sticky-col--record">{row.id}</td>
                    {columns.map((column) => (
                      <td key={column.key} className={column.className}>
                        {column.render(row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="raw-table-footer">
          <div className="raw-table-footer__summary">
            Hiển thị <strong>{tableRows.length === 0 ? 0 : 1} - {tableRows.length}</strong> trên <strong>{tableRows.length}</strong> bản ghi
          </div>

          <div className="raw-table-pagination">
            <button type="button" aria-label="Trang đầu">
              <span className="material-symbols-outlined">first_page</span>
            </button>
            <button type="button" aria-label="Trang trước">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="raw-table-pages">
              <span className="raw-page-indicator raw-page-indicator--active">1</span>
              <span className="raw-page-indicator">2</span>
              <span className="raw-page-indicator">3</span>
              <span className="raw-page-ellipsis">...</span>
              <span className="raw-page-indicator">12</span>
            </div>
            <button type="button" aria-label="Trang sau">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
            <button type="button" aria-label="Trang cuối">
              <span className="material-symbols-outlined">last_page</span>
            </button>
          </div>

          <div className="raw-table-footer__page-size">
            <span>Hàng trên trang:</span>
            <CustomSelect
              className="raw-page-size-select"
              value={pageSize}
              onChange={setPageSize}
              options={[
                { value: '50', label: '50' },
                { value: '100', label: '100' },
                { value: '200', label: '200' },
              ]}
            />
          </div>
        </div>
      </section>
    </section>
  )
}

function getColumnsByType(dataType: RawDataType): RawColumn[] {
  if (dataType === 'survey') {
    return [
      { key: 'source', header: 'Nguồn', render: (row) => row.source },
      { key: 'touchpoint', header: 'Điểm chạm', render: (row) => row.touchpoint },
      { key: 'surveyType', header: 'Loại khảo sát', render: (row) => row.surveyType ?? '-' },
      { key: 'score', header: 'Điểm', className: 'raw-score-cell', render: (row) => row.score ?? '-' },
      { key: 'respondent', header: 'Người phản hồi', className: 'raw-respondent', render: (row) => row.respondent },
      { key: 'relatedObject', header: 'Đối tượng đánh giá', render: (row) => row.relatedObject },
      { key: 'program', header: 'Chương trình', render: (row) => row.program },
      { key: 'product', header: 'Sản phẩm', render: (row) => row.product },
      { key: 'negative', header: 'Negative', className: 'u-center', render: (row) => renderNegativeFlag(row.negative) },
      { key: 'submittedAt', header: 'Thời gian phản hồi', render: (row) => row.submittedAt },
    ]
  }

  if (dataType === 'complaint') {
    return [
      { key: 'source', header: 'Nguồn', render: (row) => row.source },
      { key: 'touchpoint', header: 'Điểm chạm', render: (row) => row.touchpoint },
      { key: 'topic', header: 'Chủ đề khiếu nại', className: 'raw-topic-cell', render: (row) => row.topic ?? '-' },
      { key: 'respondent', header: 'Người phản ánh', className: 'raw-respondent', render: (row) => row.respondent },
      { key: 'relatedObject', header: 'Đối tượng liên quan', render: (row) => row.relatedObject },
      { key: 'program', header: 'Chương trình', render: (row) => row.program },
      { key: 'product', header: 'Sản phẩm', render: (row) => row.product },
      { key: 'negative', header: 'Negative', className: 'u-center', render: (row) => renderNegativeFlag(row.negative) },
      { key: 'status', header: 'Trạng thái xử lý', render: (row) => renderStatus(row.status, row.statusTone) },
      { key: 'submittedAt', header: 'Thời gian ghi nhận', render: (row) => row.submittedAt },
    ]
  }

  return [
    { key: 'source', header: 'Nguồn', render: (row) => row.source },
    { key: 'touchpoint', header: 'Điểm chạm', render: (row) => row.touchpoint },
    { key: 'issueContent', header: 'Nội dung báo lỗi', className: 'raw-topic-cell', render: (row) => row.issueContent ?? '-' },
    { key: 'respondent', header: 'Người báo lỗi', className: 'raw-respondent', render: (row) => row.respondent },
    { key: 'relatedObject', header: 'Tài khoản / đối tượng liên quan', render: (row) => row.relatedObject },
    { key: 'program', header: 'Chương trình', render: (row) => row.program },
    { key: 'product', header: 'Sản phẩm', render: (row) => row.product },
    { key: 'status', header: 'Trạng thái xử lý', render: (row) => renderStatus(row.status, row.statusTone) },
    { key: 'submittedAt', header: 'Thời gian ghi nhận', render: (row) => row.submittedAt },
  ]
}

function renderNegativeFlag(tone: RawTableRow['negative']) {
  return (
    <span className={`material-symbols-outlined raw-negative raw-negative--${tone}`}>
      {tone === 'negative' ? 'error' : tone === 'warning' ? 'warning' : 'check_circle'}
    </span>
  )
}

function renderStatus(status: string, tone: RawTableRow['statusTone']) {
  return <span className={`raw-status-pill raw-status-pill--${tone}`}>{status}</span>
}

function FilterControl({
  label,
  value,
  type,
  onChange,
  options = [],
  placeholder,
  icon,
  error,
}: {
  label: string
  value: string
  type: 'select' | 'text'
  onChange: (value: string) => void
  options?: Array<{ value: string; label: string }>
  placeholder?: string
  icon?: string
  error?: string
}) {
  return (
    <label className="field field--compact">
      <span>{label}</span>
      {type === 'select' ? (
        <CustomSelect
          className="dashboard-tutor-select raw-filter-select"
          value={value}
          onChange={onChange}
          options={options}
        />
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
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  )
}
