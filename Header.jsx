import React, { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from './Footer';
import Startup from './Startup';
import News from "./News";
import Investors from "./Investors";
import Resources from "./Resources";
import Contact from "./Contact";
gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { label: "Home", key: "home" },
  { label: "News", key: "news" },
  { label: "Resources", key: "resources" },
  { label: "Investors", key: "investors" },
  { label: "Contact", key: "contact" },
];

const Header = () => {
  const navigate = useNavigate();
  const featureRefs = useRef([]);
  const aboutRef = useRef(null);

  // Smooth scroll helper used by header/footer
  const scrollToSection = useCallback((key) => {
    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // update URL hash (optional)
      try {
        history.replaceState(null, "", `#${key}`);
      } catch {}
    } else {
      // fallback: if section missing, navigate to contact page (or just ignore)
      console.warn(`No section with id="${key}" found.`);
    }
  }, []);

  // Animations
  useEffect(() => {
    featureRefs.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: index * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        }
      );
    });

    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: aboutRef.current, start: "top 80%" },
        }
      );
    }
  }, []);

  // Small initial animation for the features collection
  useEffect(() => {
    if (featureRefs.current && featureRefs.current.length > 0) {
      gsap.from(featureRefs.current, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: featureRefs.current[0], start: "top 85%" },
      });
    }
  }, []);

  useEffect(() => {
  const icons = document.querySelectorAll("#ultra-social > div");

  icons.forEach((el) => {
    const particleLayer = el.querySelector("span[id^='particle']");

    // Magnetic 3D mouse follow
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        rotateX: -y / 10,
        rotateY: x / 10,
        duration: 0.3,
        ease: "power2.out",
      });

      // Particle trail
      const spark = document.createElement("div");
      spark.className =
        "absolute w-1 h-1 bg-cyan-300 rounded-full opacity-80 pointer-events-none";
      spark.style.left = `${e.clientX - rect.left}px`;
      spark.style.top = `${e.clientY - rect.top}px`;
      particleLayer.appendChild(spark);

      gsap.to(spark, {
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
        opacity: 0,
        scale: 0,
        duration: 0.8,
        onComplete: () => spark.remove(),
      });
    });

    // Hover bounce
    el.addEventListener("mouseenter", () => {
      gsap.to(el, {
        scale: 1.15,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    });
  });
}, []);

  return (
    <div className="text-white">
      {/* HERO (home) */}
      <section
        id="home"
        className="relative pt-24 pb-32 text-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://cdn.prod.website-files.com/64249f9f76d52fedcdd95fc0/67aa450e963bb506f7207bd0_top-black-owned-tech-startups-and-organizations-to-watch-in-2025.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Build Tomorrow, <br /> Today.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            We provide powerful tools, insights, and support to help early-stage
            founders turn ideas into scalable businesses.
          </p>

          <div className="space-x-4">
            <a
              href="https://youtu.be/uOA5h_KdjO4?si=KkC-SRoApILQM5jL"
              target="_blank"
              rel="noreferrer"
            >
              <button className="px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition transform hover:scale-105">
                View Demo
              </button>
            </a>
             <a href="Contact"> 
            <button
              className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition transform hover:scale-105"
            >
              Learn More
            </button></a>
          </div>
        </div>
      </section>



      {/* FEATURES / RESOURCES */}
      <section
        id="resources"
        className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#87CEFA,#FFD700)" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-10 text-white">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {["Startup Insights", "Investor Network", "Resources & Tools"].map(
              (title, i) => (
                <div
                  key={title}
                  ref={(el) => (featureRefs.current[i] = el)}
                  className="p-6 bg-white/10 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 backdrop-blur-md"
                >
                  <h3 className="text-xl font-bold mb-2 text-blue-800">
                    {title}
                  </h3>
                  <p className="text-black">
                    {title === "Startup Insights" &&
                      "Stay updated with market news, funding trends & growth hacks."}
                    {title === "Investor Network" &&
                      "Connect with verified investors actively seeking new opportunities."}
                    {title === "Resources & Tools" &&
                      "Use templates, guides, legal docs, and pitch decks to accelerate growth."}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        ref={aboutRef}
        className="relative py-20 text-center"
        style={{ background: "linear-gradient(135deg,#FFD700,#87CEFA)" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            About Our Platform
          </h2>
          <p className="text-lg text-white leading-relaxed max-w-3xl mx-auto">
            Our startup ecosystem empowers founders with essential resources—
            investor networks, real-time insights and practical tools.
          </p>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section
        id="contact"
        className="relative py-20 text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-200 mb-8">Join thousands of founders using our platform.</p>

          <button
            onClick={() => {
              // navigate if you want a route
              try {
                navigate("/contact");
              } catch {
                scrollToSection("contact");
              }
            }}
            className="px-8 py-4 text-lg font-bold bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition transform hover:scale-105"
          >
            Join Now
          </button>
        </div>
      </section>

      <style>{`
        @keyframes scaleSlow {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        .animate-scale-slow { animation: scaleSlow 20s ease-in-out infinite; }
      `}</style>
      <Startup />
      <News />
      <Investors />
      <Resources />
      <Contact />
      <Footer />
    </div>
  );
};

export default Header;
