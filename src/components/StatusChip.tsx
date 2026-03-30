import type { TemplateStatus } from '../types'

interface StatusChipProps {
  status: TemplateStatus | 'Active' | 'Inactive'
}

export function StatusChip({ status }: StatusChipProps) {
  const className =
    status === 'Đang hoạt động' || status === 'Active'
      ? 'chip chip--active'
      : status === 'Nháp'
        ? 'chip chip--draft'
        : status === 'Ngừng sử dụng' || status === 'Inactive'
          ? 'chip chip--inactive'
          : 'chip chip--archived'

  return <span className={className}>{status}</span>
}
