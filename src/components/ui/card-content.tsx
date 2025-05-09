import React from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/Helpers';

type CardContentBlockProps = {
  className?: string;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isEditable?: boolean;
  onEdit?: () => void;
};

export function CardContentBlock({
  className,
  title,
  description,
  footer,
  children,
  icon,
  isEditable = false,
  onEdit,
}: CardContentBlockProps) {
  return (
    <Card className={cn('mb-4 border shadow-sm hover:shadow-md transition-shadow', className)}>
      {(title || description) && (
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          {icon && <div className="shrink-0 text-muted-foreground">{icon}</div>}
          <div className="flex-1">
            {title && <CardTitle className="text-lg font-medium">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {isEditable && (
            <button
              onClick={onEdit}
              className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-muted"
            >
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
            </button>
          )}
        </CardHeader>
      )}
      <CardContent className="pt-2">{children}</CardContent>
      {footer && <CardFooter className="border-t bg-muted/30 px-6 py-3">{footer}</CardFooter>}
    </Card>
  );
}

type AddNewCardProps = {
  onClick: () => void;
  label?: string;
};

export function AddNewCard({ onClick, label = '新增' }: AddNewCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-md border border-dashed p-4 text-muted-foreground transition-colors hover:bg-muted/30"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 size-4"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
      {label}
    </button>
  );
}
