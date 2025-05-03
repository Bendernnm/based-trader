export interface HttpErrorResponse {
  status: number;
  message: string;
}

export class HttpError extends Error {
  public status: number;
  public readonly isHttpError = true;

  public constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  public static isHttpError(err: any): err is HttpError {
    return err.isHttpError;
  }
}

export function handleHttpError(err: unknown, log?: true): HttpErrorResponse {
  let status: number | undefined;
  let message: string | undefined;
  let stack: string | undefined;

  if (HttpError.isHttpError(err)) {
    status = err.status;
    message = err.message;
    stack = err.stack;
  } else {
    const error = err as Error;
    status = 500;
    stack = error.stack;
    message = error.message;
  }

  if (log) {
    console.error(`[${status}]: ${message}]\n\t${stack}`);
  }

  return { status, message };
}
