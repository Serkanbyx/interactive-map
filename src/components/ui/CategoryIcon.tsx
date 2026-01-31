import { 
  Utensils, 
  Bed, 
  Landmark, 
  ShoppingBag, 
  Train, 
  MapPin,
  type LucideIcon 
} from 'lucide-react';
import type { PinCategory } from '@/types';

/**
 * Map of category to icon component
 */
const categoryIcons: Record<PinCategory, LucideIcon> = {
  restaurant: Utensils,
  hotel: Bed,
  attraction: Landmark,
  shopping: ShoppingBag,
  transport: Train,
  other: MapPin,
};

export interface CategoryIconProps {
  category: PinCategory;
  size?: number;
  className?: string;
}

/**
 * Renders the appropriate icon for a pin category
 */
export function CategoryIcon({ category, size = 20, className }: CategoryIconProps) {
  const Icon = categoryIcons[category] || categoryIcons.other;
  return <Icon size={size} className={className} />;
}

/**
 * Get the icon component for a category
 */
export function getCategoryIconComponent(category: PinCategory): LucideIcon {
  return categoryIcons[category] || categoryIcons.other;
}
