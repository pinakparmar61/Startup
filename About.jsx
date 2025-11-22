import React from "react";
import SectionHeading from "./SectionHeading";

const About = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="About Us" subtitle="Who we are and what we believe" />

        <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          We build immersive experiences powered by thoughtful design, strong engineering, 
          and deep creativity. Our mission is to transform how people interact with digital products.
        </p>
      </div>
    </section>
  );
};

export default About;
