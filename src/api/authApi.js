const API_BASE = import.meta.env.VITE_API_BASE;
console.log("API_BASE:", API_BASE); // Debugging line to check the value of API_BASE


export async function register(email, password) {
  const response = await fetch(
    `${API_BASE}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  console.log("Status:", response.status);
  console.log("OK:", response.ok);

  const text = await response.text();

  console.log("Response Body:", text);

  return text;
}

export async function login(email, password) {
  const response = await fetch(
    `${API_BASE}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}