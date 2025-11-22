import React, { useState } from "react";
import { ArrowRight, Mail, Home, XCircle } from "lucide-react";

// --- Configuration Data ---

const RESOURCES = [
  {
    title: "Documentation",
    items: [
      { name: "Getting Started Guide", desc: "Step-by-step guide to get your first service running.", page: "GettingStarted" },
      { name: "API Reference", desc: "Full reference for all API endpoints and data models.", page: "APIReference" },
      { name: "Framework Integrations", desc: "Integrate easily with our supported frameworks.", page: "FrameworkIntegrations" },
      { name: "System Status", desc: "Check the current status of all systems and services.", page: "SystemStatus" },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Help Center", desc: "Find quick answers and tutorials.", page: "HelpCenter" },
      { name: "Contact Sales", desc: "Connect directly with our dedicated sales team.", page: "ContactSales" },
      { name: "Community Forum", desc: "Engage with other users and share experiences.", page: "CommunityForum" },
      { name: "Professional Services", desc: "Get assistance from our expert consultants.", page: "ProfessionalServices" },
    ],
  },
  {
    title: "Company",
    items: [
      { name: "About Us", desc: "Learn about our mission and core values.", page: "AboutUs" },
      { name: "Careers", desc: "View open positions and join the team.", page: "Careers" },
      { name: "Partners", desc: "Collaborate with our trusted partners.", page: "Partners" },
      { name: "Legal & Terms", desc: "View our policies, terms, and legal documentation.", page: "LegalTerms" },
    ],
  },
];

// --- Utility Components ---

/**
 * Renders a generic page view based on the current page name.
 * @param {string} pageName - The name of the page to display.
 * @param {function} onNavigate - Function to navigate back to the home view.
 */
const PageView = ({ pageName, onNavigate }) => {
  return (
    <div className="min-h-screen bg-blue-300 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-3xl w-full text-center border-t-4 border-red-500">
        <div className="text-3xl font-extrabold text-gray-800 mb-4">{pageName}</div>
        <p className="text-gray-600 mb-8">
          This is the content area for the resource: <span className="font-semibold text-red-500">{pageName}</span>.
          In a real application, you would load the documentation, API reference, or company details here.
        </p>
        <button
          onClick={() => onNavigate("Home")}
          className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-200 font-medium"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Knowledge Hub
        </button>
      </div>
    </div>
  );
};

/**
 * Renders the 404 Not Found page.
 * @param {function} onNavigate - Function to navigate back to the home view.
 */
const NotFound = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h2 className="text-5xl font-extrabold text-gray-800 mb-2">404</h2>
        <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => onNavigate("Home")}
          className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200 font-medium"
        >
          <Home className="w-5 h-5 mr-2" />
          Go to Home
        </button>
      </div>
    </div>
  );
};


// --- Main Resources Hub Component (Modified from user input) ---

const ResourcesHub = ({ onNavigate }) => {
  return (
    <section className="relative text-white min-h-screen">
      {/* Hero Background - Now using a linear gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          // Linear gradient from a deep indigo/blue (#1e3a8a) at the top to deep black (#000000) at the bottom
          backgroundImage:
            "linear-gradient(to bottom, #3c5df2ff 0%, #3cff67ff 100%)",
        }}
      />
      {/* Dark overlay is no longer strictly needed but kept for potential future use or if the gradient is too light */}
      <div className="absolute inset-0 bg-black/10 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Heading */}
        <h1 className="text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] text-4xl md:text-5xl font-extrabold text-center mb-16">
          Knowledge <span className="text-red-500">Hub</span>
          <p>All Resources Are Avilable Here</p>
        </h1>

        {/* Resource Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {RESOURCES.map((section, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:border-red-500 transition duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] flex flex-col h-full"
            >
              <h3 className="text-2xl font-semibold mb-6 text-white">{section.title}</h3>

              {/* Submenu */}
              <ul className="space-y-4 flex-grow">
                {section.items.map((item, i) => (
                  <li key={i} className="border-t border-gray-700/50 pt-4 group">
                    <button
                      onClick={() => onNavigate(item.page)}
                      className="flex justify-between items-center w-full text-left text-white hover:text-red-400 font-medium transition duration-150"
                    >
                      {item.name} <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 transition duration-150 transform group-hover:translate-x-1" />
                    </button>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Chat Support Button */}
        <div className="text-center mt-16">
          <a href="contact">
          <button
            className="inline-flex items-center px-10 py-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-500 transition text-lg font-bold uppercase tracking-wider transform hover:scale-105 duration-300 ring-2 ring-red-600 ring-offset-4 ring-offset-gray-900/50"
          >
            Chat with Support
            <Mail className="w-5 h-5 ml-3" />
          </button></a>
        </div>
        </div>
    </section>
  );
};

// --- Main Application Component ---

const allPages = RESOURCES.flatMap(s => s.items.map(i => i.page)).concat(["Contact"]);

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  // Navigation handler
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  // Render the appropriate component based on the state
  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <ResourcesHub onNavigate={handleNavigate} />;
      case "Contact":
        return <PageView pageName="Contact Support" onNavigate={handleNavigate} />;
      default:
        // Check if the page is a valid resource link
        if (allPages.includes(currentPage)) {
          return <PageView pageName={currentPage} onNavigate={handleNavigate} />;
        }
        // Fallback for any unknown page
        return <NotFound onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}