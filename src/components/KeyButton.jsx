import React from 'react'

export default function KeyButton({ label, onClick, variant = 'default', span = 1, ariaLabel }) {
  const base = 'select-none active:scale-[0.98] transition-transform text-lg md:text-xl font-semibold rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/60';
  const styles = {
    default: 'bg-slate-700/80 hover:bg-slate-700 text-blue-50',
    accent: 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30',
    warn: 'bg-rose-500/90 hover:bg-rose-600 text-white',
    subtle: 'bg-slate-600/70 hover:bg-slate-600 text-blue-50/90'
  }
  const spanClass = span === 2 ? 'col-span-2' : span === 3 ? 'col-span-3' : span === 4 ? 'col-span-4' : ''

  return (
    <button
      aria-label={ariaLabel || label}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${spanClass} p-4`}
    >
      {label}
    </button>
  )
}
