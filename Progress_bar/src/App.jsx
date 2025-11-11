import React, { useState, useEffect } from 'react'

// ProgressBarFeature.jsx
// Single-file React component with an interactive demo.
// Uses Tailwind CSS for styling. Default export is the demo component.

function ProgressBar({
  value = 0, // 0 - 100
  size = 'md', // 'sm' | 'md' | 'lg'
  showPercentage = true,
  striped = false,
  animated = true,
  label = '',
  gradient = true,
  ariaLabel = 'Progress',
}) {
  const sizes = {
    sm: 'h-3 rounded-md',
    md: 'h-4 rounded-lg',
    lg: 'h-6 rounded-xl',
  }

  const containerClass = `w-full bg-gray-200/60 dark:bg-gray-800/60 overflow-hidden ${sizes[size]}`

  const filledStyle = {
    width: `${Math.max(0, Math.min(100, value))}%`,
  }

  const stripeClass = striped
    ? 'bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06) 0 10px, rgba(0,0,0,0.03) 10px 20px)]'
    : ''

  const animClass = animated ? 'transition-all duration-700 ease-out' : ''

  const gradientClass = gradient
    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
    : 'bg-indigo-500'

  return (
    <div>
      {label && <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">{label}</div>}

      <div
        className={containerClass}
        role="progressbar"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <div
          className={`${animClass} h-full flex items-center ${stripeClass}`}
          style={filledStyle}
        >
          <div
            className={`h-full w-full ${gradientClass}`}
            style={{
              boxShadow: '0 6px 18px rgba(99,102,241,0.12)',
            }}
          />
        </div>
      </div>

      {showPercentage && (
        <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">{Math.round(value)}%</div>
      )}
    </div>
  )
}

// Demo wrapper that lets you control the progress and toggle features
export default function ProgressBarFeatureDemo() {
  const [value, setValue] = useState(38)
  const [size, setSize] = useState('md')
  const [striped, setStriped] = useState(true)
  const [animated, setAnimated] = useState(true)
  const [gradient, setGradient] = useState(true)
  const [showPercentage, setShowPercentage] = useState(true)

  // small accessibility: keyboard increment/decrement using arrow keys
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') setValue(v => Math.min(100, v + 5))
      if (e.key === 'ArrowLeft') setValue(v => Math.max(0, v - 5))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/80 dark:bg-gray-900/70 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Interactive Progress Bar</h2>

      <div className="space-y-4">
        <ProgressBar
          value={value}
          size={size}
          showPercentage={showPercentage}
          striped={striped}
          animated={animated}
          gradient={gradient}
          label={`Download progress`}
        />

        <div className="flex items-center gap-4">
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full"
            aria-label="Set progress value"
          />

          <div className="w-14 text-right text-sm font-medium">{value}%</div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={striped} onChange={(e) => setStriped(e.target.checked)} />
            <span className="text-sm">Striped</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={animated} onChange={(e) => setAnimated(e.target.checked)} />
            <span className="text-sm">Animate</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={gradient} onChange={(e) => setGradient(e.target.checked)} />
            <span className="text-sm">Gradient</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showPercentage} onChange={(e) => setShowPercentage(e.target.checked)} />
            <span className="text-sm">Show %</span>
          </label>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button
            className="px-3 py-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm shadow-sm hover:scale-105 active:scale-95"
            onClick={() => setValue(0)}
          >
            Reset
          </button>

          <button
            className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-sm shadow hover:brightness-95 active:scale-95"
            onClick={() => setValue(v => Math.min(100, v + 10))}
          >
            +10
          </button>

          <select value={size} onChange={(e) => setSize(e.target.value)} className="ml-auto px-2 py-1 rounded-lg border">
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>

        <p className="text-xs text-gray-500 mt-3">Tip: Use ← / → keys to decrease/increase progress by 5%.</p>
      </div>
    </div>
  )
}
