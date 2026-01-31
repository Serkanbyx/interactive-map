/**
 * Footer component with author signature
 * Fixed position at bottom of screen
 */
export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[400] bg-white/90 backdrop-blur-sm border-t border-gray-200 py-2 px-4 text-center text-sm text-gray-600">
      Created by{' '}
      <a
        href="https://serkanbayraktar.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary-600 hover:text-primary-700 hover:underline transition-colors"
      >
        Serkanby
      </a>
      {' | '}
      <a
        href="https://github.com/Serkanbyx"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary-600 hover:text-primary-700 hover:underline transition-colors"
      >
        Github
      </a>
    </footer>
  );
}
