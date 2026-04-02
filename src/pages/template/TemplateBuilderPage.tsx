import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CustomSelect } from '../../components/CustomSelect'
import { TemplateObjectDrawer } from '../../components/TemplateObjectDrawer'
import {
  ownerTeamOptions,
  respondentOptions,
  surveyTypeOptions,
  templateRecords,
  upsertTemplateRecord,
} from '../../data/templateData'
import type {
  ObjectMode,
  RespondentType,
  SurveyType,
  TemplateObject,
  TemplateRecord,
  TemplateStatus,
} from '../../types'

interface TemplateBuilderPageProps {
  mode: 'multi' | 'single' | 'edit'
}

interface BuilderFormState {
  code: string
  name: string
  surveyType: SurveyType
  goal: string
  respondentType: RespondentType
  objectMode: ObjectMode
  ownerTeam: string
  status: TemplateStatus
}

interface EditingObjectState {
  mode: 'create' | 'edit'
  object: TemplateObject
}

export function TemplateBuilderPage({ mode }: TemplateBuilderPageProps) {
  const navigate = useNavigate()
  const previewRef = useRef<HTMLElement | null>(null)
  const { templateId } = useParams()

  const template = useMemo<TemplateRecord>(() => {
    if (mode === 'edit' && templateId) {
      return templateRecords.find((record) => record.id === templateId) ?? templateRecords[0]
    }

    if (mode === 'single') {
      return {
        id: 'draft-single-object',
        code: '',
        name: '',
        surveyType: 'NPS',
        goal: '',
        respondentType: 'Học sinh',
        objectMode: 'single',
        status: 'Nháp',
        ownerTeam: 'Khối học thuật',
        updatedAt: formatToday(),
        updatedBy: 'Codex',
        objects: [
          {
            id: 'draft-object-single',
            type: 'Chương trình học',
            name: 'Chương trình học',
            refCode: 'PRG',
            displayOrder: 1,
            question: 'Bạn có sẵn sàng giới thiệu chương trình này cho bạn bè không?',
            questionType: 'NPS 0-10',
            required: true,
            allowComment: true,
            minScore: 0,
            maxScore: 10,
          },
        ],
        touchpoints: [],
      }
    }

    return {
      id: 'draft-multi-object',
      code: '',
      name: '',
      surveyType: 'CSAT',
      goal: '',
      respondentType: 'Phụ huynh',
      objectMode: 'multi',
      status: 'Nháp',
      ownerTeam: 'Chăm sóc khách hàng',
      updatedAt: formatToday(),
      updatedBy: 'Codex',
      objects: templateRecords[0].objects,
      touchpoints: [],
    }
  }, [mode, templateId])

  const [form, setForm] = useState<BuilderFormState>({
    code: template.code,
    name: template.name,
    surveyType: template.surveyType,
    goal: template.goal,
    respondentType: template.respondentType,
    objectMode: mode === 'single' ? 'single' : template.objectMode,
    ownerTeam: template.ownerTeam,
    status: template.status,
  })
  const [objects, setObjects] = useState<TemplateObject[]>(() =>
    template.objects.map((item) => ({
      ...item,
    })),
  )
  const [editingObject, setEditingObject] = useState<EditingObjectState | null>(null)

  useEffect(() => {
    setForm({
      code: template.code,
      name: template.name,
      surveyType: template.surveyType,
      goal: template.goal,
      respondentType: template.respondentType,
      objectMode: mode === 'single' ? 'single' : template.objectMode,
      ownerTeam: template.ownerTeam,
      status: template.status,
    })
    setObjects(
      template.objects.map((item) => ({
        ...item,
      })),
    )
    setEditingObject(null)
  }, [mode, template])

  const isSingle = form.objectMode === 'single'
  const visibleObjects = objects.slice(0, isSingle ? 1 : objects.length)
  const builderTitle = mode === 'edit' ? 'Chỉnh sửa template' : 'Tạo template khảo sát'

  const requiredCode = form.code.trim()
  const requiredName = form.name.trim()
  const requiredGoal = form.goal.trim()
  const hasObjects = visibleObjects.length > 0

  const initialSnapshot = useMemo(
    () =>
      JSON.stringify({
        form: {
          code: template.code,
          name: template.name,
          surveyType: template.surveyType,
          goal: template.goal,
          respondentType: template.respondentType,
          objectMode: mode === 'single' ? 'single' : template.objectMode,
          ownerTeam: template.ownerTeam,
          status: template.status,
        },
        objects: normalizeObjects(
          template.objects
            .map((item) => ({ ...item }))
            .slice(0, mode === 'single' ? 1 : template.objects.length),
        ),
      }),
    [mode, template],
  )

  const currentSnapshot = useMemo(
    () =>
      JSON.stringify({
        form,
        objects: normalizeObjects(visibleObjects.map((item) => ({ ...item }))),
      }),
    [form, visibleObjects],
  )
  const hasUnsavedChanges = currentSnapshot !== initialSnapshot

  return (
    <section className="template-builder-page template-page--builder">
      <div className="builder-toolbar">
        <div>
          <div className="breadcrumb">
            <Link to="/templates">Template khảo sát</Link>
            <span>›</span>
            <span>{mode === 'edit' ? 'Chỉnh sửa template' : 'Tạo mới'}</span>
          </div>
          <h1>{builderTitle}</h1>
        </div>
        <div className="builder-toolbar__actions">
          <button className="button button--ghost" type="button" onClick={handleCancel}>
            Hủy
          </button>
          <button className="button button--ghost" type="button" onClick={handleSaveDraft}>
            Lưu nháp
          </button>
          <button className="button button--ghost" type="button" onClick={handlePreview}>
            Xem trước
          </button>
          <button className="button button--primary" type="button" onClick={handleActivate}>
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
                <p>Cấu hình thông tin quản trị và phạm vi sử dụng của mẫu khảo sát.</p>
              </div>
              <span className="section-chip">metadata</span>
            </div>

            <div className="template-builder-meta-grid">
              <div className="template-builder-meta-row">
                <label className="field">
                  <span>Mã template *</span>
                  <input
                    value={form.code}
                    placeholder="VD: TPL_PARENT_CSAT"
                    onChange={(event) => setForm((current) => ({ ...current, code: event.target.value }))}
                  />
                  {!requiredCode ? <small className="field-error">Mã template là bắt buộc</small> : null}
                </label>
                <label className="field">
                  <span>Tên template</span>
                  <input
                    value={form.name}
                    placeholder="Nhập tên khảo sát..."
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  />
                  {!requiredName ? <small className="field-error">Tên template là bắt buộc</small> : null}
                </label>
              </div>

              <div className="template-builder-meta-row">
                <label className="field">
                  <span>Loại khảo sát</span>
                  <CustomSelect
                    value={form.surveyType}
                    onChange={(surveyType) => setForm((current) => ({ ...current, surveyType }))}
                    options={surveyTypeOptions.map((item) => ({ value: item, label: item }))}
                  />
                </label>
                <label className="field">
                  <span>Mục tiêu khảo sát</span>
                  <input
                    value={form.goal}
                    placeholder="Mô tả ngắn mục tiêu khảo sát..."
                    onChange={(event) => setForm((current) => ({ ...current, goal: event.target.value }))}
                  />
                  {!requiredGoal ? (
                    <small className="field-error">Mục tiêu khảo sát nên được khai báo rõ ràng</small>
                  ) : null}
                </label>
              </div>

              <div className="template-builder-meta-row">
                <label className="field">
                  <span>Đối tượng trả lời</span>
                  <CustomSelect
                    value={form.respondentType}
                    onChange={(respondentType) => setForm((current) => ({ ...current, respondentType }))}
                    options={respondentOptions.map((item) => ({ value: item, label: item }))}
                  />
                </label>
                <label className="field">
                  <span>Chế độ object</span>
                  <input value={isSingle ? 'Single-object' : 'Multi-object'} readOnly />
                  <small>
                    {isSingle
                      ? 'Template single-object chỉ chứa một đối tượng khảo sát.'
                      : 'Template multi-object dùng khi một form cần đánh giá nhiều đối tượng trong cùng một lần khảo sát.'}
                  </small>
                </label>
              </div>

              <div className="template-builder-meta-row">
                <label className="field">
                  <span>Bộ phận phụ trách</span>
                  <CustomSelect
                    value={form.ownerTeam}
                    onChange={(ownerTeam) => setForm((current) => ({ ...current, ownerTeam }))}
                    options={ownerTeamOptions.map((item) => ({ value: item, label: item }))}
                  />
                </label>
                <label className="field">
                  <span>Trạng thái</span>
                  <input value={form.status} readOnly />
                </label>
              </div>
            </div>

            <div className="inline-note inline-note--soft">
              Template chỉ quản lý nội dung khảo sát. Product, Program, trigger event và điểm chạm sử dụng sẽ được quản lý ở module Điểm chạm.
            </div>
          </div>

          <div className="object-section">
            <div className="section-header">
              <div>
                <h2>{isSingle ? 'Cấu trúc object' : `Cấu trúc đối tượng (${visibleObjects.length})`}</h2>
                <p>Sắp xếp object theo đúng thứ tự hiển thị trong form khảo sát.</p>
              </div>
              {!isSingle ? (
                <button
                  className="button button--primary"
                  type="button"
                  onClick={() =>
                    setEditingObject({
                      mode: 'create',
                      object: createDraftObject(objects.length + 1),
                    })
                  }
                >
                  <span className="material-symbols-outlined">add</span>
                  Thêm đối tượng
                </button>
              ) : null}
            </div>

            {!hasObjects ? (
              <div className="inline-note inline-note--soft">
                Template hiện chưa có object nào. Hãy thêm ít nhất một object để có thể kích hoạt template.
              </div>
            ) : null}

            {visibleObjects.map((object) => (
              <article className="object-row object-row--builder" key={object.id}>
                <div className="object-row__index">{String(object.displayOrder).padStart(2, '0')}</div>
                <div className="object-row__content">
                  <div className="object-row__meta object-row__meta--builder">
                    <div className="object-row__group">
                      <span className="object-row__label">Đối tượng</span>
                      <strong>{object.type}</strong>
                      <span className="muted-text">{object.refCode}</span>
                    </div>
                    <div className="object-row__group object-row__group--question">
                      <span className="object-row__label">Câu hỏi chính</span>
                      <strong>{object.question}</strong>
                    </div>
                    <div className="object-row__group object-row__group--tags">
                      <span className="object-row__label">Thiết lập</span>
                      <div className="object-row__toggles">
                        <span className="survey-pill">{object.questionType}</span>
                        <span className="survey-pill survey-pill--ghost">
                          {object.allowComment ? 'Có góp ý' : 'Không góp ý'}
                        </span>
                        <span
                          className={`survey-pill${object.required ? ' survey-pill--danger' : ' survey-pill--ghost'}`}
                        >
                          {object.required ? 'Bắt buộc' : 'Tùy chọn'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="object-row__actions object-row__actions--icons">
                  <button
                    className="icon-link"
                    type="button"
                    onClick={() => setEditingObject({ mode: 'edit', object })}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  {!isSingle ? (
                    <button
                      className="icon-link icon-link--danger"
                      type="button"
                      onClick={() => removeObject(object.id)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="builder-preview" ref={previewRef}>
          <div className="builder-preview__head">
            <h3>Xem trước cấu trúc</h3>
            <p>{form.name || 'Template đang soạn'} hiển thị như thế nào với người phản hồi.</p>
          </div>

          <div className="builder-preview__meta">
            <div className="builder-preview__meta-item">
              <span>Đối tượng trả lời</span>
              <strong>{form.respondentType}</strong>
            </div>
            <div className="builder-preview__meta-item">
              <span>Loại khảo sát</span>
              <strong>{form.surveyType}</strong>
            </div>
            <div className="builder-preview__meta-item">
              <span>Chế độ object</span>
              <strong>{isSingle ? 'Single-object' : 'Multi-object'}</strong>
            </div>
          </div>

          {visibleObjects.map((object) => (
            <div className="preview-block" key={object.id}>
              <div className="preview-block__top">
                <span>Đối tượng: {object.type}</span>
                <strong>{object.required ? 'Bắt buộc' : 'Tùy chọn'}</strong>
              </div>
              <p>{object.question}</p>

              {renderQuestionPreview(object)}

              {object.allowComment ? <div className="comment-preview">Ý kiến đóng góp thêm (nếu có)</div> : null}
            </div>
          ))}
        </aside>
      </div>

      <TemplateObjectDrawer
        object={editingObject?.object ?? null}
        mode={editingObject?.mode ?? 'edit'}
        onClose={() => setEditingObject(null)}
        onSave={(nextObject) => {
          setObjects((current) => {
            if (editingObject?.mode === 'create') {
              return normalizeObjects([...current, nextObject].sort((a, b) => a.displayOrder - b.displayOrder))
            }

            return normalizeObjects(
              current
                .map((item) => (item.id === nextObject.id ? nextObject : item))
                .sort((a, b) => a.displayOrder - b.displayOrder),
            )
          })
          setEditingObject(null)
        }}
        templateName={form.name || 'Template đang soạn'}
      />
    </section>
  )

  function handleCancel() {
    if (hasUnsavedChanges && !window.confirm('Các thay đổi chưa lưu sẽ bị mất. Tiếp tục hủy?')) {
      return
    }

    if (mode === 'edit') {
      navigate(`/templates/${template.id}`)
      return
    }

    navigate('/templates')
  }

  function handlePreview() {
    previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleSaveDraft() {
    const savedRecord = persistTemplate('Nháp')
    navigate(`/templates/${savedRecord.id}`)
  }

  function handleActivate() {
    if (!requiredCode || !requiredName || !requiredGoal) {
      window.alert('Cần nhập đầy đủ mã template, tên template và mục tiêu khảo sát trước khi kích hoạt.')
      return
    }

    if (!hasObjects) {
      window.alert('Template cần có ít nhất một object trước khi kích hoạt.')
      return
    }

    const savedRecord = persistTemplate('Đang hoạt động')
    navigate(`/templates/${savedRecord.id}`)
  }

  function persistTemplate(nextStatus: TemplateStatus) {
    const nextRecord: TemplateRecord = {
      id: buildTemplateId(template.id, form.code, form.name),
      code: form.code.trim(),
      name: form.name.trim(),
      surveyType: form.surveyType,
      goal: form.goal.trim(),
      respondentType: form.respondentType,
      objectMode: isSingle ? 'single' : form.objectMode,
      status: nextStatus,
      ownerTeam: form.ownerTeam,
      updatedAt: formatToday(),
      updatedBy: 'Codex',
      objects: normalizeObjects(
        visibleObjects.map((item) => ({
          ...item,
        })),
      ),
      touchpoints: [],
    }

    return upsertTemplateRecord(nextRecord)
  }

  function removeObject(objectId: string) {
    setObjects((current) => normalizeObjects(current.filter((item) => item.id !== objectId)))
  }
}

function renderQuestionPreview(object: TemplateObject) {
  if (object.questionType === 'Rating 1-5') {
    return <div className="rating-preview">☆ ☆ ☆ ☆ ☆</div>
  }

  if (object.questionType === 'NPS 0-10') {
    return (
      <div className="nps-preview">
        {Array.from({ length: 11 }, (_, index) => (
          <span key={index}>{index}</span>
        ))}
      </div>
    )
  }

  return <div className="text-preview">Người dùng nhập phản hồi dạng văn bản</div>
}

function createDraftObject(displayOrder: number): TemplateObject {
  return {
    id: `draft-object-${Date.now()}`,
    type: 'Đối tượng mới',
    name: 'Đối tượng mới',
    refCode: `OBJ${displayOrder}`,
    displayOrder,
    question: '',
    questionType: 'Rating 1-5',
    required: true,
    allowComment: true,
    minScore: 1,
    maxScore: 5,
  }
}

function normalizeObjects(objects: TemplateObject[]) {
  return objects.map((item, index) => ({
    ...item,
    displayOrder: index + 1,
  }))
}

function buildTemplateId(currentId: string, code: string, name: string) {
  if (currentId && !currentId.startsWith('draft-')) {
    return currentId
  }

  const seed = code || name || `template-${Date.now()}`
  return slugify(seed)
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatToday() {
  return new Intl.DateTimeFormat('en-GB').format(new Date())
}
