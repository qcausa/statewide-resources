type NFTAttribute = {
  rarity?: string;
  edition?: string;
  [key: string]: string | undefined;
};

export type NFT = {
  id: string;
  name: string;
  image: string;
  description: string;
  collection: string;
  attributes?: NFTAttribute;
};

export type Profile = {
  id: string;
  name: string;
  subtitle: string;
  avatar: string;
  description?: string;
  assets: NFT[];
};

export const mockProfiles: Record<string, Profile> = {
  wsa: {
    id: "wsa",
    name: "Wall Street Academy",
    subtitle: "Advanced Trading Mentorship",
    avatar:
      "https://nft.wsatraining.com/wp-content/uploads/2021/09/wsa_logo-01.png",
    description: "Leading crypto education platform",
    assets: [
      {
        id: "1",
        name: "Wall Street Academy 5 Day Class NFT Edition",
        image:
          "https://nft.wsatraining.com/wp-content/uploads/2021/09/wsa_nft_5dc_klueart-scaled.jpeg",
        description: "Exclusive access to our 5-day trading masterclass",
        collection: "Wall Street Academy",
        attributes: {
          rarity: "Legendary",
          edition: "First",
          type: "Education",
        },
      },
      //   {
      //     id: "2",
      //     name: "WSA Premium Course",
      //     image:
      //       "https://nft.wsatraining.com/wp-content/uploads/2021/09/wsa_nft_5dc_klueart-scaled.jpeg",
      //     description: "Premium trading course content",
      //     collection: "Wall Street Academy",
      //     attributes: {
      //       rarity: "Rare",
      //       edition: "Second",
      //       type: "Education",
      //     },
      //   },
    ],
  },
  nyolings: {
    id: "nyolings",
    name: "Nyoling #5763",
    subtitle: "Member of Nyolings",
    avatar: "/path-to-avatar.jpg",
    description: "Exclusive NFT collection",
    assets: [
      {
        id: "1",
        name: "Nyoling #1234",
        image: "/path-to-image-1.jpg",
        description: "A rare Nyoling NFT",
        collection: "Nyolings",
        attributes: {
          rarity: "Rare",
          edition: "Genesis",
        },
      },
      {
        id: "2",
        name: "Nyoling #5678",
        image: "/path-to-image-2.jpg",
        description: "An uncommon Nyoling NFT",
        collection: "Nyolings",
        attributes: {
          rarity: "Uncommon",
          edition: "Genesis",
        },
      },
    ],
  },
};

// For the homepage featured creators
export const mockNFTs = Object.values(mockProfiles).map((profile) => ({
  id: profile.id,
  name: profile.name,
  image: profile.assets[0]?.image ?? "",
  description: profile.description ?? "",
  collection: profile.assets[0]?.collection ?? "",
}));
