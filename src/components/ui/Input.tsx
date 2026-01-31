import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

/**
 * Reusable Input component
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'w-full rounded-lg border bg-white px-4 py-2.5',
          'text-gray-900 placeholder-gray-400',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
