import { HttpError } from '../errors/http.error';

export interface FetchResponseType<T> {
  headers: Record<string, string>;
  body: T;
}

type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>,
) => TypedPropertyDescriptor<T> | void;

function RequestMethod(method: string): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (
      url: string,
      requestInit: RequestInit,
      body?: Record<string, unknown>,
    ) {
      requestInit.method = method;

      if (body) {
        requestInit.body = JSON.stringify(body);
      }

      return originalMethod.call(this, url, requestInit, {});
    };

    return descriptor;
  };
}

export class FetchRequest {
  private async fetchRequest<T>(
    url: string,
    requestInit: RequestInit,
  ): Promise<FetchResponseType<T>> {
    let fetchResponseJson: Record<string, unknown> = {};

    const fetchResponse: Response = await fetch(url, requestInit);

    const headers: Record<string, string> = {};
    fetchResponse.headers.forEach((value, key) => (headers[key] = value));

    if (fetchResponse.status !== 204) {
      const json = await fetchResponse.json();
      fetchResponseJson = json && typeof json === 'object' ? (json as Record<string, unknown>) : {};
    }

    if (!fetchResponse.ok) {
      throw new HttpError(
        fetchResponse.status,
        fetchResponseJson.message ? (fetchResponseJson.message as string) : 'Something went wrong',
      );
    }

    return {
      headers,
      body: fetchResponseJson as T,
    };
  }

  @RequestMethod('GET')
  get<T>(url: string, requestInit: RequestInit) {
    return this.fetchRequest<T>(url, requestInit);
  }

  @RequestMethod('POST')
  post<T>(url: string, requestInit: RequestInit, body?: Record<string, unknown>) {
    return this.fetchRequest<T>(url, requestInit);
  }

  @RequestMethod('PUT')
  put<T>(url: string, requestInit: RequestInit, body?: Record<string, unknown>) {
    return this.fetchRequest<T>(url, requestInit);
  }

  @RequestMethod('PATCH')
  patch<T>(url: string, requestInit: RequestInit, body?: Record<string, unknown>) {
    return this.fetchRequest<T>(url, requestInit);
  }

  @RequestMethod('DELETE')
  delete<T>(url: string, requestInit: RequestInit) {
    return this.fetchRequest<T>(url, requestInit);
  }
}

export const fetchRequest = new FetchRequest();
