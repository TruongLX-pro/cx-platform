import { useEffect, useId, useMemo, useRef, useState } from 'react'

export interface CustomSelectOption<T extends string> {
  value: T
  label: string
}

interface CustomSelectProps<T extends string> {
  value: T
  onChange: (value: T) => void
  options: readonly CustomSelectOption<T>[]
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function CustomSelect<T extends string>({
  value,
  onChange,
  options,
  disabled = false,
  placeholder,
  className = '',
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const listboxId = useId()

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  )

  useEffect(() => {
    if (!open) return undefined

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      className={[
        'custom-select',
        open ? 'custom-select--open' : '',
        disabled ? 'custom-select--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        ref={buttonRef}
        className="custom-select__trigger"
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => !disabled && setOpen((current) => !current)}
      >
        <span className={`custom-select__value${selectedOption ? '' : ' custom-select__value--placeholder'}`}>
          {selectedOption?.label ?? placeholder ?? 'Chọn giá trị'}
        </span>
        <span className="material-symbols-outlined custom-select__icon" aria-hidden="true">
          expand_more
        </span>
      </button>

      {open ? (
        <div className="custom-select__menu" id={listboxId} role="listbox">
          {options.map((option) => {
            const active = option.value === value

            return (
              <button
                key={option.value}
                className={`custom-select__option${active ? ' custom-select__option--active' : ''}`}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
              >
                <span>{option.label}</span>
                {active ? (
                  <span className="material-symbols-outlined custom-select__check" aria-hidden="true">
                    check
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
