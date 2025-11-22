import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);

  useEffect(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: delay / 1000,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
};

export { AnimatedSection };  // Make sure this line exists