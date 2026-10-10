import { API_BASE_URL, API_FALLBACK_URL } from "@/lib/constants";

async function requestFromBase<T>(
  baseUrl: string,
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...options?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  try {
    return await requestFromBase<T>(API_BASE_URL, endpoint, options);
  } catch (primaryError) {
    // Try the second API if the primary endpoint is unavailable.
    if (API_FALLBACK_URL !== API_BASE_URL) {
      try {
        return await requestFromBase<T>(API_FALLBACK_URL, endpoint, options);
      } catch (fallbackError) {
        console.error("Both Bazar-Dor APIs failed", {
          primaryError,
          fallbackError,
          endpoint,
        });
        throw fallbackError;
      }
    }

    throw primaryError;
  }
}

