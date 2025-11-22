// Animation helper functions and keyframes
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fade In Animation
const fadeIn = {
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "scale(0.97)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
  },
  ".animate-fadeIn": {
    animation: "fadeIn 0.25s ease-out",
  },
};

// Fade Up Animation
const fadeUp = {
  "@keyframes fadeUp": {
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  ".animate-fadeUp": {
    animation: "fadeUp 0.6s ease-out forwards",
    opacity: 0,
  },
  
  // Animation delays
  ".animation-delay-200": {
    animationDelay: "0.2s",
  },
  
  ".animation-delay-400": {
    animationDelay: "0.4s",
  },
};

// Export all animations
export const animations = {
  ...fadeIn,
  ...fadeUp,
};

// If you're using a CSS-in-JS solution like styled-components or emotion,
// you can use this function to inject the animations
export const injectAnimations = (css) => {
  return Object.entries(animations).map(([key, value]) => {
    if (key.startsWith("@")) {
      return `${key} { ${Object.entries(value).map(([k, v]) => `${k}: ${v};`).join(' ')} }`;
    }
    return `${key} { ${Object.entries(value).map(([k, v]) => `${k}: ${v};`).join(' ')} }`;
  }).join('\n');
};

// For Tailwind users, you can add these to your tailwind.config.js
// under the 'extend' key in the 'animation' and 'keyframes' sections
export const tailwindConfig = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: 0, transform: 'scale(0.97)' },
          'to': { opacity: 1, transform: 'scale(1)' },
        },
        fadeUp: {
          'from': { opacity: 0, transform: 'translateY(20px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
};