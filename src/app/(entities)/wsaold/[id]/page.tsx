import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default function NFTPage({ params }: Props) {
  if (!params.id) {
    notFound();
  }

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">NFT #{params.id}</h1>
      {/* Add your NFT details here */}
    </div>
  );
}
