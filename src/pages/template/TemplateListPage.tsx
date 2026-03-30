import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DeactivateModal } from '../../components/DeactivateModal'
import { StatusChip } from '../../components/StatusChip'
import { TouchpointUsageDrawer } from '../../components/TouchpointUsageDrawer'
import { summaryMetrics, templateRecords } from '../../data/templateData'
import type { TemplateRecord } from '../../types'

export function TemplateListPage() {
  const [selectedUsageTemplate, setSelectedUsageTemplate] = useState<TemplateRecord | null>(null)
  const [selectedDeactivateTemplate, setSelectedDeactivateTemplate] =
    useState<TemplateRecord | null>(null)

  const activeCount = useMemo(
    () => templateRecords.filter((item) => item.status === 'Đang hoạt động').length,
    [],
  )

  return (
    <section className="template-page">
      <div className="page-header">
        <div>
          <h1>Danh sách template khảo sát</h1>
          <p>Quản lý tập trung các mẫu khảo sát dùng chung cho nhiều điểm chạm trong hệ thống.</p>
        </div>
        <div className="page-header__actions">
          <Link className="button button--primary" to="/templates/new">
            + Tạo template mới
          </Link>
        </div>
      </div>

      <div className="stats-grid stats-grid--compact">
        <StatCard label="Tổng template" value={summaryMetrics.total} suffix="mẫu" />
        <StatCard label="Đang hoạt động" value={activeCount} hint="ACTIVE" />
        <StatCard label="Bản nháp" value={summaryMetrics.draft} hint="DRAFT" />
        <StatCard label="Multi-object" value={summaryMetrics.multiObject} hint="MULTI" accent="warning" />
      </div>

      <div className="filter-card filter-card--template">
        <div className="filter-card__search">
          <input placeholder="Tìm theo mã hoặc tên template..." />
        </div>
        <div className="filter-grid filter-grid--five">
          <SelectField label="Loại khảo sát" value="Tất cả" />
          <SelectField label="Đối tượng trả lời" value="Tất cả" />
          <SelectField label="Chế độ object" value="Tất cả" />
          <SelectField label="Trạng thái" value="Tất cả" />
          <SelectField label="Bộ phận phụ trách" value="Tất cả" />
        </div>
      </div>

      <div className="table-card">
        <table className="data-table data-table--template-list">
          <thead>
            <tr>
              <th>Mã template</th>
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
            {templateRecords.map((template) => (
              <tr key={template.id}>
                <td className="template-name-cell">
                  <div className="code-cell">{template.code}</div>
                  <div className="template-name-cell__title">{template.name}</div>
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
                      {template.objects.length}
                      {template.objects.length > 1 ? ' object' : ' object'}
                    </span>
                  </div>
                </td>
                <td>
                  <StatusChip status={template.status} />
                </td>
                <td>{template.ownerTeam}</td>
                <td>
                  <button
                    className={`usage-button${template.touchpoints.length === 0 ? ' usage-button--empty' : ''}`}
                    type="button"
                    onClick={() =>
                      template.touchpoints.length > 0 && setSelectedUsageTemplate(template)
                    }
                  >
                    {template.touchpoints.length > 0
                      ? `${template.touchpoints.length} điểm chạm`
                      : 'Chưa sử dụng'}
                  </button>
                </td>
                <td>
                  <div className="stacked">
                    <span>{template.updatedAt}</span>
                    <span className="muted-text">by {template.updatedBy}</span>
                  </div>
                </td>
                <td>
                  <div className="row-actions-icons">
                    <Link className="icon-link" to={`/templates/${template.id}`} aria-label="View">
                      ∘
                    </Link>
                    <Link className="icon-link" to={`/templates/${template.id}/edit`} aria-label="Edit">
                      /
                    </Link>
                    <button className="icon-link" type="button" aria-label="Duplicate">
                      +
                    </button>
                    {template.status === 'Đang hoạt động' ? (
                      <button
                        className="icon-link icon-link--danger"
                        type="button"
                        onClick={() => setSelectedDeactivateTemplate(template)}
                        aria-label="Deactivate"
                      >
                        −
                      </button>
                    ) : (
                      <button className="icon-link icon-link--positive" type="button" aria-label="Activate">
                        ▶
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>Hiển thị 1 - 4 của 45 template</span>
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
    <article className={`stat-card${accent ? ` stat-card--${accent}` : ''}`}>
      <span>{label}</span>
      <div className="stat-card__value-row">
        <strong>{value}</strong>
        {suffix ? <small>{suffix}</small> : null}
      </div>
      {hint ? <em>{hint}</em> : null}
    </article>
  )
}

function SelectField({ label, value }: { label: string; value: string }) {
  return (
    <label className="field field--compact">
      <span>{label}</span>
      <div className="fake-select">{value}</div>
    </label>
  )
}
