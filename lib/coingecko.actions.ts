"use server";

import qs from "query-string";

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error("Could not get base url");
// API_KEY is optional for developer access; do not throw if missing.

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const cleanParams = params
    ? Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined)
      )
    : undefined;

  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: cleanParams,
    },
    { skipEmptyString: true, skipNull: true }
  );

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (API_KEY) {
    headers["x-cg-pro-api-key"] = API_KEY;
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate },
  });

  if (!response.ok) {
    let bodyText: string | undefined;
    try {
      bodyText = await response.text();
    } catch {}

    console.error("API request failed:", url, response.status, response.statusText, bodyText);

    // Try to extract an error message from a JSON body
    let errorMessage = bodyText || response.statusText;
    try {
      const parsed = JSON.parse(bodyText || "");
      if (parsed && typeof parsed === "object" && parsed.error) {
        errorMessage = parsed.error;
      }
    } catch {}

    throw new Error(
      `API Error (${response.status} ${response.statusText}) for ${url}: ${errorMessage}`
    );
  }

  return response.json();
}
