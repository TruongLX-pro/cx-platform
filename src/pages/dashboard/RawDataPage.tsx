import { useMemo, useState } from 'react'
import { rawDataRecords } from '../../data/dashboardData'

export function RawDataPage() {
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(
    rawDataRecords[0]?.recordId ?? null,
  )

  const selectedRecord = useMemo(
    () => rawDataRecords.find((record) => record.recordId === selectedRecordId) ?? null,
    [selectedRecordId],
  )

  const surveyCount = rawDataRecords.filter((record) => record.recordType === 'survey_feedback').length
  const complaintCount = rawDataRecords.filter((record) => record.recordType === 'complaint_case').length
  const bugReportCount = 156
  const missingMappingCount = 15

  return (
    <section className="raw-data-page">
      <div className="page-header page-header--shell">
        <div>
          <h1>Du lieu phan hoi tap trung</h1>
          <p>Tra cuu, loc va xuat du lieu phan hoi khao sat va khieu nai theo nhu cau.</p>
        </div>
        <div className="page-header__actions">
          <button className="button button--ghost" type="button">
            <span className="material-symbols-outlined" aria-hidden="true">
              refresh
            </span>
            Lam moi du lieu
          </button>
          <button className="button button--primary" type="button">
            <span className="material-symbols-outlined" aria-hidden="true">
              download
            </span>
            Xuat du lieu
          </button>
        </div>
      </div>

      <div className="stats-grid stats-grid--raw">
        <SummaryCard label="Tong ban ghi" value={rawDataRecords.length} icon="database" />
        <SummaryCard label="Ban ghi khao sat" value={surveyCount} accent="primary" icon="poll" />
        <SummaryCard label="Ban ghi khieu nai" value={complaintCount} icon="campaign" />
        <SummaryCard label="Ban ghi bao loi" value={bugReportCount} accent="danger" icon="bug_report" />
        <SummaryCard label="Thieu mapping" value={missingMappingCount} accent="warning" icon="warning" />
      </div>

      <section className="filter-card filter-card--shell">
        <div className="filter-grid raw-filter-grid">
          <FilterBox label="Loai du lieu" value="Tat ca" />
          <FilterBox label="He thong nguon" value="Tat ca" />
          <FilterBox label="Thoi gian" value="01/03/2026 - 24/03/2026" />
          <FilterBox label="San pham" value="Tieng Anh Cam" />
          <FilterBox label="Chuong trinh" value="Tat ca" />
          <FilterBox label="Nguoi phan hoi" value="Tim ten / SDT..." />
        </div>

        <div className="dashboard-filter-actions dashboard-filter-actions--between dashboard-filter-actions--topline">
          <div className="raw-filter-meta">
            <label className="raw-filter-check">
              <input type="checkbox" />
              <span>Chi xem Negative Flag</span>
            </label>
            <button className="button button--text" type="button">
              <span className="material-symbols-outlined" aria-hidden="true">
                filter_list
              </span>
              Bo loc nang cao
            </button>
          </div>

          <div className="dashboard-filter-actions">
            <button className="button button--minimal" type="button">
              Dat lai
            </button>
            <button className="button button--tinted" type="button">
              Ap dung
            </button>
          </div>
        </div>
      </section>

      <div className="raw-data-layout">
        <div className="table-card table-card--raw">
          <table className="data-table data-table--raw">
            <thead>
              <tr>
                <th>record_id</th>
                <th>record_type</th>
                <th>source_system</th>
                <th>touchpoint_id</th>
                <th>template / case</th>
                <th>survey_type</th>
                <th>response_time</th>
                <th>product_name</th>
                <th>program_name</th>
                <th>respondent_type</th>
                <th>object_type</th>
                <th>score_raw</th>
                <th>negative_flag</th>
                <th>processing_status</th>
              </tr>
            </thead>
            <tbody>
              {rawDataRecords.map((record) => (
                <tr
                  key={record.recordId}
                  className={selectedRecordId === record.recordId ? 'row-selected' : ''}
                  onClick={() => setSelectedRecordId(record.recordId)}
                >
                  <td className="code-cell">{record.recordId}</td>
                  <td>
                    <span
                      className={`survey-pill${
                        record.recordType === 'complaint_case' ? ' survey-pill--danger' : ''
                      }`}
                    >
                      {record.recordType}
                    </span>
                  </td>
                  <td>{record.sourceSystem}</td>
                  <td>{record.touchpointId}</td>
                  <td>{record.surveyTemplateId ?? record.caseId ?? '-'}</td>
                  <td>{record.surveyType ?? '-'}</td>
                  <td>{record.responseTime}</td>
                  <td>{record.productName}</td>
                  <td>{record.programName}</td>
                  <td>{record.respondentType}</td>
                  <td>{record.objectType ?? '-'}</td>
                  <td>{record.scoreValueRaw ?? '-'}</td>
                  <td>{record.negativeFlag === undefined ? '-' : record.negativeFlag ? 'Co' : 'Khong'}</td>
                  <td>{record.processingStatus ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="raw-detail">
          <div className="form-card">
            <div className="section-header section-header--tight">
              <h2>Chi tiet ban ghi</h2>
            </div>

            {selectedRecord ? (
              <div className="raw-detail__sections">
                <DetailSection
                  title="Thong tin chung"
                  rows={[
                    ['record_id', selectedRecord.recordId],
                    ['record_type', selectedRecord.recordType],
                    ['source_system', selectedRecord.sourceSystem],
                    ['response_time', selectedRecord.responseTime],
                    ['touchpoint_id', selectedRecord.touchpointId],
                    ['source_record_id', selectedRecord.sourceRecordId],
                  ]}
                />
                <DetailSection
                  title="Ngu canh nghiep vu"
                  rows={[
                    ['product_name', selectedRecord.productName],
                    ['program_name', selectedRecord.programName],
                    ['subject_name', selectedRecord.subjectName],
                    ['student_level', selectedRecord.studentLevel],
                    ['student_age', String(selectedRecord.studentAge)],
                    ['center_name', selectedRecord.centerName ?? '-'],
                    ['respondent_id', selectedRecord.respondentId],
                    ['respondent_type', selectedRecord.respondentType],
                  ]}
                />

                {selectedRecord.recordType === 'survey_feedback' ? (
                  <DetailSection
                    title="Du lieu khao sat"
                    rows={[
                      ['survey_template_id', selectedRecord.surveyTemplateId ?? '-'],
                      ['survey_type', selectedRecord.surveyType ?? '-'],
                      ['object_type', selectedRecord.objectType ?? '-'],
                      ['object_name', selectedRecord.objectName ?? '-'],
                      ['score_value_raw', selectedRecord.scoreValueRaw ?? '-'],
                      ['score_value_normalized', selectedRecord.scoreValueNormalized ?? '-'],
                      ['negative_flag', selectedRecord.negativeFlag ? 'true' : 'false'],
                    ]}
                  />
                ) : (
                  <DetailSection
                    title="Du lieu khieu nai"
                    rows={[
                      ['case_id', selectedRecord.caseId ?? '-'],
                      ['complaint_category', selectedRecord.complaintCategory ?? '-'],
                      ['processing_status', selectedRecord.processingStatus ?? '-'],
                      ['object_type', selectedRecord.objectType ?? '-'],
                      ['object_name', selectedRecord.objectName ?? '-'],
                    ]}
                  />
                )}

                <div className="raw-feedback-box">
                  <span>feedback_text</span>
                  <p>{selectedRecord.feedbackText}</p>
                </div>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  )
}

function SummaryCard({
  label,
  value,
  accent,
  icon,
}: {
  label: string
  value: number
  accent?: 'primary' | 'warning' | 'danger'
  icon: string
}) {
  return (
    <article className={`stat-card${accent ? ` stat-card--${accent}` : ''}`}>
      <span>{label}</span>
      <div className="stat-card__value-row stat-card__value-row--between">
        <strong>{value}</strong>
        <span className="material-symbols-outlined stat-card__icon" aria-hidden="true">
          {icon}
        </span>
      </div>
    </article>
  )
}

function FilterBox({ label, value }: { label: string; value: string }) {
  return (
    <label className="field field--compact">
      <span>{label}</span>
      <div className="fake-select">{value}</div>
    </label>
  )
}

function DetailSection({
  title,
  rows,
}: {
  title: string
  rows: Array<[string, string]>
}) {
  return (
    <div className="raw-detail__section">
      <h3>{title}</h3>
      <dl className="raw-detail__list">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
