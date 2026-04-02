import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CustomSelect } from '../../components/CustomSelect'
import { StatusChip } from '../../components/StatusChip'
import {
  productOptions,
  programOptions,
  respondentOptions,
  sourceSystemOptions,
  touchpointRecords,
  touchpointScreenOptions,
  touchpointStatusOptions,
  touchpointSummaryMetrics,
  touchpointTypeLabels,
  touchpointTypeOptions,
} from '../../data/touchpointData'
import type { TouchpointRecord, TouchpointStatus, TouchpointType } from '../../types'

export function TouchpointListPage() {
  const [keyword, setKeyword] = useState('')
  const [touchpointType, setTouchpointType] = useState<'all' | TouchpointType>('all')
  const [sourceSystem, setSourceSystem] = useState<'all' | string>('all')
  const [product, setProduct] = useState<'all' | string>('all')
  const [program, setProgram] = useState<'all' | string>('all')
  const [screenCode, setScreenCode] = useState<'all' | string>('all')
  const [respondentType, setRespondentType] = useState<'all' | string>('all')
  const [status, setStatus] = useState<'all' | TouchpointStatus>('all')

  const filteredTouchpoints = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()

    return touchpointRecords.filter((touchpoint) => {
      const matchesKeyword =
        !normalizedKeyword ||
        [
          touchpoint.code,
          touchpoint.name,
          touchpoint.sourceSystem,
          touchpoint.product,
          touchpoint.program,
          touchpoint.screenCode,
          touchpoint.screenName,
        ].some((value) => value.toLowerCase().includes(normalizedKeyword))

      return (
        matchesKeyword &&
        (touchpointType === 'all' || touchpoint.touchpointType === touchpointType) &&
        (sourceSystem === 'all' || touchpoint.sourceSystem === sourceSystem) &&
        (product === 'all' || touchpoint.product === product) &&
        (program === 'all' || touchpoint.program === program) &&
        (screenCode === 'all' || touchpoint.screenCode === screenCode) &&
        (respondentType === 'all' || touchpoint.respondentType === respondentType) &&
        (status === 'all' || touchpoint.status === status)
      )
    })
  }, [keyword, touchpointType, sourceSystem, product, program, screenCode, respondentType, status])

  return (
    <section className="touchpoint-page touchpoint-page--list">
      <div className="page-header">
        <div>
          <h1>Danh sách điểm chạm</h1>
          <p>
            Quản lý ngữ cảnh phát sinh phản hồi, màn hình nghiệp vụ và các template đang map với
            từng điểm chạm.
          </p>
        </div>
        <div className="page-header__actions">
          <Link className="button button--primary" to="/touchpoints/new">
            <span className="material-symbols-outlined">add</span>
            Tạo điểm chạm mới
          </Link>
        </div>
      </div>

      <div className="stats-grid stats-grid--compact touchpoint-stats-grid">
        <StatCard label="Tổng điểm chạm" value={touchpointSummaryMetrics.total} suffix="điểm" />
        <StatCard label="Survey" value={touchpointSummaryMetrics.survey} hint="survey_feedback" />
        <StatCard label="Complaint" value={touchpointSummaryMetrics.complaint} hint="complaint_case" />
        <StatCard label="Support" value={touchpointSummaryMetrics.support} hint="issue_report" accent="warning" />
        <StatCard label="Đang hoạt động" value={touchpointSummaryMetrics.active} hint="Active" />
      </div>

      <div className="filter-card touchpoint-filter-card">
        <div className="template-search-field touchpoint-search-field">
          <span className="material-symbols-outlined">search</span>
          <input
            placeholder="Tìm theo mã, tên, màn hình hoặc nguồn..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>

        <div className="filter-grid touchpoint-filter-grid">
          <FilterSelect
            label="Loại điểm chạm"
            value={touchpointType}
            onChange={setTouchpointType}
            options={touchpointTypeOptions}
            formatOption={(item) => touchpointTypeLabels[item]}
          />
          <FilterSelect label="Hệ thống nguồn" value={sourceSystem} onChange={setSourceSystem} options={sourceSystemOptions} />
          <FilterSelect label="Sản phẩm" value={product} onChange={setProduct} options={productOptions} />
          <FilterSelect label="Chương trình" value={program} onChange={setProgram} options={programOptions} />
          <FilterSelect label="Đối tượng" value={respondentType} onChange={setRespondentType} options={respondentOptions} />
          <FilterSelect
            label="Màn hình"
            value={screenCode}
            onChange={setScreenCode}
            options={touchpointScreenOptions.map((option) => option.code)}
            formatOption={(item) =>
              touchpointScreenOptions.find((option) => option.code === item)?.name ?? item
            }
          />
          <FilterSelect label="Trạng thái" value={status} onChange={setStatus} options={touchpointStatusOptions} />
        </div>
      </div>

      <div className="table-card touchpoint-table-card">
        <table className="data-table data-table--touchpoint-list">
          <thead>
            <tr>
              <th>Điểm chạm</th>
              <th>Loại</th>
              <th>Nguồn</th>
              <th>Sản phẩm / Chương trình</th>
              <th>Màn hình</th>
              <th>Template map</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredTouchpoints.length > 0 ? (
              filteredTouchpoints.map((touchpoint) => (
                <TouchpointRow key={touchpoint.id} touchpoint={touchpoint} />
              ))
            ) : (
              <tr>
                <td className="muted-text" colSpan={8}>
                  Không tìm thấy điểm chạm phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>
          Hiển thị 1 - {filteredTouchpoints.length} của {touchpointRecords.length} điểm chạm
        </span>
        <div className="pagination">
          <button className="pagination__button" type="button">
            1
          </button>
          <button className="pagination__button pagination__button--ghost" type="button">
            2
          </button>
          <button className="pagination__button pagination__button--ghost" type="button">
            3
          </button>
        </div>
      </div>
    </section>
  )
}

function TouchpointRow({ touchpoint }: { touchpoint: TouchpointRecord }) {
  return (
    <tr>
      <td className="touchpoint-name-cell">
        <div className="stacked">
          <strong className="touchpoint-table__title">{touchpoint.name}</strong>
          <span className="code-cell">{touchpoint.code}</span>
        </div>
      </td>
      <td>
        <div className="stacked">
          <span className={`touchpoint-pill touchpoint-pill--${touchpoint.touchpointType}`}>
            {touchpointTypeLabels[touchpoint.touchpointType]}
          </span>
          <span className="muted-text">{touchpoint.respondentType}</span>
        </div>
      </td>
      <td>{touchpoint.sourceSystem}</td>
      <td>
        <div className="stacked">
          <span>{touchpoint.product}</span>
          <span className="muted-text">{touchpoint.program}</span>
        </div>
      </td>
      <td>
        <div className="stacked">
          <span className="code-cell">{touchpoint.screenCode}</span>
          <span className="muted-text">{touchpoint.screenName}</span>
        </div>
      </td>
      <td>
        <Link className="usage-button usage-button--touchpoint" to={`/touchpoints/${touchpoint.id}`}>
          {touchpoint.templates.length > 0 ? `${touchpoint.templates.length} template` : 'Chưa map'}
        </Link>
      </td>
      <td>
        <StatusChip status={touchpoint.status} />
      </td>
      <td>
        <div className="row-actions-icons row-actions-icons--touchpoint">
          <Link className="icon-link" to={`/touchpoints/${touchpoint.id}`} aria-label="Xem">
            <span className="material-symbols-outlined">visibility</span>
          </Link>
          <Link className="icon-link" to={`/touchpoints/${touchpoint.id}/edit`} aria-label="Chỉnh sửa">
            <span className="material-symbols-outlined">edit</span>
          </Link>
          <button className="icon-link" type="button" aria-label="Nhân bản">
            <span className="material-symbols-outlined">content_copy</span>
          </button>
        </div>
      </td>
    </tr>
  )
}

function StatCard({
  label,
  value,
  suffix,
  hint,
  accent,
}: {
  label: string
  value: number
  suffix?: string
  hint?: string
  accent?: 'warning'
}) {
  return (
    <article className={`stat-card template-stat-card${accent ? ` stat-card--${accent}` : ''}`}>
      <span>{label}</span>
      <div className="stat-card__value-row">
        <strong>{value}</strong>
        {suffix ? <small>{suffix}</small> : null}
      </div>
      {hint ? <em>{hint}</em> : null}
    </article>
  )
}

function FilterSelect<T extends string>({
  label,
  value,
  onChange,
  options,
  formatOption,
}: {
  label: string
  value: 'all' | T
  onChange: (value: 'all' | T) => void
  options: readonly T[] | string[]
  formatOption?: (value: T) => string
}) {
  return (
    <label className="field field--compact">
      <span>{label}</span>
      <CustomSelect
        value={value}
        onChange={onChange}
        options={[
          { value: 'all' as 'all' | T, label: 'Tất cả' },
          ...options.map((item) => ({
            value: item as 'all' | T,
            label: formatOption ? formatOption(item as T) : String(item),
          })),
        ]}
      />
    </label>
  )
}
