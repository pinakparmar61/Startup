import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');

  const socialRefs = useRef([]);
  const footerRef = useRef(null);

  const menuItems = [
    { label: "Home", key: "home" },
    { label: "News", key: "news" },
    { label: "Resources", key: "resources" },
    { label: "Investors", key: "investors" },
    { label: "Contact", key: "contact" }
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: "#" },
    { icon: FaTwitter, url: "#" },
    { icon: FaInstagram, url: "#" },
    { icon: FaLinkedinIn, url: "#" }
  ];

  const scrollToSection = (key) => {
    const element = document.getElementById(key);
    setActiveSection(key);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${key}`);
    } else {
      navigate(`/#${key}`);
    }
  };

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    socialRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 0, scale: 0.8 },
        {
          y: 0,
          scale: 1,
          duration: 1,
          delay: i * 0.1,
          ease: "elastic.out(1, 0.4)",
          repeat: -1,
          yoyo: true
        }
      );
    });
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    socialRefs.current.forEach((icon, i) => {
      const offsetX = (clientX - window.innerWidth / 2) * 0.02 * (i + 1);
      const offsetY = (clientY - window.innerHeight / 2) * 0.02 * (i + 1);
      gsap.to(icon, {
        x: offsetX,
        y: offsetY,
        rotationY: offsetX * 0.2,
        rotationX: -offsetY * 0.2,
        duration: 0.5,
        ease: "power1.out"
      });
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <a href="Startup">
            <h3 className="text-xl font-bold">StartUp</h3>
            </a>
            <p className="text-gray-400">
              Empowering startups with the tools and connections they need to succeed.
            </p>

            <div className="flex space-x-6 pt-2 justify-center md:justify-start">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <div key={social.name} className="flex flex-col items-center">
                    <a
                      href={social.url}
                      ref={(el) => (socialRefs.current[i] = el)}
                      className="text-gray-400 hover:text-white text-2xl transition-transform duration-300 cursor-pointer"
                    >
                      <Icon />
                    </a>
                    <span className="text-gray-300 text-xs mt-1">{social.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => scrollToSection(item.key)}
                    className={`text-gray-400 hover:text-white transition-colors ${activeSection === item.key ? 'text-white font-medium' : ''}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Status</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Startup Street</p>
              <p>San Francisco, CA 94107</p>
              <p>Email: info@startup.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} StartUp. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
