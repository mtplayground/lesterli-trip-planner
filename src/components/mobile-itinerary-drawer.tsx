import { useState } from 'react'
import { ListChecks } from 'lucide-react'

import type { Attraction, Itinerary } from '@/engine'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { YourDayPanel } from './your-day-panel'

interface MobileItineraryDrawerProps {
  itinerary: Itinerary
  onRemoveAttraction: (attractionId: Attraction['id']) => void
  onFinishTrip: () => void
}

export function MobileItineraryDrawer({
  itinerary,
  onRemoveAttraction,
  onFinishTrip,
}: MobileItineraryDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed inset-x-4 bottom-4 z-40 h-12 justify-between rounded-2xl px-4 shadow-[0_24px_50px_rgba(15,23,42,0.22)] md:hidden"
          aria-label={`Open your day drawer with ${itinerary.length} selected attraction${
            itinerary.length === 1 ? '' : 's'
          }`}
        >
          <span className="flex items-center gap-2">
            <ListChecks className="size-4" />
            Your Day
          </span>
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-semibold',
              itinerary.length === 0
                ? 'bg-white/20 text-primary-foreground/85'
                : 'bg-white text-primary'
            )}
          >
            {itinerary.length}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="top-auto right-0 bottom-0 left-0 max-w-none translate-x-0 translate-y-0 gap-0 rounded-t-[2rem] rounded-b-none border-0 bg-transparent p-0 ring-0 sm:max-w-none data-open:slide-in-from-bottom-8 data-open:zoom-in-100 data-closed:slide-out-to-bottom-8 data-closed:zoom-out-100"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Your Day itinerary</DialogTitle>
          <DialogDescription>
            Review your selected attractions and finish the trip.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-t-[2rem] bg-transparent p-4 pt-8">
          <YourDayPanel
            itinerary={itinerary}
            onRemoveAttraction={onRemoveAttraction}
            onFinishTrip={() => {
              setOpen(false)
              onFinishTrip()
            }}
            className="border-white/60 bg-white/92 shadow-[0_-18px_60px_rgba(15,23,42,0.18)] backdrop-blur"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
