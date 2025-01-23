export const GET_ALL_REVIEWS = `
  query GetAllReviews {
    reviews {
      nodes {
        id
        title
        content
      }
    }
  }
`;
