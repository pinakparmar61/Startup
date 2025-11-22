import React, { useState } from "react";

const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    e.target.reset();
  };

  return (
    <section
      className="py-20 sm:py-28 min-h-[calc(100vh-200px)] flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://www.lincad.co.uk/wp-content/uploads/2022/08/contact-us-scaled-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 backdrop-blur/20"></div>

      {/* Floating Glow Animation */}
      <div className="absolute inset-0 pointer-events-none glow-blob"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-14 fade-in" style={{ animationDelay: "0s" }}>
          <h2 className="text-4xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">Get In Touch</h2>
          <p
            className="mt-4 text-xl text-gray-200 fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Ready to start building? Contact our sales team today.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="p-8 bg-gray-800/90 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="fade-in" style={{ animationDelay: "0.5s" }}>
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                required
                className="mt-1 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white
                placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 transition"
                placeholder="Your Name"
              />
            </div>

            {/* Email */}
            <div className="fade-in" style={{ animationDelay: "0.6s" }}>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                required
                className="mt-1 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white
                placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 transition"
                placeholder="you@company.com"
              />
            </div>

            {/* Message */}
            <div className="fade-in" style={{ animationDelay: "0.7s" }}>
              <label className="block text-sm font-medium text-gray-300">Message</label>
              <textarea
                rows="4"
                required
                className="mt-1 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white 
                placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 transition"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="fade-in" style={{ animationDelay: "0.8s" }}>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl
                text-white bg-blue-600 hover:bg-green-600 shadow-lg transition duration-300"
              >
                {/* SVG Mail icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4h16v16H4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4l8 8 8-8"
                  />
                </svg>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Message Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] fade-in">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center border border-yellow-500/40 max-w-sm w-full">
            <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
            <p className="text-gray-300 mb-6">
              Thank you for reaching out. We will contact you shortly.
            </p>
            <button
              className="px-6 py-2 bg-red-700 hover:bg-red-500 text-white rounded-lg transition"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Inline Styles */}
      <style>
        {`
          /* Fade Animation */
          .fade-in {
            opacity: 0;
            animation: fadeIn 1s ease forwards;
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          /* Floating Glow Animation */
          .glow-blob::before {
            content: "";
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(255,215,0,0.25), transparent 70%);
            top: -100px;
            left: -100px;
            animation: glowMove 12s infinite linear;
          }
          @keyframes glowMove {
            0%   { transform: translate(0,0); }
            50%  { transform: translate(200px,150px); }
            100% { transform: translate(0,0); }
          }
        `}
      </style>
    </section>
  );
};

export default Contact;
