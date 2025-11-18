import React, { useEffect, useMemo, useState } from 'react'
import Display from './components/Display'
import KeyButton from './components/KeyButton'

function App() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('0')

  // Safely evaluate math expressions
  const evaluate = (expr) => {
    if (!expr) return '0'
    try {
      // Disallow invalid trailing operators
      const sanitized = expr.replace(/[^0-9+\-*/().%\s]/g, '')
      // eslint-disable-next-line no-new-func
      const val = Function(`"use strict"; return (${sanitized})`)()
      if (val === undefined || val === null || Number.isNaN(val)) return '0'
      return String(val)
    } catch (e) {
      return 'Error'
    }
  }

  const append = (ch) => {
    setExpression((prev) => (prev === '0' ? String(ch) : prev + String(ch)))
  }

  const handleEquals = () => {
    const value = evaluate(expression)
    setResult(value)
    if (value !== 'Error') setExpression(value)
  }

  const handleClear = () => {
    setExpression('')
    setResult('0')
  }

  const handleBack = () => {
    setExpression((prev) => prev.slice(0, -1))
  }

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key
      if (/^[0-9]$/.test(k)) return append(k)
      if (["+", "-", "*", "/", ".", "(", ")"].includes(k)) return append(k)
      if (k === 'Enter' || k === '=') return handleEquals()
      if (k === 'Backspace') return handleBack()
      if (k.toLowerCase() === 'c' || k === 'Escape') return handleClear()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expression])

  const keys = useMemo(() => ([
    [{ label: 'C', onClick: handleClear, variant: 'warn' }, { label: '(', onClick: () => append('('), variant: 'subtle' }, { label: ')', onClick: () => append(')'), variant: 'subtle' }, { label: '⌫', onClick: handleBack, variant: 'subtle' }],
    [{ label: '7', onClick: () => append('7') }, { label: '8', onClick: () => append('8') }, { label: '9', onClick: () => append('9') }, { label: '÷', onClick: () => append('/') }],
    [{ label: '4', onClick: () => append('4') }, { label: '5', onClick: () => append('5') }, { label: '6', onClick: () => append('6') }, { label: '×', onClick: () => append('*') }],
    [{ label: '1', onClick: () => append('1') }, { label: '2', onClick: () => append('2') }, { label: '3', onClick: () => append('3') }, { label: '−', onClick: () => append('-') }],
    [{ label: '0', onClick: () => append('0'), span: 2 }, { label: '.', onClick: () => append('.') }, { label: '+', onClick: () => append('+'), variant: 'accent' }],
    [{ label: '=', onClick: handleEquals, variant: 'accent', span: 4 }],
  ]), [expression])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">Calculator</h1>
          <p className="text-blue-300/70 text-sm">Keyboard friendly • Supports (), + − × ÷ • Live preview</p>
        </div>

        <div className="bg-slate-800/50 border border-blue-500/20 rounded-3xl p-5 shadow-2xl backdrop-blur">
          <Display expression={expression} result={result} />

          <div className="grid grid-cols-4 gap-3 mt-5">
            {keys.flat().map((k, idx) => (
              <KeyButton key={idx} label={k.label} onClick={k.onClick} variant={k.variant} span={k.span || 1} />
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="/test" className="text-blue-300/70 hover:text-blue-200 underline underline-offset-4">Backend test page</a>
        </div>
      </div>
    </div>
  )
}

export default App
