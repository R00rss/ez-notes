import { useState, useEffect, useRef, RefObject } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}
interface StickyState {
  isSticky: boolean;
  isStuck: boolean;
}

export function useIsVisible(
  options: IntersectionObserverOptions
): [React.RefObject<Element>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<Element>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isVisible];
}

export function useStickyIntersectionObserver(
  options: IntersectionObserverOptions
): [React.RefObject<Element>, StickyState] {
  const [stickyState, setStickyState] = useState<StickyState>({
    isSticky: false,
    isStuck: false,
  });

  const ref = useRef<Element>(null);
  const threshold = options.threshold || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry], observer) => {
      if (entry.intersectionRatio >= threshold) {
        setStickyState({
          isSticky: true,
          isStuck: false,
        });
      } else if (entry.boundingClientRect.top < 0) {
        setStickyState({
          isSticky: false,
          isStuck: true,
        });
      } else {
        setStickyState({
          isSticky: false,
          isStuck: false,
        });
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options, threshold]);

  return [ref, stickyState];
}

function MyComponent() {
  const [ref, stickyState] = useStickyIntersectionObserver({
    rootMargin: "0px 0px -100% 0px",
    threshold: 1.0,
  });

  const { isSticky, isStuck } = stickyState;

  return (
    <div
      ref={ref as RefObject<HTMLInputElement>}
      className={isSticky ? "sticky" : ""}
    >
      <p>Element is {isSticky ? "sticky" : isStuck ? "stuck" : "not sticky"}</p>
    </div>
  );
}
