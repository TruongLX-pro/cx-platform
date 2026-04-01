import type { TemplateRecord } from '../types'
import { StatusChip } from './StatusChip'

interface DeactivateModalProps {
  template: TemplateRecord | null
  onClose: () => void
}

export function DeactivateModal({ template, onClose }: DeactivateModalProps) {
  if (!template) return null

  return (
    <>
      <div className="overlay overlay--modal" onClick={onClose} />
      <div className="modal">
        <div className="modal__icon">!</div>
        <h2>Ngừng sử dụng template?</h2>
        <p className="modal__lead">
          Template <strong>"{template.name}"</strong> hiện đang được sử dụng tại{' '}
          <strong>{template.touchpoints.length} điểm chạm</strong>. Sau khi ngừng sử dụng, template
          sẽ không còn được áp dụng cho các cấu hình active mới.
        </p>

        <div className="modal__summary">
          <div>
            <span>Mã template</span>
            <strong>{template.code}</strong>
          </div>
          <div>
            <span>Trạng thái hiện tại</span>
            <StatusChip status={template.status} />
          </div>
          <div>
            <span>Điểm chạm đang dùng</span>
            <strong>{template.touchpoints.length}</strong>
          </div>
          <div>
            <span>Bộ phận phụ trách</span>
            <strong>{template.ownerTeam}</strong>
          </div>
        </div>

        <div className="modal__affected">
          <span>Điểm chạm bị ảnh hưởng</span>
          <div className="modal__tags">
            {template.touchpoints.map((touchpoint) => (
              <span className="pill" key={touchpoint.id}>
                {touchpoint.id}
              </span>
            ))}
          </div>
        </div>

        <label className="confirmation-box">
          <input type="checkbox" defaultChecked />
          <span>
            Tôi hiểu rằng template sẽ không còn khả dụng cho các điểm chạm active mới sau khi xác
            nhận thao tác này.
          </span>
        </label>

        <div className="modal__actions">
          <button className="button button--ghost" type="button" onClick={onClose}>
            Hủy
          </button>
          <button className="button button--danger" type="button" onClick={onClose}>
            Xác nhận ngừng sử dụng
          </button>
        </div>
      </div>
    </>
  )
}
