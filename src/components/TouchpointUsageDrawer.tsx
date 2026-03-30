import type { TemplateRecord } from '../types'
import { StatusChip } from './StatusChip'

interface TouchpointUsageDrawerProps {
  template: TemplateRecord | null
  onClose: () => void
}

export function TouchpointUsageDrawer({
  template,
  onClose,
}: TouchpointUsageDrawerProps) {
  if (!template) return null

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="drawer">
        <div className="drawer__header">
          <div>
            <h2>Điểm chạm đang sử dụng</h2>
            <p>Danh sách điểm chạm hiện đang map với template này</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="usage-summary usage-summary--template">
          <div>
            <span>Template</span>
            <strong>{template.code}</strong>
          </div>
          <div>
            <span>Tên template</span>
            <strong>{template.name}</strong>
          </div>
          <div>
            <span>Tổng điểm chạm đang dùng</span>
            <strong>{template.touchpoints.length}</strong>
          </div>
        </div>

        <div className="table-card table-card--drawer">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã điểm chạm</th>
                <th>Tên điểm chạm</th>
                <th>Nguồn</th>
                <th>Product</th>
                <th>Trạng thái</th>
                <th>Default</th>
                <th>STT</th>
              </tr>
            </thead>
            <tbody>
              {template.touchpoints.map((touchpoint) => (
                <tr key={touchpoint.id}>
                  <td className="code-cell">{touchpoint.id}</td>
                  <td>
                    <div className="stacked">
                      <strong>{touchpoint.name}</strong>
                      <span className="muted-text">{touchpoint.program}</span>
                    </div>
                  </td>
                  <td>{touchpoint.sourceSystem}</td>
                  <td>{touchpoint.product}</td>
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
          Mapping điểm chạm - template hiện chỉ dùng để xem trong phase này. Chỉnh sửa mapping
          được thực hiện ở cấu hình hệ thống, không thao tác trực tiếp tại đây.
        </div>

        <div className="drawer__footer drawer__footer--between">
          <span className="drawer__link">Xem chi tiết template</span>
          <button className="button button--ghost" type="button" onClick={onClose}>
            Đóng
          </button>
        </div>
      </aside>
    </>
  )
}
