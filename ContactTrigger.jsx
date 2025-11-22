import React from "react";

const ContactTrigger = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-8 right-8 
        px-6 py-3 
        rounded-full 
        bg-red-600 hover:bg-red-700 
        shadow-lg shadow-red-900/40 
        text-white font-semibold 
        transition-all
        z-50
      "
    >
      Contact Us
    </button>
  );
};

export default ContactTrigger;
