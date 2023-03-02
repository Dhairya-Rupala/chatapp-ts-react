// libs
import { useRef, useEffect } from "react";

// types
type IntersectionObserverConfig = {
  threshold?: number[];
  rootMargin?: string;
  callback: Function;
};

export const useIntersectionObserver = ({
  callback,
  ...options
}: IntersectionObserverConfig) => {
  const targetRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targetElement = targetRef.current;
    const rootElement = rootRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) callback();
        });
      },
      {
        root: rootElement,
        ...options,
      }
    );

    if (targetElement) observer.observe(targetElement);

    return () => {
      if (targetElement) observer.unobserve(targetElement);
    };
  }, [callback, options]);

  return {
    targetRef,
    rootRef,
  };
};
