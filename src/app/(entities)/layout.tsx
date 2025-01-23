import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { NFTCard } from "../_components/NFTCard";

// Add this type near the top of the file
type Asset = {
  id: string;
  name: string;
  image: string;
  collection: string;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

function Header() {
  return (
    <>
      <div className="flex h-80 flex-col gap-5 bg-gradient-to-br from-purple-900/60 to-neutral-900/60 py-5">
        <div className="container flex flex-1 flex-col justify-between">
          <div className="border-neutral-90 items-top flex h-full w-full justify-between">
            <div></div>
            <Button variant="outline" size="sm" className="bg-neutral-800/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Share
            </Button>
          </div>
          <div className="border-neutral-90 flex w-full items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-neutral-900">
              <AvatarImage src="/path-to-avatar.jpg" />
              <AvatarFallback>NY</AvatarFallback>
            </Avatar>
            <div className="mb-4 flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-white">Nyoling #5763</h1>
              <p className="text-sm text-gray-400">Member of Nyolings</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Assets() {
  "use client";
  // Fake data array
  const assets: Asset[] = [
    {
      id: "1",
      name: "Wall Street Academy 5 Day Class NFT Edition",
      image: "/path-to-image-1.jpg",
      collection: "Wall Street Academy",
    },
    {
      id: "2",
      name: "Nyoling #5678",
      image: "/path-to-image-2.jpg",
      collection: "Nyolings",
    },
    {
      id: "3",
      name: "Nyoling #9012",
      image: "/path-to-image-3.jpg",
      collection: "Nyolings",
    },
    {
      id: "4",
      name: "Nyoling #3456",
      image: "/path-to-image-4.jpg",
      collection: "Nyolings",
    },
    // Add more fake data as needed
  ];

  return (
    <div className="flex h-full flex-1 flex-col gap-5 py-5">
      <div className="container">
        <h2 className="mb-4 text-xl font-semibold text-white">Assets</h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {assets.map((asset) => (
            <NFTCard
              key={asset.id}
              id={asset.id}
              name={asset.name}
              image={asset.image}
              collection={asset.collection}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
