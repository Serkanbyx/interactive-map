import { useState, useCallback, type ChangeEvent } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { debounce } from '@/lib/utils';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

/**
 * Search input with debounce and clear button
 */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className,
  debounceMs = 300,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  // Debounced onChange
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(
    debounce((val: string) => {
      onChange(val);
    }, debounceMs),
    [onChange, debounceMs]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-10 py-2.5',
          'text-gray-900 placeholder-gray-400',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white'
        )}
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
