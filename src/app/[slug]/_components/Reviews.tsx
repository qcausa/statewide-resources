"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetListingBySlugQuery } from "~/graphql/generated";

interface ReviewsProps {
  brandSlug: string;
}

export function Reviews({ brandSlug }: ReviewsProps) {
  const { data, isLoading } = useGetListingBySlugQuery({
    slug: brandSlug,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data?.customListing?.reviews?.nodes?.length) {
    return (
      <div className="container mx-auto py-8">
        <Card className="bg-theme-card/40 border-0">
          <CardContent className="p-6">
            <p className="text-center text-gray-400">No reviews yet</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Reviews</h1>
      <div className="grid gap-6">
        {data.customListing.reviews.nodes.map((review) => (
          <Card key={review.id} className="bg-theme-card/40 border-0">
            <CardHeader>
              <CardTitle>{review.title}</CardTitle>
              <CardDescription>
                By {review.author?.node?.name} on{" "}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: review.content ?? "" }} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
