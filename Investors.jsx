import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const investors = [
  {
    name: "RedPeak Capital",
    desc: "A global VC firm focused on early-stage technology companies redefining the future.",
  },
  {
    name: "FutureBridge Ventures",
    desc: "Investing in disruptive startups in AI, biotech, fintech, and deep-tech innovation.",
  },
  {
    name: "PrimeSpark Investments",
    desc: "Backing visionary founders who are building the next generation of tech ecosystems.",
  },
];

const Investors = () => {
  const cardsRef = useRef([]);
  const particlesRef = useRef([]);
  const dollarRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        y: `+=${Math.random() * 50 + 20}`,
        x: `+=${Math.random() * 50 - 25}`,
        repeat: -1,
        yoyo: true,
        duration: Math.random() * 4 + 3,
        ease: "sine.inOut",
      });
    });

    dollarRef.current.forEach((dollar) => {
      gsap.to(dollar, {
        y: `-=${Math.random() * 100 + 50}`,
        x: `+=${Math.random() * 20 - 10}`,
        rotation: Math.random() * 360,
        repeat: -1,
        yoyo: true,
        duration: Math.random() * 5 + 3,
        ease: "sine.inOut",
        opacity: Math.random() * 0.5 + 0.5,
      });
    });

    const mouseMoveHandler = (e) => {
      const { clientX, clientY } = e;
      particlesRef.current.forEach((particle, i) => {
        const offsetX = (clientX - window.innerWidth / 2) * (0.02 + i * 0.001);
        const offsetY = (clientY - window.innerHeight / 2) * (0.02 + i * 0.001);
        gsap.to(particle, {
          x: offsetX,
          y: offsetY,
          duration: 1,
          ease: "power1.out",
        });
      });
      dollarRef.current.forEach((dollar, i) => {
        const offsetX = (clientX - window.innerWidth / 2) * (0.03 + i * 0.001);
        const offsetY = (clientY - window.innerHeight / 2) * (0.03 + i * 0.001);
        gsap.to(dollar, {
          x: offsetX,
          y: offsetY,
          duration: 1.2,
          ease: "power1.out",
        });
      });
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    return () => window.removeEventListener("mousemove", mouseMoveHandler);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-28 text-black overflow-hidden bg-gradient-to-b from-white via-blue-100 to-blue-200"
      style={{
        backgroundImage: "url('https://www.motilaloswal.com/media_102a10cb5cf84d89d8c53f2774c8548358c5d6013.jpg')", // replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional overlay for depth */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />

      {/* Ambient lighting */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-400/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-300/5 blur-[100px] rounded-full"></div>

      {/* Floating dollar signs */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (dollarRef.current[i] = el)}
          className="absolute text-yellow-500 text-xl font-bold pointer-events-none drop-shadow-[0_0_15px_rgba(100,150,255,0.8)] opacity-70"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        >
          $
        </div>
      ))}

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute w-6 h-6 rounded-full opacity-20 blur-2xl pointer-events-none shadow-[0_0_30px_10px_rgba(100,150,255,0.6)]"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        ></div>
      ))}

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <h2 className="text-red-500 text-4xl md:text-5xl font-bold text-center mb-14 drop-shadow-[0_0_25px_rgba(100,150,255,0.5)]">
          Our <span className="text-black">Investors</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {investors.map((inv, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
             className="p-8 rounded-3xl bg-white/50 backdrop-blur-2xl border border-blue-300/20 
shadow-[0_0_40px_rgba(100,150,255,0.15)] hover:shadow-[0_0_60px_rgba(100,150,255,0.3)] 
hover:border-blue-400 transition duration-500 transition-transform relative overflow-hidden"

            >
              <h3 className="text-2xl font-bold mb-3 text-black drop-shadow-[0_0_10px_rgba(100,150,255,0.7)]">
                {inv.name}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{inv.desc}</p>

              <button className="mt-6 px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold transition shadow-[0_0_20px_rgba(100,150,255,0.5)]">
                Learn More
              </button>

              {[...Array(5)].map((_, j) => (
                <span
                  key={j}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-70 animate-pulse shadow-[0_0_10px_rgba(100,150,255,0.7)]"
                  style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` }}
                ></span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Investors;
