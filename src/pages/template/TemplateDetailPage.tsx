import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DeactivateModal } from '../../components/DeactivateModal'
import { StatusChip } from '../../components/StatusChip'
import { TouchpointUsageDrawer } from '../../components/TouchpointUsageDrawer'
import { templateRecords } from '../../data/templateData'

export function TemplateDetailPage() {
  const { templateId } = useParams()
  const template = useMemo(
    () => templateRecords.find((record) => record.id === templateId) ?? templateRecords[0],
    [templateId],
  )
  const [showUsageDrawer, setShowUsageDrawer] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)

  return (
    <section className="template-detail-page template-page--detail">
      {template.touchpoints.length > 0 ? (
        <div className="warning-banner warning-banner--wide">
          <span className="material-symbols-outlined warning-banner__icon">warning</span>
          <span>
            Template này hiện đang được sử dụng tại {template.touchpoints.length} điểm chạm. Hãy
            kiểm tra ảnh hưởng trước khi chỉnh sửa hoặc ngừng sử dụng.
          </span>
        </div>
      ) : null}

      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link to="/templates">Template khảo sát</Link>
            <span>›</span>
            <span>Chi tiết template</span>
          </div>
          <h1>{template.name}</h1>
        </div>
        <div className="page-header__actions">
          <Link className="button button--ghost" to={`/templates/${template.id}/edit`}>
            <span className="material-symbols-outlined">edit</span>
            Chỉnh sửa template
          </Link>
          <button
            className="button button--danger-ghost"
            type="button"
            onClick={() => setShowDeactivateModal(true)}
          >
            <span className="material-symbols-outlined">block</span>
            Ngừng sử dụng
          </button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-column">
          <div className="form-card template-info-card">
            <div className="template-card-head">
              <h2>Thông tin template</h2>
              <span className="section-chip">{template.version}</span>
            </div>

            <dl className="detail-list detail-list--stacked">
              <div>
                <dt>Mã template</dt>
                <dd>{template.code}</dd>
              </div>
              <div>
                <dt>Version</dt>
                <dd>{template.version}</dd>
              </div>
              <div>
                <dt>Loại khảo sát</dt>
                <dd>{template.surveyType}</dd>
              </div>
              <div>
                <dt>Trạng thái</dt>
                <dd>
                  <StatusChip status={template.status} />
                </dd>
              </div>
              <div>
                <dt>Đối tượng trả lời</dt>
                <dd>{template.respondentType}</dd>
              </div>
              <div>
                <dt>Chế độ object</dt>
                <dd>{template.objectMode === 'multi' ? 'Multi-object' : 'Single-object'}</dd>
              </div>
              <div>
                <dt>Mục tiêu khảo sát</dt>
                <dd>{template.goal}</dd>
              </div>
              <div>
                <dt>Bộ phận phụ trách</dt>
                <dd>{template.ownerTeam}</dd>
              </div>
              <div>
                <dt>Cập nhật gần nhất</dt>
                <dd>
                  {template.updatedAt}
                  <br />
                  <span className="muted-text">by {template.updatedBy}</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="form-card info-box template-note-card">
            <div className="template-card-head">
              <h2>Lưu ý hệ thống</h2>
            </div>
            <ul>
              <li>Template quản lý nội dung khảo sát, không quản lý context nghiệp vụ.</li>
              <li>Product, Program, nguồn phát sinh và trigger event sẽ thuộc module Điểm chạm.</li>
              <li>Một template có thể được dùng tại nhiều điểm chạm khác nhau.</li>
              <li>Cấu trúc object ảnh hưởng trực tiếp đến dữ liệu phản hồi và khả năng phân tích.</li>
            </ul>
          </div>
        </div>

        <div className="detail-column detail-column--wide">
          <div className="form-card template-detail-section">
            <div className="section-header">
              <h2>Cấu trúc object trong template</h2>
              <span className="section-chip">{template.objects.length} objects</span>
            </div>

            <div className="object-stack">
              {template.objects.map((object) => (
                <article className="object-card object-card--detail" key={object.id}>
                  <div className="object-card__index">{String(object.displayOrder).padStart(2, '0')}</div>
                  <div className="object-card__body">
                    <div className="object-card__header">
                      <div>
                        <strong>{object.type}</strong>
                        <div className="muted-text object-card__meta-code">
                          {object.refCode}_{String(object.displayOrder).padStart(2, '0')}
                        </div>
                      </div>
                      <div className="object-card__badges">
                        <span className="survey-pill">{object.questionType}</span>
                        <span className="survey-pill survey-pill--ghost">
                          {object.allowComment ? 'Có góp ý' : 'Không góp ý'}
                        </span>
                        <span className="survey-pill survey-pill--danger">
                          {object.required ? 'Bắt buộc' : 'Tùy chọn'}
                        </span>
                      </div>
                    </div>
                    <p>"{object.question}"</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="form-card template-detail-section">
            <div className="section-header">
              <h2>Điểm chạm đang sử dụng</h2>
              <button className="button button--ghost" type="button" onClick={() => setShowUsageDrawer(true)}>
                Xem tất cả
              </button>
            </div>

            <table className="data-table template-touchpoint-table">
              <thead>
                <tr>
                  <th>Mã điểm chạm</th>
                  <th>Tên điểm chạm</th>
                  <th>Nguồn</th>
                  <th>Sản phẩm</th>
                  <th>Chương trình</th>
                  <th>Mapping</th>
                </tr>
              </thead>
              <tbody>
                {template.touchpoints.length > 0 ? (
                  template.touchpoints.map((touchpoint) => (
                    <tr key={touchpoint.id}>
                      <td className="code-cell">{touchpoint.id}</td>
                      <td>{touchpoint.name}</td>
                      <td>{touchpoint.sourceSystem}</td>
                      <td>{touchpoint.product}</td>
                      <td>{touchpoint.program}</td>
                      <td>
                        <StatusChip status={touchpoint.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="muted-text" colSpan={6}>
                      Template này hiện chưa được gắn với điểm chạm nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TouchpointUsageDrawer
        onClose={() => setShowUsageDrawer(false)}
        template={showUsageDrawer ? template : null}
      />
      <DeactivateModal
        onClose={() => setShowDeactivateModal(false)}
        template={showDeactivateModal ? template : null}
      />
    </section>
  )
}
