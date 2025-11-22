import React from "react";
import SectionHeading from "./SectionHeading";
import { Aperture, Rocket, Star } from "./Icon";

const features = [
  { id: 1, title: "Precision Design", icon: Aperture, description: "Optimized for clarity & branding." },
  { id: 2, title: "Extreme Performance", icon: Rocket, description: "Fast, scalable, and production-ready." },
  { id: 3, title: "Elite Quality", icon: Star, description: "Pixel-perfect interface components." },
];

const Features = () => {
  return (
    <section className="py-24 bg-black">
      <SectionHeading title="Our Features" subtitle="High-performance tools for modern teams" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 px-6">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.id} className="p-8 bg-gray-900 rounded-2xl shadow-xl text-center">
              <Icon className="h-12 w-12 mx-auto text-pink-400 mb-4" />
              <h3 className="text-2xl text-white font-semibold">{f.title}</h3>
              <p className="text-gray-300 mt-3">{f.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
