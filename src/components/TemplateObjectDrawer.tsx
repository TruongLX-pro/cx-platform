import type { TemplateObject } from '../types'

interface TemplateObjectDrawerProps {
  object: TemplateObject | null
  templateName: string
  onClose: () => void
}

export function TemplateObjectDrawer({
  object,
  templateName,
  onClose,
}: TemplateObjectDrawerProps) {
  if (!object) return null

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="drawer drawer--large">
        <div className="drawer__header">
          <div>
            <h2>Chỉnh sửa object</h2>
            <p>Cập nhật cấu trúc và câu hỏi chính cho một object trong template</p>
          </div>
          <div className="drawer__actions">
            <button className="button button--ghost" type="button" onClick={onClose}>
              Hủy
            </button>
            <button className="button button--primary" type="button" onClick={onClose}>
              Lưu thay đổi
            </button>
          </div>
        </div>

        <div className="drawer__context-note">
          Bạn đang chỉnh object thuộc template: <strong>{templateName}</strong>
        </div>

        <div className="drawer__body drawer__body--split">
          <div className="drawer__main">
            <div className="form-card">
              <h3>Thông tin object</h3>
              <div className="form-grid">
                <label className="field">
                  <span>Loại object *</span>
                  <input value={object.type} readOnly />
                </label>
                <label className="field">
                  <span>Tên object</span>
                  <input value={object.name} readOnly />
                </label>
                <label className="field">
                  <span>Mã tham chiếu object</span>
                  <input value={object.refCode} readOnly />
                </label>
                <label className="field">
                  <span>Thứ tự hiển thị</span>
                  <input value={String(object.displayOrder)} readOnly />
                </label>
              </div>
            </div>

            <div className="form-card">
              <h3>Cấu trúc câu hỏi chính</h3>
              <div className="form-grid form-grid--single">
                <label className="field">
                  <span>Câu hỏi chính</span>
                  <textarea value={object.question} readOnly rows={4} />
                </label>
              </div>

              <div className="form-grid form-grid--three">
                <label className="field">
                  <span>Loại câu hỏi</span>
                  <input value={object.questionType} readOnly />
                </label>
                <div className="field">
                  <span>Bắt buộc</span>
                  <div className="toggle-row">
                    <span>{object.required ? 'Bật' : 'Tắt'}</span>
                    <div className={`toggle${object.required ? ' toggle--on' : ''}`} />
                  </div>
                </div>
                <div className="field">
                  <span>Cho phép góp ý</span>
                  <div className="toggle-row">
                    <span>{object.allowComment ? 'Bật' : 'Tắt'}</span>
                    <div className={`toggle${object.allowComment ? ' toggle--on' : ''}`} />
                  </div>
                </div>
              </div>
            </div>

            {object.questionType !== 'Text' ? (
              <div className="form-card">
                <h3>Cấu hình thang điểm</h3>
                <div className="score-range">
                  <div className="score-box">
                    <span>Giá trị nhỏ nhất</span>
                    <strong>{object.minScore}</strong>
                  </div>
                  <div className="score-arrow">→</div>
                  <div className="score-box">
                    <span>Giá trị lớn nhất</span>
                    <strong>{object.maxScore}</strong>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="drawer__side">
            <div className="preview-panel">
              <div className="preview-panel__header">
                <h3>Xem trước cấu trúc</h3>
              </div>

              <div className="preview-card">
                <div className="preview-card__eyebrow">Object</div>
                <div className="preview-card__title">{object.name}</div>
                <p>{object.question}</p>

                {object.questionType === 'Rating 1-5' ? (
                  <div className="rating-preview">★ ★ ★ ★ ☆</div>
                ) : null}

                {object.questionType === 'NPS 0-10' ? (
                  <div className="nps-preview">
                    {Array.from({ length: 11 }, (_, index) => (
                      <span key={index}>{index}</span>
                    ))}
                  </div>
                ) : null}

                {object.questionType === 'Text' ? (
                  <div className="text-preview">Ô nhập nội dung phản hồi</div>
                ) : null}

                {object.allowComment ? (
                  <div className="comment-preview">Ý kiến góp ý thêm (không bắt buộc)</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
