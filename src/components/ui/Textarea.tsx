import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

/**
 * Reusable Textarea component
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-lg border bg-white px-4 py-2.5',
          'text-gray-900 placeholder-gray-400',
          'transition-colors duration-200 resize-none',
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

Textarea.displayName = 'Textarea';
