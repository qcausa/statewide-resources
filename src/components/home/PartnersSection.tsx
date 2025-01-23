import Image from "next/image";

export function PartnersSection() {
  const partners = [
    { name: "Binance", logo: "/logos/binance.svg" },
    { name: "Ethereum", logo: "/logos/ethereum.svg" },
    { name: "Blockchain.io", logo: "/logos/blockchain.svg" },
    { name: "BitMEX", logo: "/logos/bitmex.svg" },
  ];

  return (
    <div className="border-t border-white/[0.08] bg-black/30">
      <div className="container py-12">
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale">
          {partners.map((partner) => (
            <div key={partner.name} className="h-8">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={32}
                className="h-full w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
