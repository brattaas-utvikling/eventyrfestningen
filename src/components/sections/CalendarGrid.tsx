// src/components/calendar/CalendarGrid.tsx
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import type { Performance } from '@/types/sanity'

interface CalendarGridProps {
  performances: Performance[]
}

export function CalendarGrid({ performances }: CalendarGridProps) {
  if (!performances.length) {
    return <p className="text-sm text-navy-100/70">Ingen kommende forestillinger lagt inn.</p>
  }

  return (
    <div className="space-y-4">
      {performances.map((perf) => (
        <div
          key={perf._id}
          className="flex items-center justify-between rounded-lg bg-navy-900/30 border border-navy-700 px-4 py-3"
        >
          <div>
            <p className="text-white text-base font-medium">
              {formatDate(perf.date, { weekday: 'long' })}
            </p>
            <p className="text-navy-100/60 text-sm">
              {perf.show?.title} • {new Date(perf.date).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <Badge
            variant={
              perf.status === 'soldout'
                ? 'soldout'
                : perf.status === 'few'
                  ? 'few'
                  : 'available'
            }
          >
            {perf.status === 'soldout'
              ? 'Utsolgt'
              : perf.status === 'few'
                ? 'Få billetter'
                : 'Ledig'}
          </Badge>
        </div>
      ))}
    </div>
  )
}
