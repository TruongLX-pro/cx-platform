import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { label: 'Điểm chạm', path: '/touchpoints', icon: 'ads_click' },
  { label: 'Template khảo sát', path: '/templates', icon: 'assignment' },
  { label: 'Dữ liệu phản hồi', path: '/cx-data', icon: 'chat_bubble' },
  { label: 'Phân tích', path: '/reports', icon: 'bar_chart' },
]

const mascotUrl = '/brand/rinoedu-logo.png'
const wordmarkUrl = '/brand/rinoedu-name.png'

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`app-shell${collapsed ? ' app-shell--collapsed' : ''}`}>
      <aside className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}>
        <div className="sidebar__panel">
          <div className="sidebar__brand">
            <div className="sidebar__brand-mark">
              <img className="sidebar__brand-mascot" src={mascotUrl} alt="RinoEdu mascot" />
              <div className="sidebar__brand-copy">
                <img className="sidebar__brand-wordmark" src={wordmarkUrl} alt="RinoEdu" />
              </div>
              <button
                className="sidebar__collapse"
                type="button"
                aria-label={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
                onClick={() => setCollapsed((value) => !value)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {collapsed ? 'chevron_right' : 'chevron_left'}
                </span>
              </button>
            </div>
          </div>

          <nav className="sidebar__nav">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                className={({ isActive }) =>
                  `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
                }
                to={item.path}
                title={collapsed ? item.label : undefined}
              >
                <span className="material-symbols-outlined sidebar__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="sidebar__link-label">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar__user">
          <div className="avatar">HA</div>
          <div className="sidebar__user-copy">
            <div className="user__name">Hoàng Minh Anh</div>
            <div className="user__meta">Quản trị viên hệ thống</div>
          </div>
          <button className="sidebar__user-action" type="button" aria-label="Đăng xuất">
            <span className="material-symbols-outlined" aria-hidden="true">
              logout
            </span>
          </button>
        </div>
      </aside>

      <div className="app-shell__main">
        <header className="topbar">
          <div className="topbar__label">CX PLATFORM</div>
          <div className="topbar__actions">
            <label className="topbar__search">
              <span className="material-symbols-outlined topbar__search-icon" aria-hidden="true">
                search
              </span>
              <input placeholder="Tìm kiếm dữ liệu..." aria-label="Tìm kiếm dữ liệu" />
            </label>
            <button className="icon-button icon-button--badge" type="button" aria-label="Thông báo">
              <span className="material-symbols-outlined" aria-hidden="true">
                notifications
              </span>
            </button>
            <button className="icon-button" type="button" aria-label="Trợ giúp">
              <span className="material-symbols-outlined" aria-hidden="true">
                help
              </span>
            </button>
            <button className="icon-button" type="button" aria-label="Cài đặt">
              <span className="material-symbols-outlined" aria-hidden="true">
                settings
              </span>
            </button>
          </div>
        </header>

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
