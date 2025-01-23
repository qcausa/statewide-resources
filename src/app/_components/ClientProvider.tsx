"use client";

import { SiweMessage } from "siwe";
import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  type SIWEConfig,
  SIWEProvider,
  getDefaultConfig,
  type SIWESession,
  useSIWE,
  useModal,
} from "connectkit";
import { useRouter } from "next/navigation";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AuthProvider } from "~/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { SidebarProvider } from "./ui/sidebar";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}

function AfterSiweSignin(
  session: SIWESession | undefined,
  router: AppRouterInstance,
) {
  if (!session) return Error;
  try {
    console.log("afterSiweSigninStart", session);
  } catch (error) {
    console.log("afterSiweSigninError", error);
  }
}

const wagmiConfig = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required
    appName: "Your App Name",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const siweConfig = {
  getNonce: async () => {
    const res = await fetch(`/siwe`, { method: "PUT" });
    if (!res.ok) throw new Error("Failed to fetch SIWE nonce");

    return res.text();
  },
  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      nonce,
      chainId,
      address,
      version: "1",
      uri: window.location.origin,
      domain: window.location.host,
      statement: "Sign In With Ethereum to prove you control this wallet.",
    }).prepareMessage();
  },
  verifyMessage: ({ message, signature }) => {
    return fetch(`/siwe`, {
      method: "POST",
      body: JSON.stringify({ message, signature }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.ok);
  },
  getSession: async () => {
    const res = await fetch(`/siwe`);
    if (!res.ok) throw new Error("Failed to fetch SIWE session");

    const { address, chainId } = (await res.json()) as SIWESession;
    return address && chainId ? { address, chainId } : null;
  },
  signOut: () => fetch(`/siwe`, { method: "DELETE" }).then((res) => res.ok),
} satisfies SIWEConfig;

function ConnectHandler({ onConnect }: { onConnect: () => void }) {
  const { signIn } = useSIWE();
  const { setOpen } = useModal();

  useEffect(() => {
    void signIn();
    onConnect();
    setOpen(false);
  }, [signIn, onConnect, setOpen]);

  return null;
}

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [shouldSignIn, setShouldSignIn] = useState(false);

  return (
    <AuthProvider>
      <WagmiConfig config={wagmiConfig}>
        <SIWEProvider
          {...siweConfig}
          onSignIn={(session?: SIWESession) => AfterSiweSignin(session, router)}
        >
          <ConnectKitProvider onConnect={() => setShouldSignIn(true)}>
            {shouldSignIn && (
              <ConnectHandler onConnect={() => setShouldSignIn(false)} />
            )}
            <SidebarProvider>{children}</SidebarProvider>
          </ConnectKitProvider>
        </SIWEProvider>
      </WagmiConfig>
    </AuthProvider>
  );
}
