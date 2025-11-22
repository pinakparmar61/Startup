import React from "react";

const MobileMenu = ({ isOpen, setIsOpen, setActivePage }) => {
  if (!isOpen) return null;

  const handleNav = (page) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-8 text-white text-2xl font-semibold animate-fadeIn">

      <button onClick={() => handleNav("home")} className="hover:text-red-400 transition">
        Home
      </button>

      <button onClick={() => handleNav("news")} className="hover:text-red-400 transition">
        News
      </button>

      <button onClick={() => handleNav("resources")} className="hover:text-red-400 transition">
        All Resources
      </button>

      <button onClick={() => handleNav("investors")} className="hover:text-red-400 transition">
        Investors
      </button>

      <button onClick={() => handleNav("contact")} className="hover:text-red-400 transition">
        Contact
      </button>

      {/* Close Button */}
      <button
        className="absolute top-6 right-6 text-white text-3xl"
        onClick={() => setIsOpen(false)}
      >
        ×
      </button>
    </div>
  );
};

export default MobileMenu;
