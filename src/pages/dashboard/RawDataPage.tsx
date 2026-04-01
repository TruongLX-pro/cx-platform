import { useState } from 'react'
import { CustomSelect } from '../../components/CustomSelect'

type RawTableRow = {
  id: string
  type: 'Khảo sát' | 'Khiếu nại' | 'Báo lỗi'
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
  touchpoint: string
  respondentQuery: string
  negativeOnly: boolean
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
  dataType: 'all',
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
    type: 'Khảo sát',
    source: 'Care',
    touchpoint: 'Sau buổi học thử',
    scoreOrTopic: '4.8',
    respondent: 'Phụ huynh',
    relatedObject: 'Giáo viên: Trần Thị B',
    program: 'Tiếng Anh Cambridge',
    product: 'Rino Edu',
    negative: 'positive',
    status: 'Hoàn thành',
    statusTone: 'default',
  },
  {
    id: 'SR_20260324_0002',
    type: 'Khảo sát',
    source: 'Zalo',
    touchpoint: 'Xác nhận lịch học',
    scoreOrTopic: '4.1',
    respondent: 'Học sinh',
    relatedObject: 'Chương trình: Tiếng Anh IELTS',
    program: 'Tiếng Anh IELTS',
    product: 'Ieltspeed',
    negative: 'warning',
    status: 'Hoàn thành',
    statusTone: 'default',
  },
  {
    id: 'SR_20260324_0003',
    type: 'Khảo sát',
    source: 'Care',
    touchpoint: 'Gia hạn khóa học',
    scoreOrTopic: '4.9',
    respondent: 'Phụ huynh',
    relatedObject: 'Chương trình: Tiếng Anh Kindie Tutor',
    program: 'Tiếng Anh Kindie Tutor',
    product: 'Rino Edu',
    negative: 'positive',
    status: 'Hoàn thành',
    statusTone: 'default',
  },
  {
    id: 'CC_20260325_0001',
    type: 'Khiếu nại',
    source: 'Ticket',
    touchpoint: 'Khu vực sảnh chờ & Check-in',
    scoreOrTopic: 'Thái độ tiếp đón',
    respondent: 'Phụ huynh',
    relatedObject: 'Cơ sở: Station Mỹ Đình',
    program: 'Tiếng Anh Station',
    product: 'Rino Station',
    negative: 'negative',
    status: 'Đang xử lý',
    statusTone: 'warning',
  },
  {
    id: 'CC_20260325_0002',
    type: 'Khiếu nại',
    source: 'Ticket',
    touchpoint: 'Tư vấn đầu vào',
    scoreOrTopic: 'Tư vấn chưa rõ ràng',
    respondent: 'Phụ huynh',
    relatedObject: 'Nhân viên: Hoàng Diệu L',
    program: 'Toán tư duy Station',
    product: 'Rino Station',
    negative: 'warning',
    status: 'Đang xử lý',
    statusTone: 'warning',
  },
  {
    id: 'SR_20260324_0004',
    type: 'Khảo sát',
    source: 'Care',
    touchpoint: 'Hỗ trợ kỹ thuật',
    scoreOrTopic: '4.6',
    respondent: 'Giáo viên',
    relatedObject: 'Lớp: Digital Teacher 01',
    program: 'Tiếng Anh Digital Teacher',
    product: 'Rino Digi',
    negative: 'positive',
    status: 'Hoàn thành',
    statusTone: 'default',
  },
  {
    id: 'BG_20260326_0001',
    type: 'Báo lỗi',
    source: 'Ticket',
    touchpoint: 'Hỗ trợ kỹ thuật',
    scoreOrTopic: 'Lỗi không vào được bài học',
    respondent: 'Học sinh',
    relatedObject: 'Tài khoản: DT_1024',
    program: 'Tiếng Anh Digital Teacher',
    product: 'Rino Digi',
    negative: 'negative',
    status: 'Mở mới',
    statusTone: 'warning',
  },
  {
    id: 'CC_20260326_0002',
    type: 'Khiếu nại',
    source: 'Zalo',
    touchpoint: 'Chăm sóc sau bán',
    scoreOrTopic: 'Chậm phản hồi',
    respondent: 'Phụ huynh',
    relatedObject: 'CSKH: Hoàng Minh A',
    program: 'Tiếng Anh Cambridge',
    product: 'Rino Edu',
    negative: 'negative',
    status: 'Đang xử lý',
    statusTone: 'warning',
  },
]

export function RawDataPage() {
  const [filters, setFilters] = useState<RawFilters>(initialFilters)
  const [pageSize, setPageSize] = useState<'50' | '100' | '200'>('50')

  const updateFilter = <K extends keyof RawFilters>(key: K, value: RawFilters[K]) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const tableRows = rawRows.filter((row) => {
    if (filters.dataType !== 'all' && row.type !== labelForType(filters.dataType)) return false
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
                <th>Loại</th>
                <th>Nguồn</th>
                <th>Điểm chạm</th>
                <th>Điểm / Chủ đề</th>
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
                <tr key={row.id} className={row.type !== 'Khảo sát' ? 'raw-row--alert' : ''}>
                  <td className="raw-check-col raw-sticky-col raw-sticky-col--check">
                    <input type="checkbox" aria-label={`Chọn bản ghi ${row.id}`} />
                  </td>
                  <td className="code-cell raw-record-col raw-sticky-col raw-sticky-col--record">{row.id}</td>
                  <td>
                    <span
                      className={`survey-pill${
                        row.type === 'Khiếu nại' || row.type === 'Báo lỗi' ? ' survey-pill--danger' : ''
                      }`}
                    >
                      {row.type}
                    </span>
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

function labelForType(type: string) {
  if (type === 'survey') return 'Khảo sát'
  if (type === 'complaint') return 'Khiếu nại'
  if (type === 'bug') return 'Báo lỗi'
  return type
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
    </label>
  )
}
