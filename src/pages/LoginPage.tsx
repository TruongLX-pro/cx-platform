import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

const mascotUrl = '/brand/rinoedu-logo.png'
const wordmarkUrl = '/brand/rinoedu-name.png'

interface LoginPageProps {
  onLogin: (username: string) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const isDisabled = useMemo(
    () => !username.trim() || !password.trim() || isSubmitting,
    [isSubmitting, password, username],
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.')
      return
    }

    setError('')
    setIsSubmitting(true)

    window.setTimeout(() => {
      onLogin(username)
      setIsSubmitting(false)
    }, 350)
  }

  return (
    <main className="login-page">
      <section className="login-shell">
        <div className="login-brand-panel">
          <div className="login-brand-panel__copy">
            <div className="login-brand-panel__eyebrow">CX PLATFORM</div>
            <img className="login-brand-panel__wordmark" src={wordmarkUrl} alt="RinoEdu" />
            <h1>Đăng nhập hệ thống quản trị trải nghiệm khách hàng</h1>
          </div>

          <div className="login-brand-panel__card">
            <img className="login-brand-panel__mascot" src={mascotUrl} alt="RinoEdu mascot" />
            <div className="login-brand-panel__meta">
              <strong>RinoEdu CX Platform</strong>
              <span>Phiên bản nội bộ cho vận hành CX</span>
            </div>
          </div>
        </div>

        <section className="login-form-panel" aria-label="Đăng nhập hệ thống">
          <div className="login-form-panel__header">
            <div className="login-form-panel__badge">Đăng nhập</div>
            <h2>Chào mừng quay lại</h2>
            <p>Nhập thông tin tài khoản nội bộ để vào hệ thống.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="field login-form__field">
              <span>Tên đăng nhập</span>
              <input
                autoComplete="username"
                name="username"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>

            <label className="field login-form__field">
              <span>Mật khẩu</span>
              <input
                autoComplete="current-password"
                name="password"
                placeholder="Nhập mật khẩu"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            {error ? <div className="login-form__error">{error}</div> : null}

            <button className="button button--primary login-form__submit" disabled={isDisabled} type="submit">
              {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        </section>
      </section>
    </main>
  )
}
