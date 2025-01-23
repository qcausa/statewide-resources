import { NextResponse, type NextRequest } from "next/server";
import Session from "./lib/session";
import { updateSession } from "./lib/supabase/middleware";
import { GraphQLClient } from "graphql-request";
import { GET_NFT_BY_ADDRESS } from "./app/listings/queries";

const PUBLIC_PATHS = [
  "/register",
  "/login",
  "/reset-password",
  "/",
  "/collections",
];

// Initialize GraphQL client
const graphQLClient = new GraphQLClient(
  "https://wordpress-1198822-4842583.cloudwaysapps.com/graphql",
);

interface NFTResponse {
  nftByAddress?: {
    nftListings?: {
      nodes?: Array<{
        slug: string;
      }>;
    };
  };
}

interface ParsedNFTAddress {
  type: "brand" | "token";
  brandSlug?: string;
  tokenId?: string;
  fullAddress?: string;
}

function parseNFTAddress(nftAddress: string): ParsedNFTAddress {
  // Check if the address contains a colon (indicating it's a token address)
  if (nftAddress.includes(":")) {
    return {
      type: "token",
      fullAddress: nftAddress,
      tokenId: nftAddress.split(":")[1],
    };
  }

  // If it doesn't contain a colon, check if it's a brand path
  const parts = nftAddress.split("/");
  if (parts.length === 2) {
    return {
      type: "brand",
      brandSlug: parts[0],
      tokenId: parts[1],
    };
  }

  // If it's neither, assume it's a token address without a colon
  return {
    type: "token",
    fullAddress: nftAddress,
  };
}

export async function middleware(request: NextRequest) {
  const session = await Session.fromRequest(request);
  console.log("middleware_ironSession", session);
  console.log("middleware_activated");
  const { response, user } = await updateSession(request);

  const url = request.nextUrl.clone();
  const { pathname } = url;
  console.log("pathname", pathname);

  // Split and log pathname parts
  const pathParts = pathname.split("/").filter(Boolean); // filter(Boolean) removes empty strings
  console.log("pathParts", pathParts);

  // Handle direct token paths
  if (pathname.startsWith("/0x")) {
    console.log("token");
    try {
      const nftAddress = pathname.slice(1); // Remove leading slash
      console.log(nftAddress);
      const data = await graphQLClient.request<NFTResponse>(
        GET_NFT_BY_ADDRESS,
        { nftAddress },
      );
      console.log("NFT data:", data);

      // If NFT is claimed by a brand, redirect to brand page
      if (data?.nftByAddress?.nftListings?.nodes?.[0]?.slug) {
        const brandSlug = data.nftByAddress.nftListings.nodes[0].slug;
        const tokenId = nftAddress.split(":")[1];
        return NextResponse.redirect(
          new URL(`/${brandSlug}/${nftAddress}`, request.url),
        );
      }

      // If not claimed, redirect to NFT page with encoded address
      const encodedPath = `/nft/${nftAddress.replace(/:/g, "%3A")}`;
      return NextResponse.redirect(new URL(encodedPath, request.url));
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      // Continue to next middleware if fetch fails
    }
  }

  // Handle NFT address paths
  if (pathname.startsWith("/nft/")) {
    const nftPath = pathname.replace("/nft/", "");
    const parsedAddress = parseNFTAddress(nftPath);

    // If it's a brand path format (e.g., wsa/xxxx), redirect to /u/[brand]/[tokenId]
    if (
      parsedAddress.type === "brand" &&
      parsedAddress.brandSlug &&
      parsedAddress.tokenId
    ) {
      return NextResponse.redirect(
        new URL(
          `/u/${parsedAddress.brandSlug}/${parsedAddress.tokenId}`,
          request.url,
        ),
      );
    }

    // If it contains a colon, encode it
    if (pathname.includes(":")) {
      const encodedPath = pathname.replace(/:/g, "%3A");
      return NextResponse.redirect(new URL(encodedPath, request.url));
    }
  }

  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  // Allow access to public paths without authentication
  if (isPublicPath) {
    return response;
  }

  // // For private paths, check authentication
  // if (!user && !session.address) {
  //   // User is not authenticated, redirect to login
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }

  // // User is authenticated, allow access
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|siwe).*)",
    "/nft/:nftAddress*",
  ],
};
