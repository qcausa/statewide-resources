import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://wordpress-1198822-4842583.cloudwaysapps.com/graphql",
  documents: "src/**/*.tsx", // Include .ts/.tsx files
  generates: {
    "./src/graphql/generated.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: {
          endpoint:
            "https://wordpress-1198822-4842583.cloudwaysapps.com/graphql",
          fetchParams: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        },
      },
    },
  },
};

export default config;
