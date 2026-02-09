import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-xl border-2 border-purple-100 bg-white px-4 py-2 text-sm text-foreground transition-all duration-200',
          'placeholder:text-muted-foreground',
          'hover:border-purple-200',
          'focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
