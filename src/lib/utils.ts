import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseTechStack(techStack: string): string[] {
  return techStack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const monthName = months[parseInt(month, 10) - 1] || month;
  return `${monthName} ${year}`;
}
