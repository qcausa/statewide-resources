export function StatsSection() {
  const stats = [
    { value: "50M+", label: "Executive Assets" },
    { value: "350K+", label: "NFT Best Creator" },
    { value: "100+", label: "Platform Support" },
  ];

  return (
    <div className="container relative z-10 -mt-20">
      <div className="bg-theme-card/40 rounded-3xl border border-white/[0.08] p-8 shadow-xl backdrop-blur-sm">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 text-center"
            >
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
                {stat.value}
              </span>
              <span className="text-sm text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
