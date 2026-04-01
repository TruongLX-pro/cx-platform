import { CustomSelect } from '../../components/CustomSelect'

export type DashboardTab = 'tutor' | 'station' | 'rino-digi'

export function DashboardHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="page-header page-header--shell">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="page-header__actions page-header__actions--dashboard">
        <button className="button button--ghost" type="button">
          <span className="material-symbols-outlined" aria-hidden="true">
            refresh
          </span>
          Làm mới
        </button>
        <button className="button button--primary" type="button">
          <span className="material-symbols-outlined" aria-hidden="true">
            ios_share
          </span>
          Xuất báo cáo
        </button>
      </div>
    </div>
  )
}

export function DashboardTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: DashboardTab
  setActiveTab: (tab: DashboardTab) => void
}) {
  return (
    <div className="page-tabs">
      <button className={`page-tab${activeTab === 'tutor' ? ' page-tab--active' : ''}`} type="button" onClick={() => setActiveTab('tutor')}>
        Gia sư Tutor
      </button>
      <button className={`page-tab${activeTab === 'station' ? ' page-tab--active' : ''}`} type="button" onClick={() => setActiveTab('station')}>
        Station
      </button>
      <button className={`page-tab${activeTab === 'rino-digi' ? ' page-tab--active' : ''}`} type="button" onClick={() => setActiveTab('rino-digi')}>
        Rino Digi
      </button>
    </div>
  )
}

export function FilterActions({ onReset }: { onReset: () => void }) {
  return (
    <div className="dashboard-filter-actions dashboard-filter-actions--between dashboard-filter-actions--topline">
      <button className="button button--text" type="button">
        <span className="material-symbols-outlined" aria-hidden="true">
          filter_list
        </span>
        Bộ lọc nâng cao
      </button>
      <div className="dashboard-filter-actions">
        <button className="button button--minimal" type="button" onClick={onReset}>
          Đặt lại
        </button>
        <button className="button button--tinted" type="button">
          Áp dụng
        </button>
      </div>
    </div>
  )
}

export function FilterField({
  label,
  value,
  type,
  options = [],
  onChange,
}: {
  label: string
  value: string
  type: 'date' | 'select'
  options?: Array<{ value: string; label: string }>
  onChange: (value: string) => void
}) {
  return (
    <label className="field dashboard-tutor-field">
      <span>{label}</span>
      {type === 'date' ? (
        <input className="dashboard-tutor-control dashboard-tutor-control--date" type="date" value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <CustomSelect
          className="dashboard-tutor-select"
          value={value}
          onChange={onChange}
          options={options}
        />
      )}
    </label>
  )
}

export function BottomTable({
  icon,
  title,
  rows,
  truncate,
}: {
  icon: string
  title: string
  rows: Array<[string, string]>
  truncate?: boolean
}) {
  return (
    <article className="dashboard-card dashboard-card--bottom-table">
      <div className="dashboard-tutor-bottom-table__head">
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
        <h4>{title}</h4>
      </div>
      <div className="dashboard-tutor-bottom-table__body">
        {rows.map(([label, value]) => (
          <div key={label} className="dashboard-tutor-bottom-table__row">
            <span className={truncate ? 'truncate' : ''}>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </article>
  )
}

export function RinoDigiPlaceholder({
  activeTab,
  setActiveTab,
}: {
  activeTab: DashboardTab
  setActiveTab: (tab: DashboardTab) => void
}) {
  return (
    <>
      <DashboardHeader
        title="Dashboard quản trị trải nghiệm khách hàng"
        description="Theo dõi nhanh chất lượng trải nghiệm khách hàng trên toàn hệ thống."
      />
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <article className="dashboard-card dashboard-card--empty dashboard-empty-shell">
        <div className="empty-state">
          <div className="empty-state__icon">+</div>
          <strong>Tab này sẽ được dựng tiếp theo</strong>
          <p>Mình sẽ tiếp tục với tab Rino Digi sau khi chốt xong Station.</p>
        </div>
      </article>
    </>
  )
}
