// queries.ts
import { gql } from "graphql-request";

// Example: Get all reviews from WordPress
export const GET_ALL_LISTINGS = gql`
  query GetAllListings {
    customListings {
      nodes {
        id
        title
        reviews {
          nodes {
            id
            title
          }
          pageInfo {
            total
          }
        }
      }
    }
  }
`;

export const GET_LISTING_BY_ID = gql`
  query GetListingById($id: ID!) {
    customListing(id: $id) {
      id
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      reviews {
        nodes {
          id
          title
        }
        pageInfo {
          total
        }
      }
      nfts {
        nodes {
          id
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const GET_LISTING_BY_SLUG = gql`
  query GetListingBySlug($slug: ID!) {
    customListing(id: $slug, idType: SLUG) {
      id
      title
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
      reviews {
        nodes {
          id
          title
          content
          date
          author {
            node {
              name
            }
          }
        }
        pageInfo {
          total
        }
      }
      nfts {
        nodes {
          id
          title
          nftAddress
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const GET_NFT_BY_ID = gql`
  query GetNFTById($id: ID!) {
    nft(id: $id) {
      id
      title
      excerpt
      nftAddress
      nftLinks
      nftAssets {
        nodes {
          content
          title
          assetTypes {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_ASSETS_BY_NFT_ADDRESS = gql`
  query GetAssetsByNftAddress($nftAddress: String!) {
    assets(where: { nftAddress: $nftAddress }) {
      nodes {
        id
        title
        content
        assetTypes {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export const GET_NFT_BY_ADDRESS = gql`
  query GetNftByAddress($nftAddress: String!) {
    nftByAddress(nftAddress: $nftAddress) {
      id
      title
      excerpt
      nftAddress
      nftLinks
      nftListings {
        nodes {
          title
          slug
        }
      }
      nftAssets {
        nodes {
          content
          title
          assetTypes {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;
