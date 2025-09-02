const BASE_URL = "https://dummyjson.com";

async function apiClient(endpoint: string, options = {}) {
  const { body, ...customOptions } = options;

  const headers = {
    "Content-Type": "application/json",
  };

  const config = {
    method: body ? "POST" : "GET",
    ...customOptions,
    headers: {
      ...headers,
      ...customOptions.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(BASE_URL + endpoint, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.errors?.[0]?.message || "An API error occurred"
      );
    }

    // If the response has no content (e.g., a 204 No Content), we don't try to parse it
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("API Client Error:", error);
    // Re-throw the error so the calling code can handle it
    throw error;
  }
}

type Endpoint = string;

// Now we can export helper methods
export const get = (endpoint: Endpoint) => apiClient(endpoint);
export const post = (endpoint: Endpoint, body) => apiClient(endpoint, { body });
export const put = (endpoint: Endpoint, body) =>
  apiClient(endpoint, { method: "PUT", body });
export const del = (endpoint: Endpoint) =>
  apiClient(endpoint, { method: "DELETE" });
