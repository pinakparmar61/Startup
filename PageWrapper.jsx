import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const PageWrapper = ({ children }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    const el = ref.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    return () => {
      gsap.to(el, {
        opacity: 0,
        y: -40,
        duration: 0.6,
        ease: "power3.inOut",
      });
    };
  }, []);

  return <div ref={ref}>{children}</div>;
};

export default PageWrapper;
