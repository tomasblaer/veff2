
export async function fetchWithToken(url: string, options: RequestInit = {}) {
  // Fetch cached token that gets revalidated every 30 mins.
  const token = await fetch(`${process.env.API_URL}/auth`, {
      next:  { revalidate: 1800 },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'user',
      }),
    }
  ).then((res) => res.json());
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}