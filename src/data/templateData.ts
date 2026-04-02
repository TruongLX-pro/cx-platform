import type {
  ObjectMode,
  RespondentType,
  SurveyType,
  TemplateRecord,
  TemplateStatus,
} from '../types'

export const templateRecords: TemplateRecord[] = [
  {
    id: 'mid-course-multi-object',
    code: 'TPL_MID_COURSE_MULTI',
    name: 'Khảo sát giữa khóa nhiều đối tượng',
    surveyType: 'CSAT',
    goal: 'Đánh giá giữa khóa',
    respondentType: 'Phụ huynh',
    objectMode: 'multi',
    status: 'Đang hoạt động',
    ownerTeam: 'Chăm sóc khách hàng',
    updatedAt: '28/03/2026',
    updatedBy: 'Linh Vũ',
    objects: [
      {
        id: 'obj-teacher',
        type: 'Giáo viên',
        name: 'Giáo viên',
        refCode: 'GV',
        displayOrder: 1,
        question: 'Phụ huynh đánh giá chất lượng giảng dạy của giáo viên như thế nào?',
        questionType: 'Rating 1-5',
        required: true,
        allowComment: true,
        minScore: 1,
        maxScore: 5,
      },
      {
        id: 'obj-program',
        type: 'Chương trình học',
        name: 'Chương trình học',
        refCode: 'CT',
        displayOrder: 2,
        question: 'Nội dung chương trình hiện tại có phù hợp với nhu cầu học tập của học sinh không?',
        questionType: 'Rating 1-5',
        required: true,
        allowComment: true,
        minScore: 1,
        maxScore: 5,
      },
      {
        id: 'obj-care',
        type: 'CSKH',
        name: 'Nhân viên chăm sóc',
        refCode: 'CSKH',
        displayOrder: 3,
        question: 'Phụ huynh đánh giá mức độ hỗ trợ của bộ phận CSKH như thế nào?',
        questionType: 'Rating 1-5',
        required: false,
        allowComment: true,
        minScore: 1,
        maxScore: 5,
      },
    ],
    touchpoints: [],
  },
  {
    id: 'end-course-nps-single',
    code: 'TPL_END_COURSE_NPS',
    name: 'Khảo sát cuối khóa chuẩn NPS',
    surveyType: 'NPS',
    goal: 'Đo lường trung thành',
    respondentType: 'Học sinh',
    objectMode: 'single',
    status: 'Nháp',
    ownerTeam: 'Khối học thuật',
    updatedAt: '30/03/2026',
    updatedBy: 'Trang Đỗ',
    objects: [
      {
        id: 'obj-nps-program',
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
  },
  {
    id: 'trial-experience-csat',
    code: 'TPL_TRIAL_EXPERIENCE',
    name: 'Khảo sát trải nghiệm học thử',
    surveyType: 'CES',
    goal: 'Đánh giá học thử',
    respondentType: 'Phụ huynh',
    objectMode: 'single',
    status: 'Ngừng sử dụng',
    ownerTeam: 'Vận hành cơ sở',
    updatedAt: '21/03/2026',
    updatedBy: 'Minh Hoàng',
    objects: [
      {
        id: 'obj-trial-service',
        type: 'Trải nghiệm học thử',
        name: 'Trải nghiệm học thử',
        refCode: 'TRIAL',
        displayOrder: 1,
        question: 'Quá trình học thử và xác nhận lịch học có dễ dàng, rõ ràng không?',
        questionType: 'Rating 1-5',
        required: true,
        allowComment: true,
        minScore: 1,
        maxScore: 5,
      },
    ],
    touchpoints: [],
  },
  {
    id: 'parent-care-quarterly',
    code: 'TPL_PARENT_CARE_Q',
    name: 'Khảo sát định kỳ phụ huynh theo quý',
    surveyType: 'CUSTOM',
    goal: 'Khảo sát định kỳ',
    respondentType: 'Phụ huynh',
    objectMode: 'multi',
    status: 'Đang hoạt động',
    ownerTeam: 'Phòng trải nghiệm khách hàng',
    updatedAt: '26/03/2026',
    updatedBy: 'Thảo Phạm',
    objects: [
      {
        id: 'obj-parent-program',
        type: 'Chương trình học',
        name: 'Chương trình học',
        refCode: 'PRG',
        displayOrder: 1,
        question: 'Phụ huynh đánh giá chương trình học trong giai đoạn này như thế nào?',
        questionType: 'Rating 1-5',
        required: true,
        allowComment: true,
        minScore: 1,
        maxScore: 5,
      },
      {
        id: 'obj-parent-support',
        type: 'Hỗ trợ học vụ',
        name: 'Hỗ trợ học vụ',
        refCode: 'SUP',
        displayOrder: 2,
        question: 'Mức độ hỗ trợ từ đội ngũ học vụ có đáp ứng kỳ vọng của phụ huynh không?',
        questionType: 'Rating 1-5',
        required: true,
        allowComment: true,
        minScore: 1,
        maxScore: 5,
      },
    ],
    touchpoints: [],
  },
  {
    id: 'student-open-feedback',
    code: 'TPL_STUDENT_OPEN_TEXT',
    name: 'Khảo sát ý kiến mở của học sinh',
    surveyType: 'CUSTOM',
    goal: 'Góp ý mở',
    respondentType: 'Học sinh',
    objectMode: 'single',
    status: 'Lưu trữ',
    ownerTeam: 'Digital Product',
    updatedAt: '12/03/2026',
    updatedBy: 'Khánh Lê',
    objects: [
      {
        id: 'obj-open-text',
        type: 'Ý kiến chung',
        name: 'Ý kiến chung',
        refCode: 'OPEN',
        displayOrder: 1,
        question: 'Điều gì cần cải thiện để trải nghiệm học tập của bạn tốt hơn?',
        questionType: 'Text',
        required: true,
        allowComment: false,
      },
    ],
    touchpoints: [],
  },
]

export const summaryMetrics = {
  total: templateRecords.length,
  active: templateRecords.filter((item) => item.status === 'Đang hoạt động').length,
  draft: templateRecords.filter((item) => item.status === 'Nháp').length,
  multiObject: templateRecords.filter((item) => item.objectMode === 'multi').length,
}

export const surveyTypeOptions: SurveyType[] = ['CSAT', 'NPS', 'CES', 'CUSTOM']
export const respondentOptions: RespondentType[] = ['Phụ huynh', 'Học sinh']
export const objectModeOptions: ObjectMode[] = ['single', 'multi']
export const templateStatusOptions: TemplateStatus[] = [
  'Nháp',
  'Đang hoạt động',
  'Ngừng sử dụng',
  'Lưu trữ',
]

export const ownerTeamOptions = [
  'Chăm sóc khách hàng',
  'Khối học thuật',
  'Vận hành cơ sở',
  'Phòng trải nghiệm khách hàng',
  'Digital Product',
]

export const sourceSystemOptions = ['CX Automation', 'CRM', 'Station Ops', 'Digital App']

export function upsertTemplateRecord(nextRecord: TemplateRecord) {
  const currentIndex = templateRecords.findIndex((record) => record.id === nextRecord.id)

  if (currentIndex >= 0) {
    templateRecords[currentIndex] = nextRecord
    return nextRecord
  }

  templateRecords.unshift(nextRecord)
  return nextRecord
}
