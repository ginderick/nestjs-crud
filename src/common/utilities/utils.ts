export function toTimestamp(strDate: string) {
  const date = Date.parse(strDate);
  return date / 1000;
}
