import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options.threshold, options.rootMargin]);

  return isVisible;
};