export default function HighlightsSection() {
  const metrics = [
    { title: "600+", subtitle: "LeetCode Problems Solved" },
    { title: "20+", subtitle: "Full-Stack Projects Completed" },
    { title: "5", subtitle: "Hackathons Participated" },
    { title: "10,000+", subtitle: "Lines of TypeScript Written" },
    { title: "Top 20%", subtitle: "Global LeetCode Ranking" },
    { title: "AIR 178", subtitle: "Naukri CodeQuest Rank" },
  ];

  const highlights = [
    {
      title: "Dwello",
      desc: "Cloud-Native Rental Platform (AWS, Prisma, PostGIS, Amplify)",
    },
    {
      title: "Sapienly",
      desc: "Ed-Tech LMS with Stripe, Redis, JWT, VdoCipher DRM",
    },
    {
      title: "PriceWise Tracker",
      desc: "BrightData Scraper + Automated Email Alerts",
    },
    {
      title: "GSAP Admin Dashboard",
      desc: "Interactive Animated Dashboard with Modern UI",
    },
  ];

  const achievements = [
    {
      title: "AIR 178 – CodeQuest",
      desc: "Ranked nationally in Naukri’s coding contest.",
    },
    {
      title: "Flipkart GRiD 7.0",
      desc: "Qualified Round 1 among 150,000+ engineers.",
    },
    {
      title: "e-Yantra 2023",
      desc: "Qualified Stage 1 in IIT Bombay’s robotics competition.",
    },
    {
      title: "Leadership Roles",
      desc: "PR Lead for Culrav & Avishkar 2024.",
    },
  ];

  return (
    <div className="items-start mt-25 md:mt-35 c-space">
      {/* ---------------------- METRICS ---------------------- */}
      <h2 className="text-heading">A Quick Snapshot of My Journey</h2>

      <div className="grid w-full grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-gradient-to-br from-midnight to-navy border border-white/10 shadow hover:scale-[1.02] transition-all duration-300"
          >
            <h3 className="text-4xl font-bold text-white">{m.title}</h3>
            <p className="mt-2 text-neutral-400">{m.subtitle}</p>
          </div>
        ))}
      </div>

      {/* ---------------------- GITHUB HIGHLIGHTS ---------------------- */}
      <h2 className="mt-28 text-heading">GitHub Highlights</h2>

      <div className="grid w-full grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-gradient-to-br from-midnight to-navy border border-white/10 shadow hover:scale-[1.02] transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-neutral-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* ---------------------- ACHIEVEMENTS ---------------------- */}
      <h2 className="mt-28 text-heading">Achievements & Milestones</h2>

      <div className="grid w-full grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-gradient-to-br from-midnight to-navy border border-white/10 shadow hover:scale-[1.02] transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-neutral-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
