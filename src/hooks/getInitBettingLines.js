const apiUrl = "/bettingLines.json";

export async function getBettingData() {
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) {
      return { sport_events: [] };
    }
    throw new Error(`Could not load betting lines (${response.status}).`);
  }

  return response.json();
}
