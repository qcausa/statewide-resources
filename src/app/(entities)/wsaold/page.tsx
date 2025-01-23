import { CreatePost } from "~/app/_components/create-post";
import { HeroSection } from "~/app/_components/HeroSection";
import Link from "next/link";
import { NFTCard } from "~/app/_components/NFTCard";
import { Session } from "@supabase/supabase-js";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import { unstable_noStore as noStore } from "next/cache";
import { readUserSession } from "~/app/(auth)/actions";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();
  const {
    data: { session },
  } = await readUserSession();

  return (
    <div className=" container flex-1">
      <HeroSection />
    </div>
  );
}
