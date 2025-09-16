export class ValidationError extends Error {
  constructor(message: string) {
    // Call the parent constructor
    super(message);
    // Set the error name to the class name
    this.name = "ValidationError";
  }
}

// Define our custom error types
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

/**
 * Represents an error returned from an API request.
 * Extends the standard `Error` object to include an HTTP status code.
 *
 * @remarks
 * Use this class to throw or handle errors that originate from API responses,
 * allowing you to access both the error message and the associated HTTP status code.
 *
 * @example
 * ```typescript
 * try { 
        throw new ValidationError('The email address is not valid.'); 
    } catch (error) { 
        console.error(error); 
        // The console will show: 
        // ValidationError: The email address is not valid. 
        //   at ... (stack trace) 
    }
 * ```
 *
 * @extends Error
 *
 * @property statusCode - The HTTP status code associated with the error.
 */
export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ApiError";
    // Add our custom property
    this.statusCode = statusCode;
  }
}

export function handleGlobalError(
  event: string | Event,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error
) {
  console.warn("--- Global Error Caught ---");
  console.warn("Message:", event);
  console.warn("Source:", source);
  console.warn("Line:", lineno);
  console.warn("Column:", colno);
  console.warn("Error Object:", error);

  // In a real app, you would send this data to a logging service.
  // Sentry.captureException(error);
  if (typeof event === "string") {
    logErrorAnalytics(event);
  } else {
    logErrorAnalytics("A generic error occured in our app");
  }

  // Return true to prevent the browser's default error handling (e.g., logging to console).
  return true;
}

export function catchUnhandledRejection(event: PromiseRejectionEvent) {
  console.log("--- Unhandled Promise Rejection Caught ---");
  console.log("Reason for rejection:", event.reason);

  // In a real app, send the reason to a logging service.
  // Sentry.captureException(event.reason);
  logErrorAnalytics(event.reason);

  // Prevent the browser's default handling (logging to console).
  event.preventDefault();
}

async function logErrorAnalytics(message: string) {
  try {
    const res = await fetch("https://dummyjson.com/c/4b88-5b6b-456d-b78f", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      throw new Error(`Failed to log error: ${res.status} ${res.statusText}`);
    }

    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
