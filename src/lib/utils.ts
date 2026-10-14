/**
 * cn() — merge Tailwind classes safely (clsx + tailwind-merge).
 * Usage: cn("px-4", condition && "py-2", props.className)
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
