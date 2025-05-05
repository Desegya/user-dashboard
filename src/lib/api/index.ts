export async function apiFetch<T>(
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(url, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}
