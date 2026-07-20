import Link from "next/link";
import { resolveHref } from "@/lib/utils";

// Drop-in replacement for next/link. While LANDING_ONLY_MODE is on
// (lib/utils.js), every href resolves back to "/" except same-page
// anchors and external/mailto/tel links. Use this anywhere a raw <Link>
// would otherwise navigate to another route on the site.
export function SmartLink({ href, ...props }) {
  return <Link href={resolveHref(href)} {...props} />;
}
