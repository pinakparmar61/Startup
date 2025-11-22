import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

const Navbar = () => {
  const [activePage, setActivePage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRefs = useRef([]);

  const menuItems = [
    { label: "Home", key: "home" },
    { label: "News", key: "news" },
    { label: "All Resources", key: "resources" },
    { label: "Investors", key: "investors" },
    { label: "Contact", key: "contact" },
  ];

  // Scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let currentSection = "home";

      menuItems.forEach((item) => {
        const section = document.getElementById(item.key);
        if (section && section.offsetTop <= scrollPos) {
          currentSection = item.key;
        }
      });

      setActivePage(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP hover animation
  useEffect(() => {
    const menuElements = menuRefs.current.filter(Boolean);
    const cleanups = [];

    menuElements.forEach((btn) => {
      const animation = gsap.to(btn, {
        scale: 1.05,
        duration: 0.2,
        paused: true,
        ease: "power1.inOut",
      });

      const handleMouseEnter = () => animation.play();
      const handleMouseLeave = () => animation.reverse();

      btn.addEventListener("mouseenter", handleMouseEnter);
      btn.addEventListener("mouseleave", handleMouseLeave);

      cleanups.push(() => {
        btn.removeEventListener("mouseenter", handleMouseEnter);
        btn.removeEventListener("mouseleave", handleMouseLeave);
        animation.kill();
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  // ScrollTo Section
  const scrollToSection = useCallback((key) => {
    const section = document.getElementById(key);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActivePage(key);
      setMobileMenuOpen(false);
    }
  }, []);

  const NavLinkStyle = (itemKey) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-300 transform ${
      activePage === itemKey
        ? "bg-red-500 text-black shadow-lg shadow-pink-600/50"
        : "text-black hover:text-white hover:bg-black/50"
    }`;

  return (
    <>
      {/* ------------------- NAVBAR ------------------- */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <div className="w-8 h-8 bg-pink-500 rounded-full animate-pulse" />
            <span className="text-xl font-extrabold text-black tracking-wide drop-shadow-lg">
              StartUp
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-2">
            {menuItems.map((item, index) => (
              <button
                key={item.key}
                ref={(el) => (menuRefs.current[index] = el)}
                onClick={() => scrollToSection(item.key)}
                className={NavLinkStyle(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen((p) => !p)}
              className="p-3 rounded-xl bg-white/10 text-black shadow-lg transition hover:bg-white/20"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Background Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/70 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div
            className="fixed right-4 top-[70px] w-64 bg-black/95 border border-white/10 rounded-2xl shadow-2xl p-4 z-50 md:hidden animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`block px-3 py-2 rounded-lg font-medium text-white/90 hover:bg-white/20 transition text-left ${
                    activePage === item.key
                      ? "bg-red-500 text-black shadow-lg shadow-pink-600/50"
                      : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Mobile Menu Animation */}
        <style>
          {`
            @keyframes slideDown {
              0% { transform: translateY(-20px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            .animate-slide-down {
              animation: slideDown 0.3s ease-out forwards;
            }
          `}
        </style>
      </header>
    </>
  );
};

export default Navbar;
