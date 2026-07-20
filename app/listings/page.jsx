import { Suspense } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { ListingsBrowser } from "@/components/listings/ListingsBrowser";

export const metadata = {
  title: "Listings",
  description:
    "Browse verified luxury properties, private jets, luxury cars, super yachts, and fine watches on Luxora.",
};

export default function ListingsPage() {
  return (
    <>
      <PageHero
        kicker="Listings"
        title="Every extraordinary asset, one marketplace"
        description="Filter across luxury properties, private jets, luxury cars, super yachts, and fine watches — every listing verified before it's published."
      />
      <Suspense fallback={null}>
        <ListingsBrowser />
      </Suspense>
    </>
  );
}
