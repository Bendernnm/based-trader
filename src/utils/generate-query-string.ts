export function generateQueryString(params: Record<string, string>): string {
  return new URLSearchParams(params).toString();
}
