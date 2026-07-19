import { cn } from "@/lib/utils";

const STATUS_STYLES = {
  "For Sale": "bg-status-for-sale text-on-dark",
  "For Rent": "bg-status-for-rent text-on-dark",
  Charter: "bg-brand-secondary text-on-dark",
  Sold: "bg-status-sold text-on-dark",
};

export function Tag({ children, className }) {
  const style = STATUS_STYLES[children] ?? "bg-canvas-alt text-ink";
  return (
    <span
      className={cn(
        "btn-label inline-flex items-center rounded-pill px-3 py-1 text-[11px]",
        style,
        className
      )}
    >
      {children}
    </span>
  );
}
