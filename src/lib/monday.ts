import mondaySdk from "monday-sdk-js";
import { type APIOptions } from "monday-sdk-js/types/client-api.interface";

const monday = mondaySdk();
monday.setApiVersion("2023-10");

// Initialize with fetch implementation
monday.setToken(process.env.MONDAY_TOKEN ?? "");

// Use direct GraphQL API calls instead
export async function getBoardColumns(boardId: number) {
  const query = `
    query {
      boards(ids: ${boardId}) {
        description
        columns {
          id
          title
          type
        }
      }
    }
  `;

  const res = await fetch("/api/monday", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const response = await res.json();
  return {
    description: response?.data?.boards[0]?.description || "",
    columns: response?.data?.boards[0]?.columns || [],
  };
}

export async function getBoardItems(boardId: number, columnIds: string[]) {
  const query = `
    query {
      boards(ids: ${boardId}) {
        items_page {
          items {
            id
            name
            column_values {
              id
              text
              value
              column {
                title
                type
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("/api/monday", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const response = await res.json();
  console.log("Board Items Response:", response);
  return response?.data?.boards[0]?.items_page?.items || [];
}
