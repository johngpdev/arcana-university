import { useMemo, useState } from 'react'

export default function ClassPicker({ classes, value, onChange, placeholder, className }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const selected = useMemo(
    function () {
      return classes.find(function (c) {
        return c.code === value
      }) || null
    },
    [classes, value],
  )

  const matches = useMemo(
    function () {
      const q = query.trim().toLowerCase()
      if (!q) return classes
      return classes.filter(function (c) {
        return (c.code + ' ' + c.title + ' ' + c.dept).toLowerCase().includes(q)
      })
    },
    [classes, query],
  )

  const display = open ? query : selected ? selected.code + ' - ' + selected.title : ''

  function handleFocus() {
    setQuery('')
    setOpen(true)
  }

  function handleChange(e) {
    setQuery(e.target.value)
    setOpen(true)
    if (value) onChange('')
  }

  function handleSelect(cls) {
    onChange(cls.code)
    setQuery('')
    setOpen(false)
  }

  function handleBlur() {
    setTimeout(function () {
      setOpen(false)
    }, 140)
  }

  return (
    <div className="relative w-full">
      <input
        value={display}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder || 'Search classes...'}
        className={className}
      />
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-40 max-h-[280px] overflow-y-auto rounded-[14px] border border-white/15 bg-[#120e26] shadow-lg scrollbar-thin">
          {!query.trim() && (
            <p className="border-b border-white/[0.08] px-4 py-2 text-[10px] tracking-[2px] text-white/30">
              ALL CLASSES ({matches.length})
            </p>
          )}
          {matches.length === 0 && (
            <p className="px-4 py-3 text-[16px] text-white/50">No classes match that search.</p>
          )}
          {matches.map(function (c) {
            return (
              <button
                key={c.code}
                type="button"
                onMouseDown={function (e) {
                  e.preventDefault()
                  handleSelect(c)
                }}
                className={
                  'block w-full px-4 py-2 text-left transition hover:bg-[#f2cd6b]/[0.12] ' +
                  (c.code === value ? 'bg-[#f2cd6b]/[0.10]' : '')
                }
              >
                <span className="block text-[16px] tracking-[1px] text-[#f2cd6b]">
                  {c.code}
                </span>
                <span className="block text-[14px] text-white/70">{c.title}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
