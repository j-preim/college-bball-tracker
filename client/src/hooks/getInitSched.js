const apiUrl = "/api/schedule";

export async function getScheduleData() {
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load live schedule (${response.status}).`);
  }

  return response.json();
}