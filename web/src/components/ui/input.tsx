import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  prefix?: string
}

export function Input({ label, error, prefix, className = '', id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label htmlFor={id} className="text-xs uppercase text-gray-500">
          {label}
        </label>
      ) : null}


        <div className={`flex items-center rounded-lg border bg-white transition-colors ${error ? 'border-danger' : 'border-gray-300 focus-within:border-blue-base'}`}>
            {prefix && (
                <span className="pl-3 text-sm text-gray-400 select-none whitespace-nowrap">
            {prefix}
          </span>
            )}
            <input
                id={id}
                className={`w-full rounded-lg px-3 py-3 text-sm text-gray-600 placeholder:text-gray-400 outline-none bg-transparent ${className}`}
                {...props}
            />
        </div>


      {/*<input*/}
      {/*  id={id}*/}
      {/*  className={`rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${*/}
      {/*    error*/}
      {/*      ? 'border-red-400 bg-red-50 focus:ring-red-400'*/}
      {/*      : 'border-gray-300 bg-white'*/}
      {/*  } ${className}`}*/}
      {/*  {...props}*/}
      {/*/>*/}

      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  )
}
