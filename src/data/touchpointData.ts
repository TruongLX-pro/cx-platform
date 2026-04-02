import { templateRecords } from './templateData'
import type {
  ProductType,
  RespondentType,
  TemplateRecord,
  TouchpointRecord,
  TouchpointStatus,
  TouchpointSurveyType,
  TouchpointTemplateMapping,
  TouchpointType,
  TouchpointUsage,
} from '../types'

const templateById = new Map(templateRecords.map((template) => [template.id, template]))

function buildTemplateMapping(
  templateId: string,
  displayOrder: number,
  isDefault = false,
  status: TouchpointStatus = 'Active',
): TouchpointTemplateMapping {
  const template = templateById.get(templateId) ?? templateRecords[0]

  return {
    templateId: template.id,
    templateCode: template.code,
    templateName: template.name,
    isDefault,
    status,
    displayOrder,
  }
}

export interface TouchpointScreenOption {
  code: string
  name: string
  touchpointType: TouchpointType
  recordType: TouchpointRecord['recordType']
}

export const productOptionsByType: Record<ProductType, string[]> = {
  Tutor: ['Rino Edu'],
  Station: ['Rino Station'],
  Digital: ['Rino Digi', 'Ieltspeed'],
}

export const programOptionsByProduct: Record<string, string[]> = {
  'Rino Edu': [
    'Tiếng Anh Cambridge',
    'Tiếng Anh Kindie Tutor',
    'Chương trình Toán tư duy Tutor',
  ],
  'Rino Station': ['Tiếng Anh Station', 'Toán tư duy Station'],
  'Rino Digi': ['Tiếng Anh Digital Teacher'],
  Ieltspeed: ['Tiếng Anh IELTS'],
}

export const sourceSystemsByTouchpointType: Record<TouchpointType, string[]> = {
  survey: ['CX Automation', 'CRM', 'Station Ops', 'Digital App'],
  complaint: ['Care CRM', 'Station Ops'],
  support: ['App/Web', 'Digital App'],
}

export const touchpointRecords: TouchpointRecord[] = [
  {
    id: 'tp-tutor-mid-course',
    code: 'TP_TUTOR_MID_COURSE',
    name: 'Khảo sát giữa khóa Tutor',
    touchpointType: 'survey',
    sourceSystem: 'CX Automation',
    product: 'Rino Edu',
    productType: 'Tutor',
    program: 'Tiếng Anh Cambridge',
    respondentType: 'Phụ huynh',
    surveyType: 'CSAT',
    triggerEvent: 'Hoàn thành 50% lộ trình',
    screenCode: 'online_learning_survey',
    screenName: 'Màn hình khảo sát hành trình học Online',
    status: 'Active',
    ownerTeam: 'Chăm sóc khách hàng',
    recordType: 'survey_feedback',
    updatedAt: '28/03/2026',
    updatedBy: 'Linh Vũ',
    templates: [buildTemplateMapping('mid-course-multi-object', 1, true)],
  },
  {
    id: 'tp-station-post-trial',
    code: 'TP_STATION_POST_TRIAL',
    name: 'Khảo sát sau buổi học thử tại cơ sở',
    touchpointType: 'survey',
    sourceSystem: 'Station Ops',
    product: 'Rino Station',
    productType: 'Station',
    program: 'Tiếng Anh Station',
    respondentType: 'Phụ huynh',
    surveyType: 'CES',
    triggerEvent: 'Kết thúc học thử tại cơ sở',
    screenCode: 'offline_learning_survey',
    screenName: 'Màn hình khảo sát hành trình học tại cơ sở',
    status: 'Active',
    ownerTeam: 'Vận hành cơ sở',
    recordType: 'survey_feedback',
    updatedAt: '29/03/2026',
    updatedBy: 'Minh Hoàng',
    templates: [buildTemplateMapping('parent-care-quarterly', 1, true)],
  },
  {
    id: 'tp-digi-quarterly',
    code: 'TP_DIGI_QUARTERLY',
    name: 'Khảo sát định kỳ Digital',
    touchpointType: 'survey',
    sourceSystem: 'Digital App',
    product: 'Rino Digi',
    productType: 'Digital',
    program: 'Tiếng Anh Digital Teacher',
    respondentType: 'Học sinh',
    surveyType: 'CUSTOM',
    triggerEvent: 'Kết thúc giai đoạn học trên ứng dụng',
    screenCode: 'online_learning_survey',
    screenName: 'Màn hình khảo sát hành trình học Online',
    status: 'Active',
    ownerTeam: 'Digital Product',
    recordType: 'survey_feedback',
    updatedAt: '26/03/2026',
    updatedBy: 'Thảo Phạm',
    templates: [buildTemplateMapping('student-open-feedback', 1, true)],
  },
  {
    id: 'tp-ielts-end-course',
    code: 'TP_IELTS_END_COURSE',
    name: 'Khảo sát cuối khóa IELTS',
    touchpointType: 'survey',
    sourceSystem: 'CRM',
    product: 'Ieltspeed',
    productType: 'Digital',
    program: 'Tiếng Anh IELTS',
    respondentType: 'Học sinh',
    surveyType: 'NPS',
    triggerEvent: 'Kết thúc khóa học',
    screenCode: 'online_learning_survey',
    screenName: 'Màn hình khảo sát hành trình học Online',
    status: 'Inactive',
    ownerTeam: 'Khối học thuật',
    recordType: 'survey_feedback',
    updatedAt: '30/03/2026',
    updatedBy: 'Trang Đỗ',
    templates: [buildTemplateMapping('end-course-nps-single', 1, true)],
  },
  {
    id: 'tp-care-complaint-case',
    code: 'TP_CARE_COMPLAINT_CASE',
    name: 'Tiếp nhận khiếu nại CSKH',
    touchpointType: 'complaint',
    sourceSystem: 'Care CRM',
    product: 'Rino Edu',
    productType: 'Tutor',
    program: 'Chương trình Toán tư duy Tutor',
    respondentType: 'Phụ huynh',
    surveyType: 'Không áp dụng',
    triggerEvent: 'Nhận khiếu nại từ hotline / form',
    screenCode: 'care_complaint_case',
    screenName: 'Màn hình tiếp nhận khiếu nại',
    status: 'Active',
    ownerTeam: 'Chăm sóc khách hàng',
    recordType: 'complaint_case',
    updatedAt: '27/03/2026',
    updatedBy: 'Hà An',
    templates: [],
  },
  {
    id: 'tp-student-issue-report',
    code: 'TP_STUDENT_ISSUE_REPORT',
    name: 'Báo lỗi trong quá trình học',
    touchpointType: 'support',
    sourceSystem: 'App/Web',
    product: 'Rino Digi',
    productType: 'Digital',
    program: 'Tiếng Anh Digital Teacher',
    respondentType: 'Học sinh',
    surveyType: 'Không áp dụng',
    triggerEvent: 'Học sinh gửi báo lỗi trên ứng dụng',
    screenCode: 'student_issue_report',
    screenName: 'Màn hình báo lỗi trong quá trình học',
    status: 'Active',
    ownerTeam: 'Digital Product',
    recordType: 'issue_report',
    updatedAt: '31/03/2026',
    updatedBy: 'Khánh Lê',
    templates: [],
  },
  {
    id: 'tp-station-complaint-case',
    code: 'TP_STATION_COMPLAINT_CASE',
    name: 'Tiếp nhận khiếu nại tại cơ sở',
    touchpointType: 'complaint',
    sourceSystem: 'Station Ops',
    product: 'Rino Station',
    productType: 'Station',
    program: 'Toán tư duy Station',
    respondentType: 'Phụ huynh',
    surveyType: 'Không áp dụng',
    triggerEvent: 'Tiếp nhận phản hồi tại quầy',
    screenCode: 'care_complaint_case',
    screenName: 'Màn hình tiếp nhận khiếu nại',
    status: 'Inactive',
    ownerTeam: 'Vận hành cơ sở',
    recordType: 'complaint_case',
    updatedAt: '25/03/2026',
    updatedBy: 'Phương Mai',
    templates: [],
  },
]

export const touchpointSummaryMetrics = {
  total: touchpointRecords.length,
  survey: touchpointRecords.filter((item) => item.touchpointType === 'survey').length,
  complaint: touchpointRecords.filter((item) => item.touchpointType === 'complaint').length,
  support: touchpointRecords.filter((item) => item.touchpointType === 'support').length,
  active: touchpointRecords.filter((item) => item.status === 'Active').length,
}

export const touchpointTypeOptions: TouchpointType[] = ['survey', 'complaint', 'support']
export const touchpointStatusOptions: TouchpointStatus[] = ['Active', 'Inactive']
export const productTypeOptions: ProductType[] = ['Tutor', 'Digital', 'Station']
export const productOptions = Object.values(productOptionsByType).flat()
export const programOptions = Object.values(programOptionsByProduct).flat()
export const sourceSystemOptions = Object.values(sourceSystemsByTouchpointType).flat()
export const respondentOptions: RespondentType[] = ['Phụ huynh', 'Học sinh']
export const surveyTypeOptions: TouchpointSurveyType[] = ['CSAT', 'NPS', 'CES', 'CUSTOM', 'Không áp dụng']
export const touchpointScreenOptions: TouchpointScreenOption[] = [
  {
    code: 'online_learning_survey',
    name: 'Màn hình khảo sát hành trình học Online',
    touchpointType: 'survey',
    recordType: 'survey_feedback',
  },
  {
    code: 'offline_learning_survey',
    name: 'Màn hình khảo sát hành trình học tại cơ sở',
    touchpointType: 'survey',
    recordType: 'survey_feedback',
  },
  {
    code: 'care_complaint_case',
    name: 'Màn hình tiếp nhận khiếu nại',
    touchpointType: 'complaint',
    recordType: 'complaint_case',
  },
  {
    code: 'student_issue_report',
    name: 'Màn hình báo lỗi trong quá trình học',
    touchpointType: 'support',
    recordType: 'issue_report',
  },
]

export const touchpointTypeLabels: Record<TouchpointType, string> = {
  survey: 'Khảo sát',
  complaint: 'Khiếu nại',
  support: 'Báo lỗi',
}

export const recordTypeLabels: Record<TouchpointRecord['recordType'], string> = {
  survey_feedback: 'survey_feedback',
  complaint_case: 'complaint_case',
  issue_report: 'issue_report',
}

export function getScreenName(screenCode: string) {
  return touchpointScreenOptions.find((item) => item.code === screenCode)?.name ?? 'Màn hình tùy chỉnh'
}

export function getScreenOptionsByType(touchpointType: TouchpointType) {
  return touchpointScreenOptions.filter((item) => item.touchpointType === touchpointType)
}

export function getDefaultScreenCode(
  touchpointType: TouchpointType,
  productType: ProductType,
) {
  if (touchpointType === 'complaint') {
    return 'care_complaint_case'
  }

  if (touchpointType === 'support') {
    return 'student_issue_report'
  }

  return productType === 'Station' ? 'offline_learning_survey' : 'online_learning_survey'
}

export function getRecordTypeByTouchpointType(touchpointType: TouchpointType): TouchpointRecord['recordType'] {
  if (touchpointType === 'complaint') {
    return 'complaint_case'
  }

  if (touchpointType === 'support') {
    return 'issue_report'
  }

  return 'survey_feedback'
}

export function getProductOptionsByType(productType: ProductType) {
  return productOptionsByType[productType] ?? []
}

export function getDefaultProductForType(productType: ProductType) {
  return getProductOptionsByType(productType)[0] ?? ''
}

export function getProgramOptionsByProduct(product: string) {
  return programOptionsByProduct[product] ?? []
}

export function getDefaultProgramForProduct(product: string) {
  return getProgramOptionsByProduct(product)[0] ?? ''
}

export function getSourceSystemOptionsByType(touchpointType: TouchpointType) {
  return sourceSystemsByTouchpointType[touchpointType] ?? []
}

export function getDefaultSourceSystem(touchpointType: TouchpointType, productType: ProductType) {
  if (touchpointType === 'complaint') {
    return productType === 'Station' ? 'Station Ops' : 'Care CRM'
  }

  if (touchpointType === 'support') {
    return productType === 'Digital' ? 'App/Web' : 'Digital App'
  }

  if (productType === 'Station') {
    return 'Station Ops'
  }

  if (productType === 'Digital') {
    return 'Digital App'
  }

  return 'CX Automation'
}

export function buildTouchpointTemplateMappings(
  templateIds: string[],
  defaultTemplateId: string | null,
) {
  return templateIds.map((templateId, index) => {
    const template = templateById.get(templateId) ?? templateRecords[0]

    return {
      templateId: template.id,
      templateCode: template.code,
      templateName: template.name,
      isDefault: template.id === defaultTemplateId,
      status: 'Active' as TouchpointStatus,
      displayOrder: index + 1,
    }
  })
}

export function getTouchpointTemplateSummary(templateIds: string[], defaultTemplateId: string | null) {
  return buildTouchpointTemplateMappings(templateIds, defaultTemplateId)
}

export function isTemplateCompatibleWithTouchpoint(
  template: TemplateRecord,
  context: {
    touchpointType: TouchpointType
    respondentType: RespondentType
    surveyType: TouchpointSurveyType
  },
) {
  if (context.touchpointType !== 'survey') {
    return false
  }

  if (template.status !== 'Đang hoạt động') {
    return false
  }

  if (template.respondentType !== context.respondentType) {
    return false
  }

  return template.surveyType === context.surveyType
}

export function getCompatibleTemplatesForTouchpoint(context: {
  touchpointType: TouchpointType
  respondentType: RespondentType
  surveyType: TouchpointSurveyType
}) {
  return templateRecords.filter((template) => isTemplateCompatibleWithTouchpoint(template, context))
}

export function getTouchpointsUsingTemplate(templateId: string): TouchpointUsage[] {
  return touchpointRecords
    .filter((touchpoint) => touchpoint.templates.some((mapping) => mapping.templateId === templateId))
    .map((touchpoint) => {
      const mapping = touchpoint.templates.find((item) => item.templateId === templateId)

      return {
        routeId: touchpoint.id,
        id: touchpoint.code,
        name: touchpoint.name,
        sourceSystem: touchpoint.sourceSystem,
        product: touchpoint.product,
        productType: touchpoint.productType,
        program: touchpoint.program,
        status: touchpoint.status,
        isDefault: mapping?.isDefault ?? false,
        displayOrder: mapping?.displayOrder ?? 0,
      }
    })
    .sort((left, right) => left.displayOrder - right.displayOrder)
}

export function upsertTouchpointRecord(nextRecord: TouchpointRecord) {
  const currentIndex = touchpointRecords.findIndex((record) => record.id === nextRecord.id)

  if (currentIndex >= 0) {
    touchpointRecords[currentIndex] = nextRecord
    return nextRecord
  }

  touchpointRecords.unshift(nextRecord)
  return nextRecord
}
