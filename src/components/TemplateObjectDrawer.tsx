import { useEffect, useMemo, useState } from 'react'
import { CustomSelect } from './CustomSelect'
import type { QuestionType, TemplateObject } from '../types'

interface TemplateObjectDrawerProps {
  object: TemplateObject | null
  templateName: string
  mode: 'create' | 'edit'
  onClose: () => void
  onSave: (object: TemplateObject) => void
}

export function TemplateObjectDrawer({
  object,
  templateName,
  mode,
  onClose,
  onSave,
}: TemplateObjectDrawerProps) {
  const [draft, setDraft] = useState<TemplateObject | null>(object)

  useEffect(() => {
    setDraft(object)
  }, [object])

  const questionTypeOptions = useMemo(
    () => [
      { value: 'Rating 1-5' as QuestionType, label: 'Rating 1-5' },
      { value: 'NPS 0-10' as QuestionType, label: 'NPS 0-10' },
      { value: 'Text' as QuestionType, label: 'Text' },
    ],
    [],
  )

  if (!object || !draft) return null

  const usesScale = draft.questionType !== 'Text'

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="drawer drawer--large">
        <div className="drawer__header">
          <div>
            <h2>{mode === 'create' ? 'Thêm object mới' : 'Chỉnh sửa object'}</h2>
            <p>Cập nhật cấu trúc và câu hỏi chính cho một object trong template.</p>
          </div>
          <div className="drawer__actions">
            <button className="button button--ghost" type="button" onClick={onClose}>
              Hủy
            </button>
            <button className="button button--primary" type="button" onClick={() => onSave(normalizeDraft(draft))}>
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
                  <span>Loại object</span>
                  <input
                    value={draft.type}
                    onChange={(event) =>
                      setDraft((current) => (current ? { ...current, type: event.target.value } : current))
                    }
                  />
                </label>
                <label className="field">
                  <span>Tên object</span>
                  <input
                    value={draft.name}
                    onChange={(event) =>
                      setDraft((current) => (current ? { ...current, name: event.target.value } : current))
                    }
                  />
                </label>
                <label className="field">
                  <span>Mã tham chiếu</span>
                  <input
                    value={draft.refCode}
                    onChange={(event) =>
                      setDraft((current) => (current ? { ...current, refCode: event.target.value } : current))
                    }
                  />
                </label>
                <label className="field">
                  <span>Thứ tự hiển thị</span>
                  <input
                    type="number"
                    min={1}
                    value={draft.displayOrder}
                    onChange={(event) =>
                      setDraft((current) =>
                        current
                          ? {
                              ...current,
                              displayOrder: Number(event.target.value) || current.displayOrder,
                            }
                          : current,
                      )
                    }
                  />
                </label>
              </div>
            </div>

            <div className="form-card">
              <h3>Cấu trúc câu hỏi chính</h3>
              <div className="form-grid form-grid--single">
                <label className="field">
                  <span>Câu hỏi chính</span>
                  <textarea
                    value={draft.question}
                    rows={4}
                    onChange={(event) =>
                      setDraft((current) => (current ? { ...current, question: event.target.value } : current))
                    }
                  />
                </label>
              </div>

              <div className="form-grid form-grid--three">
                <label className="field">
                  <span>Loại câu hỏi</span>
                  <CustomSelect
                    value={draft.questionType}
                    onChange={(questionType) => {
                      setDraft((current) => {
                        if (!current) return current

                        return {
                          ...current,
                          questionType,
                          minScore:
                            questionType === 'Rating 1-5'
                              ? 1
                              : questionType === 'NPS 0-10'
                                ? 0
                                : undefined,
                          maxScore:
                            questionType === 'Rating 1-5'
                              ? 5
                              : questionType === 'NPS 0-10'
                                ? 10
                                : undefined,
                        }
                      })
                    }}
                    options={questionTypeOptions}
                  />
                </label>
                <div className="field">
                  <span>Bắt buộc</span>
                  <div className="toggle-row">
                    <span>{draft.required ? 'Bật' : 'Tắt'}</span>
                    <button
                      className={`toggle${draft.required ? ' toggle--on' : ''}`}
                      type="button"
                      onClick={() =>
                        setDraft((current) =>
                          current ? { ...current, required: !current.required } : current,
                        )
                      }
                    />
                  </div>
                </div>
                <div className="field">
                  <span>Cho phép góp ý</span>
                  <div className="toggle-row">
                    <span>{draft.allowComment ? 'Bật' : 'Tắt'}</span>
                    <button
                      className={`toggle${draft.allowComment ? ' toggle--on' : ''}`}
                      type="button"
                      onClick={() =>
                        setDraft((current) =>
                          current ? { ...current, allowComment: !current.allowComment } : current,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {usesScale ? (
              <div className="form-card">
                <h3>Cấu hình thang điểm</h3>
                <div className="score-range">
                  <label className="field score-box">
                    <span>Giá trị nhỏ nhất</span>
                    <input
                      type="number"
                      value={draft.minScore ?? ''}
                      onChange={(event) =>
                        setDraft((current) =>
                          current ? { ...current, minScore: Number(event.target.value) } : current,
                        )
                      }
                    />
                  </label>
                  <div className="score-arrow">→</div>
                  <label className="field score-box">
                    <span>Giá trị lớn nhất</span>
                    <input
                      type="number"
                      value={draft.maxScore ?? ''}
                      onChange={(event) =>
                        setDraft((current) =>
                          current ? { ...current, maxScore: Number(event.target.value) } : current,
                        )
                      }
                    />
                  </label>
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
                <div className="preview-card__title">{draft.name || 'Object mới'}</div>
                <p>{draft.question || 'Câu hỏi chính sẽ hiển thị tại đây.'}</p>

                {draft.questionType === 'Rating 1-5' ? (
                  <div className="rating-preview">★ ★ ★ ★ ☆</div>
                ) : null}

                {draft.questionType === 'NPS 0-10' ? (
                  <div className="nps-preview">
                    {Array.from({ length: 11 }, (_, index) => (
                      <span key={index}>{index}</span>
                    ))}
                  </div>
                ) : null}

                {draft.questionType === 'Text' ? (
                  <div className="text-preview">Ô nhập nội dung phản hồi</div>
                ) : null}

                {draft.allowComment ? (
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

function normalizeDraft(object: TemplateObject): TemplateObject {
  if (object.questionType === 'Text') {
    return {
      ...object,
      minScore: undefined,
      maxScore: undefined,
    }
  }

  return object
}
