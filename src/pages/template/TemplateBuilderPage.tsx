import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TemplateObjectDrawer } from '../../components/TemplateObjectDrawer'
import { templateRecords } from '../../data/templateData'
import type { ObjectMode, TemplateObject, TemplateRecord } from '../../types'

interface TemplateBuilderPageProps {
  mode: 'multi' | 'single' | 'edit'
}

export function TemplateBuilderPage({ mode }: TemplateBuilderPageProps) {
  const { templateId } = useParams()
  const template = useMemo<TemplateRecord>(() => {
    if (mode === 'edit' && templateId) {
      return templateRecords.find((record) => record.id === templateId) ?? templateRecords[0]
    }

    if (mode === 'single') {
      return templateRecords.find((record) => record.objectMode === 'single') ?? templateRecords[1]
    }

    return templateRecords[0]
  }, [mode, templateId])

  const [selectedObject, setSelectedObject] = useState<TemplateObject | null>(null)
  const objectMode: ObjectMode = mode === 'single' ? 'single' : template.objectMode
  const isSingle = objectMode === 'single'
  const visibleObjects = template.objects.slice(0, isSingle ? 1 : template.objects.length)

  return (
    <section className="template-builder-page">
      <div className="builder-toolbar">
        <div className="breadcrumb">
          <Link to="/templates">Template khảo sát</Link>
          <span>›</span>
          <span>{mode === 'edit' ? 'Chỉnh sửa template' : 'Tạo mới'}</span>
        </div>
        <div className="builder-toolbar__actions">
          <button className="button button--ghost" type="button">
            Hủy
          </button>
          <button className="button button--ghost" type="button">
            Lưu nháp
          </button>
          <button className="button button--ghost" type="button">
            Xem trước
          </button>
          <button className="button button--primary" type="button">
            Kích hoạt
          </button>
        </div>
      </div>

      <div className="builder-grid">
        <div className="builder-content">
          <div className="form-card form-card--large">
            <div className="section-header">
              <div>
                <h2>Thông tin template</h2>
                <p>Cấu hình thông tin quản trị và phân loại khảo sát</p>
              </div>
              <span className="section-chip">METADATA</span>
            </div>

            <div className="form-grid form-grid--two">
              <label className="field">
                <span>Mã template *</span>
                <input value={mode === 'edit' ? template.code : ''} placeholder="VD: TS_001" readOnly />
                <small className="field-error">Mã template là bắt buộc</small>
              </label>
              <label className="field">
                <span>Tên template</span>
                <input value={mode === 'edit' ? template.name : ''} placeholder="Nhập tên khảo sát..." readOnly />
              </label>
              <label className="field">
                <span>Loại khảo sát</span>
                <input value={template.surveyType} readOnly />
              </label>
              <label className="field">
                <span>Mục tiêu khảo sát</span>
                <input value={template.goal} readOnly />
              </label>
              <label className="field">
                <span>Đối tượng trả lời</span>
                <input value={template.respondentType} readOnly />
              </label>
              <label className="field">
                <span>Chế độ object</span>
                <input value={isSingle ? 'Single-object' : 'Multi-object'} readOnly />
                <small>
                  {isSingle
                    ? 'Template single-object chỉ chứa một đối tượng khảo sát.'
                    : 'Multi-object dùng khi một form đánh giá nhiều đối tượng trong cùng một lần khảo sát.'}
                </small>
              </label>
              <label className="field">
                <span>Bộ phận phụ trách</span>
                <input value={template.ownerTeam} readOnly />
              </label>
              <label className="field">
                <span>Trạng thái</span>
                <input value={template.status} readOnly />
              </label>
            </div>

            <div className="inline-note inline-note--soft">
              Template chỉ quản lý nội dung khảo sát. Product và Program được xác định tại điểm chạm.
            </div>
          </div>

          <div className="object-section">
            <div className="section-header">
              <div>
                <h2>{isSingle ? 'Cấu trúc object' : `Cấu trúc đối tượng (${visibleObjects.length})`}</h2>
              </div>
              {!isSingle ? (
                <button className="button button--primary" type="button">
                  + Thêm đối tượng
                </button>
              ) : null}
            </div>

            {visibleObjects.map((object) => (
              <article className="object-row object-row--builder" key={object.id}>
                <div className="object-row__index">{String(object.displayOrder).padStart(2, '0')}</div>
                <div className="object-row__content">
                  <div className="object-row__meta object-row__meta--builder">
                    <div>
                      <span className="object-row__label">Đối tượng</span>
                      <strong>{object.type}</strong>
                    </div>
                    <div>
                      <span className="object-row__label">Câu hỏi chính</span>
                      <strong>{object.question}</strong>
                    </div>
                    <div>
                      <span className="object-row__label">Loại / Bắt buộc</span>
                      <strong>
                        {object.questionType}
                        <br />
                        {object.required ? 'Bắt buộc' : 'Tùy chọn'}
                      </strong>
                    </div>
                    <div>
                      <span className="object-row__label">Góp ý</span>
                      <div className="toggle toggle--compact toggle--on" />
                    </div>
                  </div>
                </div>
                <div className="object-row__actions object-row__actions--icons">
                  <button className="icon-link" type="button" onClick={() => setSelectedObject(object)}>
                    /
                  </button>
                  {!isSingle ? (
                    <button className="icon-link icon-link--danger" type="button">
                      ×
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="builder-preview">
          <div className="builder-preview__head">
            <h3>Xem trước cấu trúc</h3>
            <p>Cấu hình hiển thị theo đối tượng</p>
          </div>

          {visibleObjects.map((object) => (
            <div className="preview-block" key={object.id}>
              <div className="preview-block__top">
                <span>Đối tượng: {object.type.toUpperCase()}</span>
                <strong>{object.required ? 'BẮT BUỘC' : 'TÙY CHỌN'}</strong>
              </div>
              <p>{object.question}</p>

              {object.questionType === 'Rating 1-5' ? (
                <div className="rating-preview">☆ ☆ ☆ ☆ ☆</div>
              ) : null}

              {object.questionType === 'NPS 0-10' ? (
                <div className="nps-preview">
                  {Array.from({ length: 11 }, (_, index) => (
                    <span key={index}>{index}</span>
                  ))}
                </div>
              ) : null}

              {object.questionType === 'Text' ? (
                <div className="text-preview">Người dùng nhập phản hồi dạng văn bản</div>
              ) : null}

              {object.allowComment ? <div className="comment-preview">Ý kiến đóng góp (nếu có)</div> : null}
            </div>
          ))}
        </aside>
      </div>

      <TemplateObjectDrawer
        object={selectedObject}
        onClose={() => setSelectedObject(null)}
        templateName={template.name}
      />
    </section>
  )
}
