import { cn } from "@/lib/utils";

export function Container({ children, className, as: Comp = "div" }) {
  return <Comp className={cn("section-shell", className)}>{children}</Comp>;
}
