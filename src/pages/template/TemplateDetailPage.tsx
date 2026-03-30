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
    <section className="template-detail-page">
      <div className="warning-banner warning-banner--wide">
        Template này hiện đang được sử dụng tại {template.touchpoints.length} điểm chạm. Hãy kiểm
        tra ảnh hưởng trước khi chỉnh sửa hoặc ngừng sử dụng.
      </div>

      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link to="/templates">Templates</Link>
            <span>›</span>
            <span>Chi tiết template</span>
          </div>
          <h1>{template.name}</h1>
        </div>
        <div className="page-header__actions">
          <Link className="button button--ghost" to={`/templates/${template.id}/edit`}>
            Chỉnh sửa template
          </Link>
          <button className="button button--danger-ghost" type="button" onClick={() => setShowDeactivateModal(true)}>
            Ngừng sử dụng
          </button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-column">
          <div className="form-card">
            <h2>Thông tin template</h2>
            <dl className="detail-list">
              <div>
                <dt>Mã template</dt>
                <dd>{template.code}</dd>
              </div>
              <div>
                <dt>Tên template</dt>
                <dd>{template.name}</dd>
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
            </dl>
          </div>

          <div className="form-card info-box">
            <h2>Lưu ý hệ thống</h2>
            <ul>
              <li>Template quản lý nội dung khảo sát.</li>
              <li>Điểm chạm quản lý ngữ cảnh nghiệp vụ như product, program, nguồn phát sinh.</li>
              <li>Một template có thể được dùng ở nhiều điểm chạm.</li>
              <li>
                Cấu trúc object ảnh hưởng trực tiếp đến dữ liệu phản hồi theo object và khả năng báo
                cáo.
              </li>
            </ul>
          </div>
        </div>

        <div className="detail-column detail-column--wide">
          <div className="form-card">
            <div className="section-header">
              <h2>Cấu trúc object trong template</h2>
              <span className="section-chip">{template.objects.length} OBJECTS</span>
            </div>

            <div className="object-stack">
              {template.objects.map((object) => (
                <article className="object-card object-card--detail" key={object.id}>
                  <div className="object-card__index">{String(object.displayOrder).padStart(2, '0')}</div>
                  <div className="object-card__body">
                    <div className="object-card__header">
                      <strong>{object.type}</strong>
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
                    <div className="muted-text">
                      {object.refCode}_{String(object.displayOrder).padStart(2, '0')}
                    </div>
                    <p>"{object.question}"</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="form-card">
            <div className="section-header">
              <h2>Điểm chạm đang sử dụng</h2>
              <button className="button button--ghost" type="button" onClick={() => setShowUsageDrawer(true)}>
                Xem tất cả
              </button>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Mã điểm chạm</th>
                  <th>Tên điểm chạm</th>
                  <th>Hệ thống nguồn</th>
                  <th>Product</th>
                  <th>Program</th>
                  <th>Trạng thái mapping</th>
                </tr>
              </thead>
              <tbody>
                {template.touchpoints.map((touchpoint) => (
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
                ))}
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
