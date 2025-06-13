export function filterUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter((entry) => entry[1] !== undefined),
  ) as Partial<T>;
}
