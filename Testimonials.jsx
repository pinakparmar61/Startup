import React from "react";
import SectionHeading from "./SectionHeading";

const testimonials = [
  { name: "John Doe", text: "Outstanding product! It changed our workflow completely." },
  { name: "Sarah Miller", text: "Beautiful design, incredibly smooth performance." },
  { name: "Alex Carter", text: "The best experience we've ever had working with a team." },
];

const Testimonials = () => {
  return (
    <section className="py-32 bg-purple-900">
      <SectionHeading title="What Our Clients Say" />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {testimonials.map((t, i) => (
          <div key={i} className="p-8 bg-white/10 backdrop-blur rounded-2xl shadow-lg text-white">
            <p className="text-lg">{t.text}</p>
            <h4 className="mt-4 font-semibold text-pink-300">— {t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
