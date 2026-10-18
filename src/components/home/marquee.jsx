const items = [
  "IMPORTED QUALITY",
  "NAIJA PRICES",
  "PREMIUM STREETWEAR",
  "WINTER ESSENTIALS",
  "RETAIL & WHOLESALE",
  "FAST DELIVERY",
];

export default function Marquee() {
  return (
    <div className="bg-primary py-4 overflow-hidden border-y-2 border-foreground">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-foreground font-extrabold text-lg tracking-widest flex items-center gap-8"
          >
            {item}
            <span className="text-foreground/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}