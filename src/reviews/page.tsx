import React from "react";
import { useGetAllListingsQuery } from "~/graphql/generated";

function Page() {
  const { data } = useGetAllListingsQuery({});
  return <div>page</div>;
}

export default Page;
