import React from 'react'

export default function Display({ expression, result }) {
  return (
    <div className="w-full bg-slate-800/70 border border-blue-500/20 rounded-2xl p-5 flex flex-col items-end gap-1">
      <div className="text-blue-300/70 text-sm tracking-wider min-h-[20px] w-full text-right truncate">
        {expression || '\u00A0'}
      </div>
      <div className="text-white text-3xl md:text-4xl font-bold tracking-tight w-full text-right">
        {result || '0'}
      </div>
    </div>
  )
}
