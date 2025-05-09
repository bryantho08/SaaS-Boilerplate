import { X } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import React, { useId, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/Helpers';

type TagsInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  maxTags?: number;
  onBlur?: () => void;
};

// 使用變量而非數組表達式作為默認值
const emptyArray: string[] = [];

export function TagsInput({
  value = emptyArray,
  onChange,
  placeholder = '輸入標籤後按 Enter',
  className,
  maxTags = 10,
  onBlur,
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState('');
  const idPrefix = useId();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();

      if (value.length >= maxTags) {
        return;
      }

      // 避免添加重複標籤
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }

      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // 如果輸入框為空且按下退格鍵，刪除最後一個標籤
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div
      className={cn(
        'flex flex-wrap gap-2 border rounded-md p-1.5 focus-within:ring-1 focus-within:ring-ring focus-within:border-input',
        className,
      )}
    >
      {value.map((tag, index) => (
        <Badge
          key={`${idPrefix}-${tag}`}
          variant="secondary"
          className="flex h-7 items-center gap-1 px-2 py-0.5"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        placeholder={value.length ? '' : placeholder}
        className="h-7 min-w-[120px] flex-1 border-0 p-0 text-sm focus:outline-none focus:ring-0"
      />
    </div>
  );
}
