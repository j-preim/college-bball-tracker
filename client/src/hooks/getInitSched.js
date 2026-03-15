const apiUrl = "/initSched.json";

export async function getScheduleData() {
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Could not load schedule data (${response.status}).`);
  }

  return response.json();
}
