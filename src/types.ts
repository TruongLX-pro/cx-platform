export type SurveyType = 'CSAT' | 'NPS' | 'CES' | 'CUSTOM'
export type RespondentType = 'Phụ huynh' | 'Học sinh'
export type ObjectMode = 'single' | 'multi'
export type TemplateStatus = 'Nháp' | 'Đang hoạt động' | 'Ngừng sử dụng' | 'Lưu trữ'
export type QuestionType = 'Rating 1-5' | 'NPS 0-10' | 'Text'
export type TouchpointType = 'survey' | 'complaint' | 'support'
export type TouchpointSurveyType = SurveyType | 'Không áp dụng'
export type TouchpointStatus = 'Active' | 'Inactive'
export type ProductType = 'Tutor' | 'Digital' | 'Station'

export interface TemplateObject {
  id: string
  type: string
  name: string
  refCode: string
  displayOrder: number
  question: string
  questionType: QuestionType
  required: boolean
  allowComment: boolean
  minScore?: number
  maxScore?: number
}

export interface TouchpointUsage {
  routeId: string
  id: string
  name: string
  sourceSystem: string
  product: string
  productType: ProductType
  program: string
  status: TouchpointStatus
  isDefault: boolean
  displayOrder: number
}

export interface TouchpointTemplateMapping {
  templateId: string
  templateCode: string
  templateName: string
  isDefault: boolean
  status: TouchpointStatus
  displayOrder: number
}

export interface TouchpointRecord {
  id: string
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
  status: TouchpointStatus
  ownerTeam: string
  recordType: 'survey_feedback' | 'complaint_case' | 'issue_report'
  updatedAt: string
  updatedBy: string
  templates: TouchpointTemplateMapping[]
}

export interface TemplateRecord {
  id: string
  code: string
  name: string
  surveyType: SurveyType
  goal: string
  respondentType: RespondentType
  objectMode: ObjectMode
  status: TemplateStatus
  ownerTeam: string
  updatedAt: string
  updatedBy: string
  objects: TemplateObject[]
  touchpoints: TouchpointUsage[]
}
