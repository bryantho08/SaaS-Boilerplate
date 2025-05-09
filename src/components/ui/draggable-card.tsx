import React from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/utils/Helpers';

type DraggableCardProps = {
  id: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  badges?: React.ReactNode[];
  priority?: 'low' | 'medium' | 'high';
  status?: string;
};

export function DraggableCard({
  id,
  title,
  description,
  children,
  onClick,
  className,
  badges,
  priority,
  status,
}: DraggableCardProps) {
  // 未來可以添加實際的拖動功能，目前僅為UI實現
  const priorityColor = {
    low: 'bg-blue-100 text-blue-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };

  return (
    <Card
      className={cn(
        'group cursor-pointer border shadow-sm hover:shadow-md transition-all mb-3',
        className,
      )}
      onClick={onClick}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', id);
      }}
    >
      <CardHeader className="p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{title}</h3>
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button className="rounded-full p-1 text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-3"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <button className="rounded-full p-1 text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-3"
                >
                  <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                </svg>
              </button>
            </div>
          </div>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
      </CardHeader>
      {children && <CardContent className="p-3 pt-0">{children}</CardContent>}
      {(badges || priority || status) && (
        <div className="flex flex-wrap items-center gap-2 px-3 pb-3 pt-0">
          {priority && (
            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-full',
                priorityColor[priority],
              )}
            >
              {priority === 'low' ? '低' : priority === 'medium' ? '中' : '高'}
            </span>
          )}
          {status && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
              {status}
            </span>
          )}
          {badges && badges.map((badge, index) => <div key={index}>{badge}</div>)}
        </div>
      )}
    </Card>
  );
}

type DraggableColumnProps = {
  title: string;
  count?: number;
  children: React.ReactNode;
  className?: string;
  onDrop?: (id: string) => void;
};

export function DraggableColumn({
  title,
  count,
  children,
  className,
  onDrop,
}: DraggableColumnProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    onDrop?.(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className={cn('flex flex-col min-w-[280px] max-w-[280px]', className)}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700">
          {title}
          {count !== undefined && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
              {count}
            </span>
          )}
        </h3>
        <button className="rounded-full p-1 text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
