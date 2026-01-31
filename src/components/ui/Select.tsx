import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

/**
 * Reusable Select component
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'w-full rounded-lg border bg-white px-4 py-2.5 pr-10',
            'text-gray-900 appearance-none cursor-pointer',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = 'Select';
