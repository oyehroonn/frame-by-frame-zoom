import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
}

const ScrollReveal = ({ 
  children, 
  className = "", 
  direction = "up",
  delay = 0 
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay if specified when entering
            timeoutId = setTimeout(() => {
              entry.target.classList.add("revealed");
            }, delay * 1000);
          } else {
            // Clear pending timeout if scrolling away quickly
            if (timeoutId) {
              clearTimeout(timeoutId);
              timeoutId = null;
            }
            // Remove revealed class when exiting viewport
            entry.target.classList.remove("revealed");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [delay]);

  const getRevealClass = () => {
    switch (direction) {
      case "left":
        return "reveal-left";
      case "right":
        return "reveal-right";
      case "scale":
        return "reveal-scale";
      default:
        return "reveal";
    }
  };

  return (
    <div ref={ref} className={`${getRevealClass()} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
