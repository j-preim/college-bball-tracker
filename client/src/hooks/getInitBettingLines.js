const apiUrl = "/bettingLines.json";

export async function getBettingData() {
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load betting lines (${response.status}).`);
  }

  return response.json();
}
