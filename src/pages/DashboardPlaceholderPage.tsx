interface DashboardPlaceholderPageProps {
  sectionTitle: string
}

export function DashboardPlaceholderPage({
  sectionTitle,
}: DashboardPlaceholderPageProps) {
  return (
    <section className="placeholder-page">
      <div className="page-header">
        <div>
          <div className="page-header__eyebrow">CEM Platform</div>
          <h1>{sectionTitle}</h1>
          <p>Phân hệ này sẽ được triển khai tiếp sau khi hoàn thiện module Template và Dashboard.</p>
        </div>
      </div>

      <article className="placeholder-card">
        <h2>Đang chuẩn bị giao diện chi tiết</h2>
        <p>
          Phần màn hình này hiện được giữ làm placeholder để app shell và route hệ thống ổn định
          trong giai đoạn dựng frontend.
        </p>
      </article>
    </section>
  )
}
