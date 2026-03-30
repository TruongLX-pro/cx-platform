export type SurveyType = 'CSAT' | 'NPS' | 'CES' | 'CUSTOM'
export type RespondentType = 'Phụ huynh' | 'Học sinh'
export type ObjectMode = 'single' | 'multi'
export type TemplateStatus = 'Nháp' | 'Đang hoạt động' | 'Ngừng sử dụng' | 'Lưu trữ'
export type QuestionType = 'Rating 1-5' | 'NPS 0-10' | 'Text'

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
  id: string
  name: string
  sourceSystem: string
  product: string
  program: string
  status: 'Active' | 'Inactive'
  isDefault: boolean
  displayOrder: number
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
