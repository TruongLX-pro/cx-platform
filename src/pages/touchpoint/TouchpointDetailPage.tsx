import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StatusChip } from '../../components/StatusChip'
import { templateRecords } from '../../data/templateData'
import {
  getScreenName,
  recordTypeLabels,
  touchpointRecords,
  touchpointTypeLabels,
  upsertTouchpointRecord,
} from '../../data/touchpointData'
import type { TouchpointRecord } from '../../types'

export function TouchpointDetailPage() {
  const { touchpointId } = useParams()
  const resolvedTouchpoint = useMemo(
    () => touchpointRecords.find((record) => record.id === touchpointId) ?? touchpointRecords[0],
    [touchpointId],
  )
  const [touchpoint, setTouchpoint] = useState<TouchpointRecord>(resolvedTouchpoint)

  useEffect(() => {
    setTouchpoint(resolvedTouchpoint)
  }, [resolvedTouchpoint])

  return (
    <section className="touchpoint-page touchpoint-page--detail">
      <div className="warning-banner warning-banner--wide touchpoint-warning-banner">
        <span className="material-symbols-outlined warning-banner__icon">info</span>
        <span>
          Từ <strong>touchpoint_id</strong> có thể lần ra <strong>touchpoint_type</strong>, <strong>source_system</strong>, <strong>screen_code</strong> và <strong>screen_name</strong>. <strong>source_system</strong> là hệ thống phát sinh dữ liệu, còn <strong>screen_code / screen_name</strong> là màn hình nghiệp vụ gắn với touchpoint.
        </span>
      </div>

      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link to="/touchpoints">Điểm chạm</Link>
            <span>›</span>
            <span>Chi tiết điểm chạm</span>
          </div>
          <h1>{touchpoint.name}</h1>
          <p>
            {touchpoint.code} • {touchpoint.ownerTeam} • {touchpoint.touchpointType}
          </p>
        </div>
        <div className="page-header__actions">
          <Link className="button button--ghost" to={`/touchpoints/${touchpoint.id}/edit`}>
            <span className="material-symbols-outlined">edit</span>
            Chỉnh sửa
          </Link>
          <button
            className="button button--danger-ghost"
            type="button"
            onClick={handleDeactivate}
            disabled={touchpoint.status === 'Inactive'}
          >
            <span className="material-symbols-outlined">block</span>
            {touchpoint.status === 'Inactive' ? 'Đã ngừng sử dụng' : 'Ngừng sử dụng'}
          </button>
        </div>
      </div>

      <div className="stats-grid stats-grid--compact touchpoint-detail-stats-grid">
        <DetailStatCard label="Loại điểm chạm" value={touchpointTypeLabels[touchpoint.touchpointType]} />
        <DetailStatCard label="Bản ghi" value={recordTypeLabels[touchpoint.recordType]} />
        <DetailStatCard label="Hệ thống nguồn" value={touchpoint.sourceSystem} />
        <DetailStatCard label="Màn hình nghiệp vụ" value={getScreenName(touchpoint.screenCode)} />
      </div>

      <div className="detail-grid touchpoint-detail-grid">
        <div className="detail-column">
          <div className="form-card touchpoint-info-card">
            <div className="template-card-head">
              <h2>Thông tin điểm chạm</h2>
              <span className="section-chip">{touchpoint.status}</span>
            </div>

            <div className="touchpoint-info-grid">
              <InfoItem label="Mã điểm chạm" value={touchpoint.code} />
              <InfoItem label="Tên điểm chạm" value={touchpoint.name} />
              <InfoItem label="Loại điểm chạm" value={touchpointTypeLabels[touchpoint.touchpointType]} />
              <InfoItem label="Hệ thống nguồn" value={touchpoint.sourceSystem} />
              <InfoItem label="Sản phẩm" value={touchpoint.product} />
              <InfoItem label="Loại sản phẩm" value={touchpoint.productType} />
              <InfoItem label="Chương trình" value={touchpoint.program} />
              <InfoItem label="Đối tượng trả lời" value={touchpoint.respondentType} />
              <InfoItem label="Loại khảo sát" value={touchpoint.surveyType} />
              <InfoItem label="Trigger event" value={touchpoint.triggerEvent} />
              <InfoItem label="Mã màn hình" value={touchpoint.screenCode} />
              <InfoItem label="Tên màn hình" value={touchpoint.screenName} />
              <InfoItem label="Bản ghi dữ liệu" value={recordTypeLabels[touchpoint.recordType]} />
              <InfoItem label="Bộ phận phụ trách" value={touchpoint.ownerTeam} />
              <InfoItem label="Trạng thái" value={<StatusChip status={touchpoint.status} />} />
              <InfoItem
                label="Cập nhật gần nhất"
                value={
                  <>
                    {touchpoint.updatedAt}
                    <br />
                    <span className="muted-text">by {touchpoint.updatedBy}</span>
                  </>
                }
              />
            </div>
          </div>

          <div className="form-card info-box touchpoint-note-card">
            <div className="template-card-head">
              <h2>Ghi chú hệ thống</h2>
            </div>
            <ul>
              <li>`survey_feedback`, `complaint_case` và `issue_report` đều kế thừa `touchpoint_id`.</li>
              <li>Từ `touchpoint_id` có thể truy ra `touchpoint_type`, `source_system`, `screen_code` và `screen_name`.</li>
              <li>`screen_code / screen_name` là màn hình nghiệp vụ, không thay thế `source_system`.</li>
              <li>Complaint và support có thể không cần mapping template nếu chỉ dùng để ghi nhận.</li>
            </ul>
          </div>
        </div>

        <div className="detail-column detail-column--wide">
          <div className="form-card touchpoint-detail-section">
            <div className="section-header">
              <div>
                <h2>Template mapping</h2>
                <p>Các template đang được gắn với touchpoint này.</p>
              </div>
              <span className="section-chip">{touchpoint.templates.length} template</span>
            </div>

            {touchpoint.templates.length > 0 ? (
              <table className="data-table touchpoint-mapping-table">
                <thead>
                  <tr>
                    <th>Template</th>
                    <th>Loại</th>
                    <th>Mặc định</th>
                    <th>Thứ tự</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {touchpoint.templates.map((mapping) => {
                    const template = templateRecords.find((item) => item.id === mapping.templateId)

                    return (
                      <tr key={mapping.templateId}>
                        <td>
                          <div className="stacked">
                            <Link className="touchpoint-link" to={`/templates/${mapping.templateId}`}>
                              {mapping.templateCode}
                            </Link>
                            <span className="muted-text">{mapping.templateName}</span>
                          </div>
                        </td>
                        <td>
                          <div className="stacked">
                            <span>{template?.surveyType ?? 'Không xác định'}</span>
                            <span className="muted-text">
                              {template ? (template.objectMode === 'multi' ? 'Multi-object' : 'Single-object') : 'Không xác định'}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className={mapping.isDefault ? 'touchpoint-badge touchpoint-badge--default' : 'touchpoint-badge'}>
                            {mapping.isDefault ? 'Mặc định' : 'Phụ'}
                          </span>
                        </td>
                        <td>{mapping.displayOrder}</td>
                        <td>
                          <StatusChip status={mapping.status} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div className="inline-note inline-note--soft touchpoint-empty-note">
                Touchpoint này chưa gắn template. Nếu là complaint/support, đây có thể là trạng thái hợp lệ trong giai đoạn đầu.
              </div>
            )}
          </div>

          <div className="form-card info-box touchpoint-note-card">
            <div className="template-card-head">
              <h2>Nguyên tắc dữ liệu</h2>
            </div>
            <ul>
              <li>`product / program / source_system` là lớp ngữ cảnh phát sinh phản hồi.</li>
              <li>`screen_code / screen_name` mô tả màn hình nghiệp vụ chuẩn hóa.</li>
              <li>`touchpoint_type` dùng để phân loại luồng dữ liệu: survey, complaint hoặc support.</li>
              <li>Module Data sẽ đọc `touchpoint_id` để dựng `survey_feedback`, `complaint_case` và `issue_report`.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )

  function handleDeactivate() {
    if (touchpoint.status === 'Inactive') {
      return
    }

    const confirmed = window.confirm(
      `Ngừng sử dụng điểm chạm "${touchpoint.name}"? Touchpoint sẽ được chuyển sang trạng thái Inactive.`,
    )

    if (!confirmed) {
      return
    }

    const nextRecord: TouchpointRecord = {
      ...touchpoint,
      status: 'Inactive',
      updatedAt: formatToday(),
      updatedBy: 'Codex',
    }

    upsertTouchpointRecord(nextRecord)
    setTouchpoint(nextRecord)
  }
}

function InfoItem({
  label,
  value,
}: {
  label: string
  value: string | ReactNode
}) {
  return (
    <div className="touchpoint-info-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function DetailStatCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="stat-card touchpoint-detail-stat-card">
      <span>{label}</span>
      <div className="touchpoint-detail-stat-card__value">{value}</div>
    </article>
  )
}

function formatToday() {
  return new Intl.DateTimeFormat('en-GB').format(new Date())
}
