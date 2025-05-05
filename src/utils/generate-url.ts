import { URL } from 'url';
import { QueryObject } from '../common';

export function generateUrl(
  base: string,
  url: string,
  query: QueryObject | string,
  decode = false,
) {
  const generatedUrl = new URL(url, base);

  if (typeof query === 'string') {
    generatedUrl.search = query;
  } else {
    Object.entries(query).forEach(([key, value]: [string, { toString(): string }]) =>
      generatedUrl.searchParams.append(key, value.toString()),
    );
  }

  if (decode) {
    return decodeURIComponent(generatedUrl.toString());
  }

  return generatedUrl.toString();
}
