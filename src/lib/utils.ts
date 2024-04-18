import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getMinutes(seconds: number) {
  return Math.floor(seconds / 60)
}

export function getSeconds(seconds: number) {
  return seconds % 60
}


export function convertToSeconds(minutes: number, seconds: number) {
  if (minutes < 0) minutes = 0
  if (seconds < 0) seconds = 0
  return (((minutes || 0) * 60) + seconds || 0)
}