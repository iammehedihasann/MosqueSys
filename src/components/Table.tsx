import { cn } from '../utils/cn'

interface Column<T> {
  key: keyof T | string
  header: string
  className?: string
  render?: (row: T) => React.ReactNode
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string
  className?: string
  highlightRow?: (row: T) => boolean
}

export function Table<T extends object>({
  columns,
  data,
  keyExtractor,
  className,
  highlightRow,
}: TableProps<T>) {
  return (
    <div
      className={cn(
        'overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]',
        className
      )}
    >
      <table className="min-w-full divide-y divide-[var(--color-border)] text-left text-sm">
        <thead className="bg-[var(--color-bg)]">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className={cn('px-4 py-3.5 font-semibold text-lg items-center text-white bg-[#166534]', col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              className={cn(
                'transition-colors',
                highlightRow?.(row) ? 'bg-amber-50' : 'hover:bg-gray-50'
              )}
            >
              {columns.map((col) => {
                const value = (row as Record<string, unknown>)[col.key as string]
                const cell = col.render ? col.render(row) : (value as React.ReactNode)
                return (
                  <td key={String(col.key)} className={cn('px-4 py-3.5 text-[var(--color-text)]', col.className)}>
                    {cell}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
