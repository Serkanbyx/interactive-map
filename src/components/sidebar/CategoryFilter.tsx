import { usePinStore } from '@/store/pinStore';
import { CATEGORIES } from '@/types';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { cn } from '@/lib/utils';

/**
 * Category filter buttons for filtering pins by category
 */
export function CategoryFilter() {
  const { filters, toggleCategory, clearFilters } = usePinStore();
  const { categories: selectedCategories } = filters;

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Categories
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          
          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-1',
                isSelected
                  ? 'text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
              style={isSelected ? { 
                backgroundColor: category.color,
                '--tw-ring-color': category.color 
              } as React.CSSProperties : {}}
            >
              <CategoryIcon category={category.id} size={14} />
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
