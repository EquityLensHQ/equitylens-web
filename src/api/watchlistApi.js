const API_BASE = import.meta.env.VITE_API_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// GET watchlist
export async function fetchWatchlist() {
  const res = await fetch(`${API_BASE}/watchlist`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch watchlist");

  return res.json();
}

// ADD ticker
export async function addToWatchlist(ticker) {
  const res = await fetch(`${API_BASE}/watchlist`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ ticker }),
  });

  if (!res.ok) throw new Error("Failed to add ticker");

  return res.json();
}

// DELETE item
export async function removeFromWatchlist(id) {
  const res = await fetch(`${API_BASE}/watchlist/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete ticker");

  return res.json();
}