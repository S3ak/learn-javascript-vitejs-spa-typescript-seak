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
