import React from "react";

export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-white">{title}</h2>
      {subtitle && (
        <p className="text-gray-200 mt-3 max-w-xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
