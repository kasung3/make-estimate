import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[100px] w-full rounded-xl border-2 border-purple-100 bg-white px-4 py-3 text-sm text-foreground transition-all duration-200',
          'placeholder:text-muted-foreground',
          'hover:border-purple-200',
          'focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
          'resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
