import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CustomSelect } from '../../components/CustomSelect'
import { StatusChip } from '../../components/StatusChip'
import { ownerTeamOptions, templateRecords } from '../../data/templateData'
import {
  buildTouchpointTemplateMappings,
  getDefaultScreenCode,
  getRecordTypeByTouchpointType,
  getScreenName,
  getScreenOptionsByType,
  productOptions,
  productTypeOptions,
  programOptions,
  respondentOptions,
  sourceSystemOptions,
  surveyTypeOptions,
  touchpointRecords,
  touchpointStatusOptions,
  touchpointTypeLabels,
  touchpointTypeOptions,
} from '../../data/touchpointData'
import type {
  ProductType,
  RespondentType,
  TouchpointRecord,
  TouchpointStatus,
  TouchpointSurveyType,
  TouchpointType,
} from '../../types'

interface TouchpointBuilderPageProps {
  mode: 'create' | 'edit'
}

interface TouchpointFormState {
  code: string
  name: string
  touchpointType: TouchpointType
  sourceSystem: string
  product: string
  productType: ProductType
  program: string
  respondentType: RespondentType
  surveyType: TouchpointSurveyType
  triggerEvent: string
  screenCode: string
  screenName: string
  ownerTeam: string
  status: TouchpointStatus
}

export function TouchpointBuilderPage({ mode }: TouchpointBuilderPageProps) {
  const { touchpointId } = useParams()
  const initialTouchpoint = useMemo<TouchpointRecord>(() => {
    if (mode === 'edit' && touchpointId) {
      return touchpointRecords.find((record) => record.id === touchpointId) ?? touchpointRecords[0]
    }

    return createDraftTouchpoint()
  }, [mode, touchpointId])

  const [form, setForm] = useState<TouchpointFormState>(() => toFormState(initialTouchpoint))
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>(
    initialTouchpoint.templates.map((item) => item.templateId),
  )
  const [defaultTemplateId, setDefaultTemplateId] = useState<string | null>(
    initialTouchpoint.templates.find((item) => item.isDefault)?.templateId ?? null,
  )

  useEffect(() => {
    setForm(toFormState(initialTouchpoint))
    setSelectedTemplateIds(initialTouchpoint.templates.map((item) => item.templateId))
    setDefaultTemplateId(initialTouchpoint.templates.find((item) => item.isDefault)?.templateId ?? null)
  }, [initialTouchpoint])

  const screenOptions = useMemo(() => getScreenOptionsByType(form.touchpointType), [form.touchpointType])
  const editableSurveyTypeOptions = useMemo(
    () => surveyTypeOptions.filter((item) => item !== 'Không áp dụng'),
    [],
  )
  const recordType = getRecordTypeByTouchpointType(form.touchpointType)
  const mappedTemplates = useMemo(
    () => buildTouchpointTemplateMappings(selectedTemplateIds, defaultTemplateId),
    [defaultTemplateId, selectedTemplateIds],
  )
  const builderTitle = mode === 'edit' ? 'Chỉnh sửa điểm chạm' : 'Tạo điểm chạm'
  const canMapTemplates = form.touchpointType === 'survey'

  return (
    <section className="touchpoint-page touchpoint-page--builder">
      <div className="builder-toolbar">
        <div>
          <div className="breadcrumb">
            <Link to="/touchpoints">Điểm chạm</Link>
            <span>›</span>
            <span>{mode === 'edit' ? 'Chỉnh sửa' : 'Tạo mới'}</span>
          </div>
          <h1>{builderTitle}</h1>
          <p>Chuẩn hóa ngữ cảnh, màn hình nghiệp vụ và template mapping cho từng touchpoint.</p>
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

      <div className="builder-grid touchpoint-builder-grid">
        <div className="builder-content">
          <div className="form-card form-card--large touchpoint-form-card">
            <div className="section-header">
              <div>
                <h2>Thông tin điểm chạm</h2>
                <p>Ghi nhận ngữ cảnh phát sinh phản hồi và gắn đúng màn hình nghiệp vụ chuẩn hóa.</p>
              </div>
              <span className="section-chip">metadata</span>
            </div>

            <div className="template-builder-meta-grid">
              <div className="template-builder-meta-row">
                <label className="field">
                  <span>Mã điểm chạm *</span>
                  <input
                    value={form.code}
                    placeholder="VD: TP_TUTOR_MID_COURSE"
                    onChange={(event) => setForm((current) => ({ ...current, code: event.target.value }))}
                  />
                </label>
                <label className="field">
                  <span>Tên điểm chạm</span>
                  <input
                    value={form.name}
                    placeholder="Nhập tên điểm chạm..."
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </label>
              </div>

              <div className="template-builder-meta-row">
                <label className="field">
                  <span>Loại điểm chạm</span>
                  <CustomSelect
                    value={form.touchpointType}
                    onChange={handleTouchpointTypeChange}
                    options={touchpointTypeOptions.map((item) => ({
                      value: item,
                      label: touchpointTypeLabels[item],
                    }))}
                  />
                </label>
                <label className="field">
                  <span>Hệ thống nguồn</span>
                  <CustomSelect
                    value={form.sourceSystem}
                    onChange={(sourceSystem) => setForm((current) => ({ ...current, sourceSystem }))}
                    options={sourceSystemOptions.map((item) => ({ value: item, label: item }))}
                  />
                </label>
              </div>

              <div className="template-builder-meta-row">
                <label className="field">
                  <span>Sản phẩm</span>
                  <CustomSelect
                    value={form.product}
                    onChange={(product) => setForm((current) => ({ ...current, product }))}
                    options={productOptions.map((item) => ({ value: item, label: item }))}
                  />
                </label>
                <label className="field">
                  <span>Loại sản phẩm</span>
                  <CustomSelect
                    value={form.productType}
                    onChange={handleProductTypeChange}
                    options={productTypeOptions.map((item) => ({ value: item, label: item }))}
                  />
                </label>
              </div>

              <div className="template-builder-meta-row">
                <label className="field">
                  <span>Chương trình</span>
                  <CustomSelect
                    value={form.program}
                    onChange={(program) => setForm((current) => ({ ...current, program }))}
                    options={programOptions.map((item) => ({ value: item, label: item }))}
                  />
                </label>
                <label className="field">
                  <span>Đối tượng trả lời</span>
                  <CustomSelect
                    value={form.respondentType}
                    onChange={(respondentType) => setForm((current) => ({ ...current, respondentType }))}
                    options={respondentOptions.map((item) => ({ value: item, label: item }))}
                  />
                </label>
              </div>

              <div className="template-builder-meta-row">
                <label className="field">
                  <span>Loại khảo sát</span>
                  {canMapTemplates ? (
                    <CustomSelect
                      value={form.surveyType}
                      onChange={(surveyType) => setForm((current) => ({ ...current, surveyType }))}
                      options={editableSurveyTypeOptions.map((item) => ({ value: item, label: item }))}
                    />
                  ) : (
                    <input value="Không áp dụng" readOnly />
                  )}
                  {!canMapTemplates ? (
                    <small>Complaint và support sẽ tự chuyển sang trạng thái không áp dụng.</small>
                  ) : (
                    <small>Survey touchpoint có thể map template khảo sát theo object.</small>
                  )}
                </label>
                <label className="field">
                  <span>Trigger event</span>
                  <input
                    value={form.triggerEvent}
                    placeholder="Mô tả sự kiện phát sinh..."
                    onChange={(event) => setForm((current) => ({ ...current, triggerEvent: event.target.value }))}
                  />
                </label>
              </div>

              <div className="template-builder-meta-row">
                <label className="field">
                  <span>Mã màn hình</span>
                  <CustomSelect
                    value={form.screenCode}
                    onChange={handleScreenCodeChange}
                    options={screenOptions.map((option) => ({ value: option.code, label: option.code }))}
                  />
                  <small>Mã chuẩn hóa để xác định màn hình nghiệp vụ gắn với touchpoint.</small>
                </label>
                <label className="field">
                  <span>Tên màn hình</span>
                  <input value={form.screenName} readOnly />
                  <small>{getScreenName(form.screenCode)}</small>
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
                  <CustomSelect
                    value={form.status}
                    onChange={(status) => setForm((current) => ({ ...current, status }))}
                    options={touchpointStatusOptions.map((item) => ({ value: item, label: item }))}
                  />
                </label>
              </div>
            </div>

            <div className="inline-note inline-note--soft touchpoint-inline-note">
              `source_system` là nơi phát sinh dữ liệu; `screen_code / screen_name` là màn hình nghiệp vụ
              chuẩn hóa của touchpoint. `survey_feedback`, `complaint_case` và `issue_report` sẽ kế thừa
              `touchpoint_id` để truy vết.
            </div>
          </div>

          <div className="form-card touchpoint-map-card">
            <div className="section-header">
              <div>
                <h2>Template mapping</h2>
                <p>Chọn các template có thể sử dụng cho touchpoint này. Survey touchpoint cần ít nhất một template.</p>
              </div>
              <span className="section-chip">{selectedTemplateIds.length} template</span>
            </div>

            {canMapTemplates ? (
              <div className="touchpoint-map-list">
                {templateRecords.map((template) => {
                  const selected = selectedTemplateIds.includes(template.id)
                  const isDefault = defaultTemplateId === template.id

                  return (
                    <article
                      key={template.id}
                      className={`touchpoint-map-row${selected ? ' touchpoint-map-row--selected' : ''}`}
                    >
                      <label className="touchpoint-map-row__check">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleTemplate(template.id)}
                        />
                        <span />
                      </label>
                      <div className="touchpoint-map-row__content">
                        <div className="touchpoint-map-row__title">
                          <strong>{template.name}</strong>
                          <Link className="touchpoint-link" to={`/templates/${template.id}`}>
                            {template.code}
                          </Link>
                        </div>
                        <div className="touchpoint-map-row__meta">
                          <span className="muted-text">{template.surveyType}</span>
                          <span className="muted-text">
                            {template.objectMode === 'multi' ? 'Multi-object' : 'Single-object'} • {template.objects.length} object
                          </span>
                          <StatusChip status={template.status} />
                        </div>
                      </div>
                      <div className="touchpoint-map-row__actions">
                        <button
                          className={`touchpoint-map-default${isDefault ? ' touchpoint-map-default--active' : ''}`}
                          type="button"
                          onClick={() => setDefaultTemplateId(template.id)}
                        >
                          {isDefault ? 'Mặc định' : 'Đặt mặc định'}
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="inline-note inline-note--soft">
                Complaint và support thường không cần map template ở giai đoạn này.
              </div>
            )}
          </div>
        </div>

        <aside className="builder-preview touchpoint-builder-preview">
          <div className="builder-preview__head">
            <h3>Xem trước cấu trúc</h3>
            <p>{form.name || 'Touchpoint đang soạn'} hiển thị như thế nào trong hệ thống.</p>
          </div>

          <div className="builder-preview__meta touchpoint-preview-meta">
            <div className="builder-preview__meta-item">
              <span>Loại điểm chạm</span>
              <strong>{touchpointTypeLabels[form.touchpointType]}</strong>
            </div>
            <div className="builder-preview__meta-item">
              <span>Hệ thống nguồn</span>
              <strong>{form.sourceSystem}</strong>
            </div>
            <div className="builder-preview__meta-item">
              <span>Màn hình</span>
              <strong>{form.screenCode}</strong>
            </div>
            <div className="builder-preview__meta-item">
              <span>Bản ghi</span>
              <strong>{recordType}</strong>
            </div>
          </div>

          <div className="preview-block touchpoint-preview-block">
            <div className="preview-block__top">
              <span>{form.screenName}</span>
              <strong>{form.status}</strong>
            </div>
            <p>{form.triggerEvent || 'Mô tả trigger event của touchpoint ở đây.'}</p>
            <div className="touchpoint-preview-stack">
              <div className="touchpoint-preview-item">
                <span>Product</span>
                <strong>{form.product}</strong>
              </div>
              <div className="touchpoint-preview-item">
                <span>Program</span>
                <strong>{form.program}</strong>
              </div>
              <div className="touchpoint-preview-item">
                <span>Đối tượng</span>
                <strong>{form.respondentType}</strong>
              </div>
            </div>
          </div>

          <div className="preview-block touchpoint-preview-block">
            <div className="preview-block__top">
              <span>Template mapping</span>
              <strong>{mappedTemplates.length} template</strong>
            </div>
            {mappedTemplates.length > 0 ? (
              <div className="touchpoint-preview-mapping">
                {mappedTemplates.map((mapping) => {
                  const template = templateRecords.find((item) => item.id === mapping.templateId)

                  return (
                    <div key={mapping.templateId} className="touchpoint-preview-mapping__item">
                      <div>
                        <strong>{template?.name ?? mapping.templateName}</strong>
                        <span>{mapping.templateCode}</span>
                      </div>
                      <div className="touchpoint-preview-mapping__meta">
                        {mapping.isDefault ? (
                          <span className="touchpoint-badge touchpoint-badge--default">Mặc định</span>
                        ) : null}
                        <StatusChip status={template?.status ?? 'Active'} />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="comment-preview">Chưa chọn template nào cho touchpoint này.</div>
            )}
          </div>
        </aside>
      </div>
    </section>
  )

  function handleTouchpointTypeChange(nextType: TouchpointType) {
    setForm((current) => {
      const nextScreenCode = getScreenCodeForType(nextType, current.productType, current.screenCode)
      const nextSurveyType: TouchpointSurveyType =
        nextType === 'survey'
          ? current.surveyType === 'Không áp dụng'
            ? 'CSAT'
            : current.surveyType
          : 'Không áp dụng'

      return {
        ...current,
        touchpointType: nextType,
        surveyType: nextSurveyType,
        screenCode: nextScreenCode,
        screenName: getScreenName(nextScreenCode),
      }
    })

    if (nextType !== 'survey') {
      setSelectedTemplateIds([])
      setDefaultTemplateId(null)
    }
  }

  function handleProductTypeChange(nextProductType: ProductType) {
    setForm((current) => {
      const nextScreenCode = getScreenCodeForType(current.touchpointType, nextProductType, current.screenCode)

      return {
        ...current,
        productType: nextProductType,
        screenCode: nextScreenCode,
        screenName: getScreenName(nextScreenCode),
      }
    })
  }

  function handleScreenCodeChange(nextScreenCode: string) {
    setForm((current) => ({
      ...current,
      screenCode: nextScreenCode,
      screenName: getScreenName(nextScreenCode),
    }))
  }

  function toggleTemplate(templateId: string) {
    setSelectedTemplateIds((current) => {
      if (current.includes(templateId)) {
        const next = current.filter((item) => item !== templateId)
        if (defaultTemplateId === templateId) {
          setDefaultTemplateId(next[0] ?? null)
        }
        return next
      }

      const next = [...current, templateId]
      if (!defaultTemplateId) {
        setDefaultTemplateId(templateId)
      }
      return next
    })
  }
}

function toFormState(record: TouchpointRecord): TouchpointFormState {
  return {
    code: record.code,
    name: record.name,
    touchpointType: record.touchpointType,
    sourceSystem: record.sourceSystem,
    product: record.product,
    productType: record.productType,
    program: record.program,
    respondentType: record.respondentType,
    surveyType: record.surveyType,
    triggerEvent: record.triggerEvent,
    screenCode: record.screenCode,
    screenName: record.screenName,
    ownerTeam: record.ownerTeam,
    status: record.status,
  }
}

function createDraftTouchpoint(): TouchpointRecord {
  return {
    id: 'draft-touchpoint',
    code: '',
    name: '',
    touchpointType: 'survey',
    sourceSystem: 'CX Automation',
    product: 'Rino Edu',
    productType: 'Tutor',
    program: 'Tiáº¿ng Anh Cambridge',
    respondentType: 'Phụ huynh',
    surveyType: 'CSAT',
    triggerEvent: '',
    screenCode: 'online_learning_survey',
    screenName: 'MÃ n hÃ¬nh kháº£o sÃ¡t hÃ nh trÃ¬nh há»c Online',
    status: 'Active',
    ownerTeam: 'ChÄƒm sÃ³c khÃ¡ch hÃ ng',
    recordType: 'survey_feedback',
    updatedAt: '01/04/2026',
    updatedBy: 'Codex',
    templates: [],
  }
}

function getScreenCodeForType(
  touchpointType: TouchpointType,
  productType: ProductType,
  currentScreenCode: string,
) {
  const allowedOptions = getScreenOptionsByType(touchpointType)
  const hasCurrent = allowedOptions.some((option) => option.code === currentScreenCode)

  if (hasCurrent) {
    return currentScreenCode
  }

  if (touchpointType === 'survey') {
    return getDefaultScreenCode(touchpointType, productType)
  }

  return allowedOptions[0]?.code ?? currentScreenCode
}
