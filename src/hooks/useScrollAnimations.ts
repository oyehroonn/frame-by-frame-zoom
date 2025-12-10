import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useParallax = (
  speed: number = 0.5,
  direction: "y" | "x" = "y"
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const tween = gsap.to(element, {
      [direction === "y" ? "yPercent" : "xPercent"]: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [speed, direction]);

  return ref;
};

export const useFadeInOnScroll = (
  stagger: number = 0.1,
  threshold: number = 0.2
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = element.children;
    if (children.length === 0) return;

    gsap.set(children, { opacity: 0, y: 50 });

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: `top ${(1 - threshold) * 100}%`,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.kill();
    };
  }, [stagger, threshold]);

  return ref;
};

export const useStickySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: sticky,
      pinSpacing: false,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return { containerRef, stickyRef };
};

export const useRevealAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, { 
      opacity: 0, 
      y: 80,
      willChange: "transform, opacity" 
    });

    const tween = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return ref;
};

export const useTextReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Split text into lines for animation
    const lines = element.querySelectorAll('.reveal-line');
    if (lines.length === 0) return;

    gsap.set(lines, { 
      opacity: 0, 
      y: 40,
      willChange: "transform, opacity"
    });

    const tween = gsap.to(lines, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return ref;
};

export const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    const scrollWidth = scroller.scrollWidth - container.offsetWidth;

    const tween = gsap.to(scroller, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return { containerRef, scrollerRef };
};
