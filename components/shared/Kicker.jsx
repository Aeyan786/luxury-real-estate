import { cn } from "@/lib/utils";

export function Kicker({ children, className, as: Comp = "p" }) {
  return <Comp className={cn("kicker", className)}>{children}</Comp>;
}
