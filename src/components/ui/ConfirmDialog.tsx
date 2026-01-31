import { useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

/**
 * Confirmation dialog component
 */
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const iconColors = {
    danger: 'text-red-600 bg-red-100',
    warning: 'text-yellow-600 bg-yellow-100',
    info: 'text-blue-600 bg-blue-100',
  };

  const confirmVariants = {
    danger: 'danger' as const,
    warning: 'primary' as const,
    info: 'primary' as const,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex={-1}
        className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 animate-slide-up focus:outline-none"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className={cn('w-12 h-12 rounded-full flex items-center justify-center mb-4', iconColors[variant])}>
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Content */}
        <h2 id="dialog-title" className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={confirmVariants[variant]} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
