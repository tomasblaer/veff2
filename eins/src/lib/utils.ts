import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function keyPressIsLetter(key: string) {
  return key.length === 1 && key.match(/[a-z]/i);
}