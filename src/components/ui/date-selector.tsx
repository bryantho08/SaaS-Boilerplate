import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import React from 'react';
import type { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils/Helpers';

type DateSelectorProps = {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function DateSelector({
  date,
  onSelect,
  className,
  placeholder = '選擇日期',
  disabled = false,
}: DateSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, 'yyyy/MM/dd') : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

type DateRangeSelectorProps = {
  from: Date | undefined;
  to: Date | undefined;
  onSelect: (range: DateRange | undefined) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function DateRangeSelector({
  from,
  to,
  onSelect,
  className,
  placeholder = '選擇日期範圍',
  disabled = false,
}: DateRangeSelectorProps) {
  const dateFormat = (date: Date) => format(date, 'yyyy/MM/dd');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !(from && to) && 'text-muted-foreground',
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 size-4" />
          {from && to
            ? `${dateFormat(from)} - ${dateFormat(to)}`
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{
            from,
            to,
          }}
          onSelect={onSelect}
          initialFocus
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
