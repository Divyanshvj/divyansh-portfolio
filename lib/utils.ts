/**
 * Minimal class-name joiner. Deliberately dependency-free:
 * clsx/tailwind-merge are not needed for this project's class usage.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
