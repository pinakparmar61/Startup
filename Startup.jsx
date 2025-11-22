import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Floating Icon ---
const FloatingIcon = ({ className, children }) => (
  <div className={`absolute ${className} pointer-events-none`}>{children}</div>
);

// --- Animated Section ---
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animation = gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: delay / 1000,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

// --- Milestones ---
const MILESTONES = [
  { title: "Founded", value: 15, unit: "Year", icon: "🚀" },
  { title: "Funding Raised", value: 500, unit: "$", icon: "💰" },
  { title: "Global Offices", value: 7, unit: "", icon: "🌍" },
];

// Utility to sanitize id strings for clipPath uniqueness
const makeId = (s) => s.replace(/[^a-z0-9]/gi, "_").toLowerCase();

const MilestoneCircle = ({ milestone, delay = 0 }) => {
  const rootRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;

      // We'll have multiple wave layers inside the SVG group with class .wave-layer
      const waveGroup = root.querySelector('.wave-group');
      const waveLayers = waveGroup?.querySelectorAll('.wave-layer') || [];
      const shineEl = waveGroup?.querySelector('.shine');

      // 1️⃣ Infinite Side-to-Side Wave Movement (applies to layers)
      if (waveLayers.length) {
        gsap.to(waveLayers, {
          x: '-40%',
          duration: 12,
          repeat: -1,
          ease: 'linear',
          stagger: {
            each: 0.4,
            from: 'start',
          },
        });
      }

      // 2️⃣ Liquid Vertical Fill With Bounce
      // animate the translateY of the whole waveGroup so it 'fills' the circle
      const fillPct = Math.max(0, Math.min(100, 100 - milestone.value));
      gsap.fromTo(
        waveGroup,
        { yPercent: 100 },
        {
          yPercent: fillPct,
          duration: 2.6,
          delay: delay,
          ease: 'elastic.out(1, 0.6)',
        }
      );

      // 3️⃣ Glossy Highlight Shine Sweep
      if (shineEl) {
        gsap.fromTo(
          shineEl,
          { xPercent: -150 },
          {
            xPercent: 150,
            duration: 2.6,
            delay: delay + 0.2,
            ease: 'power2.out',
            repeat: 0,
          }
        );
      }

      // 4️⃣ Number Counter
      const counter = { val: 0 };
      gsap.to(counter, {
        val: milestone.value,
        duration: 30,
        delay: delay + 0.05,
        ease: 'power3.out',
        onUpdate: () => {
          const v = Math.round(counter.val);
          if (numberRef.current) {
            numberRef.current.innerText =
              milestone.unit === '$' ? `$${v}` : v;
          }
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [milestone, delay]);

  const clipId = `mask-${makeId(milestone.title)}`;

  return (
    <div ref={rootRef} className="flex flex-col items-center p-6 bg-gray-800 rounded-2xl">
      <div className="relative w-28 h-28">
        {/* Circle Mask */}
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <clipPath id={clipId}>
              <circle cx="60" cy="60" r="55" />
            </clipPath>
          </defs>

          {/* Wave inside masked circle - use a group to hold layers and shine */}
          <g clipPath={`url(#${clipId})`} className="wave-group" transform="translate(0,0)">
            {/* multiple layered waves for parallax */}
            <g className="wave-layer" transform="translate(0,20)">
              <path d="M0 40 Q20 30 40 40 T80 40 T120 40 V120 H0 Z" fill="#50e150aa" />
            </g>
            <g className="wave-layer" transform="translate(0,10)">
              <path d="M0 38 Q20 28 40 38 T80 38 T120 38 V120 H0 Z" fill="#00ff0088" />
            </g>
            <g className="wave-layer" transform="translate(0,0)">
              <path d="M0 36 Q20 26 40 36 T80 36 T120 36 V120 H0 Z" fill="#4cd44c99" />
            </g>

            {/* Glossy shine - a thin white polygon swept across */}
            <rect className="shine" x="-300" y="10" width="120" height="30" fill="#ffffff55" rx="8" />
          </g>

          {/* Outer circle stroke */}
          <circle
            cx="60"
            cy="60"
            r="55"
            fill="transparent"
            stroke="#4cfe67ff"
            strokeWidth="6"
          />
        </svg>

        {/* Value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold" ref={numberRef}>
            0
          </span>
        </div>
      </div>

      {/* Icon + Title */}
      <div className="text-gray-300 mt-3 flex items-center gap-2">
        {milestone.icon} {milestone.title}
      </div>
    </div>
  );
};

// --- Startup Details Section ---
const STARTUP_DETAILS = [
  {
    title: "Funding Raised",
    description: "We have raised over $500K from top investors.",
    icon: () => <span>💰</span>,
  },
  {
    title: "Global Offices",
    description: "Our team operates in 3 countries worldwide.",
    icon: () => <span>🌍</span>,
  },
  {
    title: "Products Launched",
    description: "Successfully launched 5 innovative products.",
    icon: () => <span>🚀</span>,
  },
];

const StartupDetailsSection = () => (
  <section
    className="h-screen w-full bg-cover bg-center relative"
    style={{
      backgroundImage:
        "url('https://t3.ftcdn.net/jpg/01/79/45/58/360_F_179455830_9hH2hLTSw1NljCuUnGQ1zkugE51xISrH.jpg')",
      backgroundAttachment: "fixed",
    }}
  >
    <div className="absolute inset-0" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <AnimatedSection delay={0} className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-white">Our Journey So Far</h2>
        <p className="mt-4 text-xl text-gray-200">Key milestones that define our success and mission.</p>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-8">
        {STARTUP_DETAILS.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <AnimatedSection
              key={index}
              delay={index * 150}
              className="p-8 bg-gray-800 rounded-2xl shadow-xl transition duration-500 hover:shadow-pink-500/30 hover:bg-gray-700/50 border border-gray-700 hover:border-pink-500 text-center"
            >
              <div className="text-4xl mb-4">{<Icon />}</div>
              <h3 className="text-xl font-bold mb-2">{detail.title}</h3>
              <p className="text-gray-200">{detail.description}</p>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  </section>
);

// --- Main Startup Landing Page ---
export default function StartupLandingPage() {
  const wrapperRef = useRef(null);
  const formSectionRef = useRef(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    startup: "",
    website: "",
    product: "",
    ask: "",
  });
  const [success, setSuccess] = useState(false);

  // Form validation
  const isStepValid = () => {
    if (step === 1) {
      return form.name.trim() !== "" && form.email.trim() !== "";
    }
    if (step === 2) {
      return form.startup.trim() !== "" && form.website.trim() !== "";
    }
    if (step === 3) {
      return form.product.trim() !== "" && form.ask.trim() !== "";
    }
    return false;
  };

  // Navigation handlers
  const handleNext = () => setStep((p) => (p < 3 ? p + 1 : p));
  const handlePrev = () => setStep((p) => (p > 1 ? p - 1 : p));
  const updateField = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isStepValid()) return;

    setSuccess(true);
    setForm({
      name: "",
      email: "",
      startup: "",
      website: "",
      product: "",
      ask: "",
    });
    setStep(1);
  };

  // Initialize staggered fadeReveal animations using gsap.context on wrapperRef
  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = wrapperRef.current?.querySelectorAll('.fade-reveal') || [];
      elements.forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative bg-black text-white overflow-hidden">
      {/* HERO SECTION */}
      <section
        className="relative py-80 text-center overflow-hidden"
        style={{
          backgroundImage: `url('https://cdn.prod.website-files.com/623ad8e63c50313a8e105d02/6241a0c400b3ce142b963e0e_meta.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <button
          className="px-8 py-4 bg-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] rounded-lg hover:bg-gray-800 transition fade-reveal"
          onClick={() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          Get Started
        </button>

        <FloatingIcon className="left-12 top-24">
          <div className="w-16 h-16 rounded-full bg-pink-600/40 flex items-center justify-center blur-sm">🚀</div>
        </FloatingIcon>
      </section>

      {/* MILESTONES SECTION */}
      <section
        className="py-30 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #370edaff 0%, #fcdc59ff 100%)' }}
      >
        <div className="absolute inset-0 bg-white/10 mix-blend-soft-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 fade-reveal text-white drop-shadow-lg">Our Journey So Far</h2>
          <p className="text-white/90 fade-reveal text-lg">Key milestones that define our success and mission.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6 relative z-10">
          {MILESTONES.map((m, i) => (
            <MilestoneCircle key={i} milestone={m} delay={i * 0.2} />
          ))}
        </div>
      </section>

      {/* STARTUP DETAILS */}
      <StartupDetailsSection />

      {/* CONTACT FORM SECTION */}
      <section
        ref={formSectionRef}
        className="relative py-29 overflow-hidden"
        style={{
          backgroundImage: `url('https://www.marwaricatalysts.com/images/blog/How-To-Join-a-Startup-Accelerator.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-reveal"></div>

            <div className="fade-reveal bg-white/40 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              {/* STEP INDICATOR */}
              <div className="flex justify-center mb-6">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold \
                      ${step === num ? 'bg-red-600 text-white' : 'bg-white/30 text-black'}`}
                    >
                      {num}
                    </div>
                    {num !== 3 && <div className="w-10 h-1 bg-white/40 mx-2" />}
                  </div>
                ))}
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full p-3 rounded-md bg-black/80 text-white placeholder-gray-400"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-3 rounded-md bg-black/80 text-white placeholder-gray-400"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      required
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <input
                      type="text"
                      placeholder="Startup Name"
                      className="w-full p-3 rounded-md bg-black/80 text-white placeholder-gray-400"
                      value={form.startup}
                      onChange={(e) => updateField('startup', e.target.value)}
                      required
                    />
                    <input
                      type="url"
                      placeholder="Website / Demo"
                      className="w-full p-3 rounded-md bg-black/80 text-white placeholder-gray-400"
                      value={form.website}
                      onChange={(e) => updateField('website', e.target.value)}
                      required
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <input
                      type="text"
                      placeholder="Product / Tech Stack"
                      className="w-full p-3 rounded-md bg-black/80 text-white placeholder-gray-400"
                      value={form.product}
                      onChange={(e) => updateField('product', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Funding Ask"
                      className="w-full p-3 rounded-md bg-black/80 text-white placeholder-gray-400"
                      value={form.ask}
                      onChange={(e) => updateField('ask', e.target.value)}
                      required
                    />
                  </>
                )}

                {/* NAVIGATION BUTTONS */}
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={step === 1}
                    className={`px-4 py-2 rounded-md ${step === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
                  >
                    Back
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className={`px-5 py-2 rounded-md ${!isStepValid() ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid()}
                      className={`px-5 py-2 rounded-md ${!isStepValid() ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS MODAL */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-green-400 p-10 max-w-md w-full text-center animate-[fadeIn_0.4s_ease] shadow-2xl">
            {/* Checkmark Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500 shadow-[0_0_25px_rgba(34,197,94,0.7)] animate-[pop_0.3s_ease]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-2 text-green-700">Application Received</h3>

            <p className="text-gray-700 mb-6">Thanks! We’ll reach out to you shortly.</p>

            <button onClick={() => setSuccess(false)} className="px-6 py-2 bg-green-600 rounded-lg text-white font-semibold hover:bg-green-500 transition shadow-lg">Close</button>
          </div>
        </div>
      )}

      {/* GLOBAL STYLES */}
      <style jsx global>{`\n        @keyframes scaleSlow {\n          0% { transform: scale(1); }\n          50% { transform: scale(1.03); }\n          100% { transform: scale(1); }\n        }\n        .animate-scale-slow {\n          animation: scaleSlow 20s ease-in-out infinite;\n        }\n      `}</style>
    </div>
  );
}
