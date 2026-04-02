import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { TemplateRecord } from '../types'
import { getTouchpointsUsingTemplate } from '../data/touchpointData'
import { StatusChip } from './StatusChip'

interface TouchpointUsageDrawerProps {
  template: TemplateRecord | null
  onClose: () => void
}

export function TouchpointUsageDrawer({ template, onClose }: TouchpointUsageDrawerProps) {
  const touchpoints = useMemo(
    () => (template ? getTouchpointsUsingTemplate(template.id) : []),
    [template],
  )

  if (!template) return null

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="drawer drawer--usage">
        <div className="drawer__header drawer__header--usage">
          <div>
            <h2>Điểm chạm đang sử dụng</h2>
            <p>Danh sách điểm chạm hiện đang map với template này.</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Đóng">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="usage-summary usage-summary--template">
          <div className="usage-summary__item">
            <span>Template</span>
            <strong>{template.code}</strong>
          </div>
          <div className="usage-summary__item">
            <span>Tên template</span>
            <strong>{template.name}</strong>
          </div>
          <div className="usage-summary__item">
            <span>Tổng điểm chạm đang dùng</span>
            <strong>{touchpoints.length}</strong>
          </div>
        </div>

        <div className="table-card table-card--drawer table-card--drawer-usage">
          <table className="data-table template-touchpoint-table template-touchpoint-table--usage">
            <thead>
              <tr>
                <th>Mã điểm chạm</th>
                <th>Tên điểm chạm</th>
                <th>Nguồn</th>
                <th>Sản phẩm</th>
                <th>Trạng thái</th>
                <th>Mặc định</th>
                <th>STT</th>
              </tr>
            </thead>
            <tbody>
              {touchpoints.map((touchpoint) => (
                <tr key={`${touchpoint.routeId}-${touchpoint.displayOrder}`}>
                  <td className="code-cell">
                    <Link className="touchpoint-link" to={`/touchpoints/${touchpoint.routeId}`}>
                      {touchpoint.id}
                    </Link>
                  </td>
                  <td>
                    <div className="stacked">
                      <Link className="touchpoint-link" to={`/touchpoints/${touchpoint.routeId}`}>
                        {touchpoint.name}
                      </Link>
                      <span className="muted-text">{touchpoint.program}</span>
                    </div>
                  </td>
                  <td>{touchpoint.sourceSystem}</td>
                  <td>
                    <div className="stacked">
                      <strong>{touchpoint.product}</strong>
                      <span className="muted-text">{touchpoint.productType}</span>
                    </div>
                  </td>
                  <td>
                    <StatusChip status={touchpoint.status} />
                  </td>
                  <td>{touchpoint.isDefault ? 'Có' : 'Không'}</td>
                  <td>{touchpoint.displayOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="drawer__info">
          Mapping điểm chạm - template hiện chỉ dùng để xem trong phase này. Việc chỉnh sửa mapping sẽ được thực hiện tại module Điểm chạm ở vòng tiếp theo.
        </div>

        <div className="drawer__footer drawer__footer--between">
          <Link className="drawer__link" to={`/templates/${template.id}`}>
            Xem chi tiết template
          </Link>
          <button className="button button--ghost" type="button" onClick={onClose}>
            Đóng
          </button>
        </div>
      </aside>
    </>
  )
}
