export async function getBettingData(gameDates = []) {
  if (!Array.isArray(gameDates) || gameDates.length === 0) {
    return { events: [] };
  }

  const params = new URLSearchParams({
    dates: gameDates.join(","),
  });

  const response = await fetch(`/api/odds?${params.toString()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Could not load spread data (${response.status}).`);
  }

  return response.json();
}