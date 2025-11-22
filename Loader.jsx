import React, { useEffect, useState } from "react";
import gsap from "gsap";

const Loader = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    gsap.to(".loader-box", {
      scale: 1.3,
      opacity: 0,
      duration: 1.2,
      ease: "power3.inOut",
      delay: 1.5,
      onComplete: () => setHide(true),
    });
  }, []);

  if (hide) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <div className="loader-box text-white text-3xl font-bold tracking-widest">
        Loading...
      </div>
    </div>
  );
};

export default Loader;
