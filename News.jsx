import React from "react";

const newsItems = [
  {
    title: "Our Startup Secures Major Seed Funding",
    date: "Oct 12, 2025",
    summary:
      "We are excited to announce a successful seed round that will accelerate product expansion and global scale."
  },
  {
    title: "CEO Featured in Global Innovation Summit",
    date: "Sep 28, 2025",
    summary:
      "Our founder spoke on disruptive technologies and the future of AI-driven business ecosystems."
  },
  {
    title: "Partnership With Major Tech Accelerator",
    date: "Sep 14, 2025",
    summary:
      "A strategic collaboration aimed at pushing boundaries and supporting emerging founders worldwide."
  }
];

const News = () => {
  return (
    <section className="relative py-28 text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')"
        }}
      ></div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
          Latest <span className="text-red-500">News</span>
        </h2>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="relative p-6 bg-gray-900/70 border border-gray-800 rounded-2xl hover:border-red-500 transition duration-300 backdrop-blur-md"
            >
              <p className="text-sm text-gray-400">{item.date}</p>

              <h3 className="mt-3 text-xl font-bold leading-snug">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                {item.summary}
              </p>

              <button className="mt-6 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm transition">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
