import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CustomSelect } from '../../components/CustomSelect'
import { DeactivateModal } from '../../components/DeactivateModal'
import { StatusChip } from '../../components/StatusChip'
import { TouchpointUsageDrawer } from '../../components/TouchpointUsageDrawer'
import {
  objectModeOptions,
  ownerTeamOptions,
  summaryMetrics,
  respondentOptions,
  surveyTypeOptions,
  templateRecords,
  templateStatusOptions,
  upsertTemplateRecord,
} from '../../data/templateData'
import { getTouchpointsUsingTemplate } from '../../data/touchpointData'
import type {
  ObjectMode,
  RespondentType,
  SurveyType,
  TemplateRecord,
  TemplateStatus,
} from '../../types'

export function TemplateListPage() {
  const [keyword, setKeyword] = useState('')
  const [surveyType, setSurveyType] = useState<'all' | SurveyType>('all')
  const [respondentType, setRespondentType] = useState<'all' | RespondentType>('all')
  const [objectMode, setObjectMode] = useState<'all' | ObjectMode>('all')
  const [status, setStatus] = useState<'all' | TemplateStatus>('all')
  const [ownerTeam, setOwnerTeam] = useState<'all' | string>('all')
  const [selectedUsageTemplate, setSelectedUsageTemplate] = useState<TemplateRecord | null>(null)
  const [selectedDeactivateTemplate, setSelectedDeactivateTemplate] = useState<TemplateRecord | null>(null)

  const filteredTemplates = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()

    return templateRecords.filter((template) => {
      const matchesKeyword =
        !normalizedKeyword ||
        [template.code, template.name, template.goal].some((value) =>
          value.toLowerCase().includes(normalizedKeyword),
        )

      return (
        matchesKeyword &&
        (surveyType === 'all' || template.surveyType === surveyType) &&
        (respondentType === 'all' || template.respondentType === respondentType) &&
        (objectMode === 'all' || template.objectMode === objectMode) &&
        (status === 'all' || template.status === status) &&
        (ownerTeam === 'all' || template.ownerTeam === ownerTeam)
      )
    })
  }, [keyword, objectMode, ownerTeam, respondentType, status, surveyType])

  const activeCount = useMemo(
    () => templateRecords.filter((item) => item.status === 'Đang hoạt động').length,
    [],
  )
  const templateUsageMap = useMemo(
    () =>
      Object.fromEntries(
        templateRecords.map((template) => [template.id, getTouchpointsUsingTemplate(template.id)]),
      ),
    [],
  )

  return (
    <section className="template-page template-page--list">
      <div className="page-header">
        <div>
          <h1>Danh sách template khảo sát</h1>
          <p>
            Quản lý tập trung các mẫu khảo sát dùng chung cho nhiều điểm chạm trong toàn hệ
            thống CX Platform.
          </p>
        </div>
        <div className="page-header__actions">
          <Link className="button button--primary" to="/templates/new">
            <span className="material-symbols-outlined">add</span>
            Tạo template mới
          </Link>
        </div>
      </div>

      <div className="stats-grid stats-grid--compact template-stats-grid">
        <StatCard label="Tổng template" value={summaryMetrics.total} suffix="mẫu" />
        <StatCard label="Đang hoạt động" value={activeCount} hint="Active" />
        <StatCard label="Bản nháp" value={summaryMetrics.draft} hint="Draft" />
        <StatCard label="Multi-object" value={summaryMetrics.multiObject} hint="Multi" accent="warning" />
      </div>

      <div className="filter-card filter-card--template">
        <div className="template-search-field">
          <span className="material-symbols-outlined">search</span>
          <input
            placeholder="Tìm theo mã hoặc tên template..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>

        <div className="filter-grid filter-grid--five">
          <FilterSelect label="Loại khảo sát" value={surveyType} onChange={setSurveyType} options={surveyTypeOptions} />
          <FilterSelect
            label="Đối tượng trả lời"
            value={respondentType}
            onChange={setRespondentType}
            options={respondentOptions}
          />
          <FilterSelect label="Chế độ object" value={objectMode} onChange={setObjectMode} options={objectModeOptions} />
          <FilterSelect label="Trạng thái" value={status} onChange={setStatus} options={templateStatusOptions} />
          <FilterSelect label="Bộ phận phụ trách" value={ownerTeam} onChange={setOwnerTeam} options={ownerTeamOptions} />
        </div>
      </div>

      <div className="table-card template-table-card">
        <table className="data-table data-table--template-list">
          <thead>
            <tr>
              <th>Mẫu khảo sát</th>
              <th>Loại / Mục tiêu</th>
              <th>Đối tượng</th>
              <th>Chế độ / Số object</th>
              <th>Trạng thái</th>
              <th>Bộ phận</th>
              <th>Điểm chạm</th>
              <th>Cập nhật</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredTemplates.map((template) => {
              const touchpoints = templateUsageMap[template.id] ?? []

              return (
                <tr key={template.id}>
                  <td className="template-name-cell">
                    <div className="template-name-cell__title">{template.name}</div>
                    <div className="code-cell">{template.code}</div>
                  </td>
                  <td>
                    <div className="stacked">
                      <span className="survey-pill">{template.surveyType}</span>
                      <span className="muted-text">{template.goal}</span>
                    </div>
                  </td>
                  <td>{template.respondentType}</td>
                  <td>
                    <div className="stacked">
                      <span className={`mode-pill mode-pill--${template.objectMode}`}>
                        {template.objectMode === 'multi' ? 'Multi-object' : 'Single-object'}
                      </span>
                      <span className="muted-text">
                        {template.objects.length} object
                      </span>
                    </div>
                  </td>
                  <td>
                    <StatusChip status={template.status} />
                  </td>
                  <td>{template.ownerTeam}</td>
                  <td>
                    <button
                      className={`usage-button${touchpoints.length === 0 ? ' usage-button--empty' : ''}`}
                      type="button"
                      onClick={() => touchpoints.length > 0 && setSelectedUsageTemplate(template)}
                    >
                      {touchpoints.length > 0 ? `${touchpoints.length} điểm chạm` : 'Chưa sử dụng'}
                    </button>
                  </td>
                  <td>
                    <div className="stacked">
                      <span>{template.updatedAt}</span>
                      <span className="muted-text">by {template.updatedBy}</span>
                    </div>
                  </td>
                  <td>
                    <div className="row-actions-icons row-actions-icons--template">
                      <Link className="icon-link" to={`/templates/${template.id}`} aria-label="Xem">
                        <span className="material-symbols-outlined">visibility</span>
                      </Link>
                      <Link className="icon-link" to={`/templates/${template.id}/edit`} aria-label="Chỉnh sửa">
                        <span className="material-symbols-outlined">edit</span>
                      </Link>
                      <button className="icon-link" type="button" aria-label="Nhân bản">
                        <span className="material-symbols-outlined">content_copy</span>
                      </button>
                      {template.status === 'Đang hoạt động' ? (
                        <button
                          className="icon-link icon-link--danger"
                          type="button"
                          onClick={() => setSelectedDeactivateTemplate(template)}
                          aria-label="Ngừng sử dụng"
                        >
                          <span className="material-symbols-outlined">block</span>
                        </button>
                      ) : (
                        <button className="icon-link icon-link--positive" type="button" aria-label="Kích hoạt">
                          <span className="material-symbols-outlined">play_arrow</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>
          Hiển thị 1 - {filteredTemplates.length} của {templateRecords.length} template
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

      <TouchpointUsageDrawer
        onClose={() => setSelectedUsageTemplate(null)}
        template={selectedUsageTemplate}
      />
      <DeactivateModal
        onClose={() => setSelectedDeactivateTemplate(null)}
        onConfirm={() => {
          if (!selectedDeactivateTemplate) return

          upsertTemplateRecord({
            ...selectedDeactivateTemplate,
            status: 'Ngừng sử dụng',
            updatedAt: new Intl.DateTimeFormat('en-GB').format(new Date()),
            updatedBy: 'Codex',
          })
          setSelectedDeactivateTemplate(null)
        }}
        template={selectedDeactivateTemplate}
      />
    </section>
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
}: {
  label: string
  value: 'all' | T
  onChange: (value: 'all' | T) => void
  options: readonly T[] | string[]
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
            label:
              item === 'multi'
                ? 'Multi-object'
                : item === 'single'
                  ? 'Single-object'
                  : String(item),
          })),
        ]}
      />
    </label>
  )
}
