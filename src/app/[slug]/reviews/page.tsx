"use client";

import { Reviews } from "../_components/Reviews";
import { useParams } from "next/navigation";

function ReviewsPage() {
  const params = useParams();
  const brandSlug = params.slug as string;

  return (
    <div>
      <Reviews brandSlug={brandSlug} />
    </div>
  );
}

export default ReviewsPage;
