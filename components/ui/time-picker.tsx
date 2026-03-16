'use client';

import * as React from 'react';
import { ClockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TimePickerProps {
  date?: Date;
  setDate?: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const [open, setOpen] = React.useState(false);

  const hours   = date ? date.getHours()   : null;
  const minutes = date ? date.getMinutes() : null;

  const displayValue =
    hours !== null && minutes !== null
      ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
      : 'Pick a time';

  function selectHour(h: number) {
    const next = date ? new Date(date) : new Date();
    next.setHours(h);
    if (minutes === null) next.setMinutes(0);
    next.setSeconds(0);
    setDate?.(next);
  }

  function selectMinute(m: number) {
    const next = date ? new Date(date) : new Date();
    if (hours === null) next.setHours(0);
    next.setMinutes(m);
    next.setSeconds(0);
    setDate?.(next);
  }

  const hourList   = Array.from({ length: 24 }, (_, i) => i);
  const minuteList = Array.from({ length: 60 }, (_, i) => i);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal text-[11.5px] h-[30px]',
            !date && 'text-muted-foreground'
          )}
        >
          <ClockIcon className="mr-2 h-3.5 w-3.5" />
          {displayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="flex gap-2">
          {/* Hours */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-muted-foreground font-medium">Hour</span>
            <ScrollArea className="h-48 w-14">
              <div className="flex flex-col gap-0.5 pr-2">
                {hourList.map((h) => (
                  <button
                    key={h}
                    onClick={() => selectHour(h)}
                    className={cn(
                      'w-full text-center text-[11.5px] py-1 rounded-md transition-colors hover:bg-accent',
                      hours === h && 'bg-primary text-primary-foreground hover:bg-primary'
                    )}
                  >
                    {String(h).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex items-center pb-1 text-muted-foreground font-bold">:</div>

          {/* Minutes */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-muted-foreground font-medium">Min</span>
            <ScrollArea className="h-48 w-14">
              <div className="flex flex-col gap-0.5 pr-2">
                {minuteList.map((m) => (
                  <button
                    key={m}
                    onClick={() => selectMinute(m)}
                    className={cn(
                      'w-full text-center text-[11.5px] py-1 rounded-md transition-colors hover:bg-accent',
                      minutes === m && 'bg-primary text-primary-foreground hover:bg-primary'
                    )}
                  >
                    {String(m).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}