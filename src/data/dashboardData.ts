export interface DashboardKpi {
  label: string
  value: string
  note: string
  tone?: 'default' | 'warning' | 'danger'
}

export interface RankedMetric {
  label: string
  value: number
  note?: string
  tone?: 'default' | 'warning' | 'danger'
}

export interface TouchpointRiskRow {
  name: string
  feedbackVolume: string
  score: string
  negativeRate: string
}

export interface BottomRankItem {
  rank: number
  name: string
  score: string
}

export interface RawDataRecord {
  recordId: string
  recordType: 'survey_feedback' | 'complaint_case'
  sourceSystem: string
  touchpointId: string
  surveyTemplateId?: string
  caseId?: string
  surveyType?: string
  responseTime: string
  productName: string
  programName: string
  subjectName: string
  studentLevel: string
  studentAge: number
  centerName?: string | null
  respondentId: string
  respondentType: string
  objectType?: string
  objectName?: string
  scoreValueRaw?: string
  scoreValueNormalized?: string
  negativeFlag?: boolean
  complaintCategory?: string
  processingStatus?: string
  sourceRecordId: string
  feedbackText: string
}

export const onlineKpis: DashboardKpi[] = [
  { label: 'Điểm khảo sát trung bình', value: '4.6/5', note: '+2.4% trong kỳ lọc' },
  { label: 'Tổng khảo sát', value: '12,450', note: 'khảo sát hợp lệ' },
  { label: 'Tổng khiếu nại', value: '154', note: 'Cảnh báo', tone: 'danger' },
  { label: 'Thời gian xử lý khiếu nại TB', value: '2.5 ngày', note: 'trung bình trong kỳ', tone: 'warning' },
]

export const offlineKpis: DashboardKpi[] = [
  { label: 'Điểm khảo sát trung bình', value: '4.6/5.0', note: '+0.2' },
  { label: 'Tổng khảo sát', value: '8,420', note: '+4.2%' },
  { label: 'Tổng khiếu nại', value: '86', note: 'Cần theo dõi', tone: 'danger' },
  { label: 'Thời gian xử lý khiếu nại TB', value: '4.2h', note: '+6%', tone: 'warning' },
]

export const parentSurveyMetrics: RankedMetric[] = [
  { label: 'Giáo viên', value: 4.8 },
  { label: 'Chương trình học', value: 4.5 },
  { label: 'Nhân viên chăm sóc', value: 4.2, tone: 'warning' },
]

export const studentSurveyMetrics: RankedMetric[] = [{ label: 'Giáo viên', value: 4.7 }]

export const complaintByObject: RankedMetric[] = [
  { label: 'Giáo viên', value: 45 },
  { label: 'Chương trình học', value: 25 },
  { label: 'CSKH', value: 20 },
  { label: 'Khác', value: 10 },
]

export const complaintStatusMetrics: RankedMetric[] = [
  { label: 'Mới', value: 12, tone: 'danger' },
  { label: 'Đang xử lý', value: 45, tone: 'warning' },
  { label: 'Đã xử lý', value: 97, tone: 'default' },
]

export const complaintTimeBuckets: RankedMetric[] = [
  { label: 'Trong ngày', value: 54 },
  { label: '1-3 ngày', value: 24, tone: 'default' },
  { label: '4-7 ngày', value: 14, tone: 'warning' },
  { label: '> 7 ngày', value: 8, tone: 'danger' },
]

export const onlineTouchpointRisk: TouchpointRiskRow[] = [
  { name: 'Khảo sát sau buổi đầu tiên', feedbackVolume: '1,240', score: '3.2', negativeRate: '12.5%' },
  { name: 'Phản hồi học sinh sau buổi học', feedbackVolume: '8,500', score: '3.8', negativeRate: '6.8%' },
  { name: 'Khảo sát giữa khóa', feedbackVolume: '2,100', score: '4.1', negativeRate: '3.2%' },
  { name: 'Khảo sát cuối khóa', feedbackVolume: '1,450', score: '4.4', negativeRate: '1.8%' },
]

export const offlineCenterRisk: RankedMetric[] = [
  { label: 'Cơ sở Linh Đàm', value: 3.8, tone: 'danger' },
  { label: 'Cơ sở Nguyễn Tuân', value: 3.9, tone: 'danger' },
  { label: 'Cơ sở Long Biên', value: 4.1, tone: 'warning' },
  { label: 'Cơ sở Mỹ Đình', value: 4.4 },
]

export const offlineTouchpointRisk: TouchpointRiskRow[] = [
  { name: 'Đón khách tại sảnh', feedbackVolume: '15%', score: 'Trung bình', negativeRate: 'Ưu tiên trung bình' },
  { name: 'Tư vấn trực tiếp (F2F)', feedbackVolume: '8%', score: 'Thấp', negativeRate: 'Ưu tiên thấp' },
  { name: 'Họp phụ huynh định kỳ', feedbackVolume: '24%', score: 'Cao', negativeRate: 'Ưu tiên cao' },
]

export const bottomTeachers: BottomRankItem[] = [
  { rank: 1, name: 'Nguyễn Văn A', score: '62%' },
  { rank: 2, name: 'Lê Thị B', score: '65%' },
  { rank: 3, name: 'Trần Văn C', score: '68%' },
  { rank: 4, name: 'Phạm Minh D', score: '70%' },
  { rank: 5, name: 'Hoàng Xuân E', score: '72%' },
]

export const bottomStaff: BottomRankItem[] = [
  { rank: 1, name: 'Ngô Bảo F', score: '58%' },
  { rank: 2, name: 'Vũ Thị Q', score: '61%' },
  { rank: 3, name: 'Đặng Văn H', score: '64%' },
  { rank: 4, name: 'Bùi Minh I', score: '67%' },
  { rank: 5, name: 'Đỗ Xuân J', score: '70%' },
]

export const bottomPrograms: BottomRankItem[] = [
  { rank: 1, name: 'IELTS Foundation', score: '65%' },
  { rank: 2, name: 'Rinoedu Level 1', score: '72%' },
  { rank: 3, name: 'Rinodigi Starter', score: '74%' },
  { rank: 4, name: 'Business English', score: '82%' },
  { rank: 5, name: 'Phát âm chuẩn', score: '85%' },
]

export const rawDataRecords: RawDataRecord[] = [
  {
    recordId: 'SR_20260324_0001',
    recordType: 'survey_feedback',
    sourceSystem: 'Care',
    touchpointId: 'TP_CARE_MID_COURSE',
    surveyTemplateId: 'SVT_MID_COURSE_MULTI_OBJECT_V1',
    surveyType: 'CSAT',
    responseTime: '24/03/2026 10:00',
    productName: 'Rinoedu',
    programName: 'Tiếng Anh Cam',
    subjectName: 'Tiếng Anh',
    studentLevel: 'Starters',
    studentAge: 8,
    centerName: null,
    respondentId: 'PAR_0001',
    respondentType: 'Phụ huynh',
    objectType: 'Giáo viên',
    objectName: 'Trần Thị B',
    scoreValueRaw: '5',
    scoreValueNormalized: '100',
    negativeFlag: false,
    sourceRecordId: 'CARE_SURVEY_8899001',
    feedbackText: 'Giáo viên dạy rất tốt.',
  },
  {
    recordId: 'SR_20260324_0001_OBJ2',
    recordType: 'survey_feedback',
    sourceSystem: 'Care',
    touchpointId: 'TP_CARE_MID_COURSE',
    surveyTemplateId: 'SVT_MID_COURSE_MULTI_OBJECT_V1',
    surveyType: 'CSAT',
    responseTime: '24/03/2026 10:00',
    productName: 'Rinoedu',
    programName: 'Tiếng Anh Cam',
    subjectName: 'Tiếng Anh',
    studentLevel: 'Starters',
    studentAge: 8,
    centerName: null,
    respondentId: 'PAR_0001',
    respondentType: 'Phụ huynh',
    objectType: 'Chương trình học',
    objectName: 'Tiếng Anh Cam',
    scoreValueRaw: '3',
    scoreValueNormalized: '60',
    negativeFlag: true,
    sourceRecordId: 'CARE_SURVEY_8899001',
    feedbackText: 'Nội dung học hơi nhanh.',
  },
  {
    recordId: 'CC_20260325_0001',
    recordType: 'complaint_case',
    sourceSystem: 'Ticket',
    touchpointId: 'TP_TICKET_COMPLAINT',
    caseId: 'CASE_12345',
    responseTime: '25/03/2026 11:00',
    productName: 'Station',
    programName: 'Tiếng Anh Station',
    subjectName: 'Tiếng Anh',
    studentLevel: 'Movers',
    studentAge: 10,
    centerName: 'Station Center 1',
    respondentId: 'PAR_0100',
    respondentType: 'Phụ huynh',
    objectType: 'Giáo viên',
    objectName: 'Lê Thị D',
    complaintCategory: 'Chất lượng giảng dạy',
    processingStatus: 'Đang xử lý',
    sourceRecordId: 'TICKET_220099',
    feedbackText: 'Phụ huynh phản ánh giáo viên vào lớp muộn.',
  },
]
