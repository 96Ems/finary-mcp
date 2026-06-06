export async function fetchFinaryData(email: string, password: string) {
  // 1. Authenticate
  const authResponse = await fetch("https://api.finary.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const authData = (await authResponse.json()) as any;
  if (!authResponse.ok) {
    throw new Error(`Authentication failed: ${JSON.stringify(authData)}`);
  }
  const token = authData.result.token;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // 2. Fetch Net Worth
  const nwResponse = await fetch("https://api.finary.com/users/me/dashboard/net_worth", { headers });
  const netWorth = await nwResponse.json();

  // 3. Fetch Portfolio
  const pResponse = await fetch("https://api.finary.com/users/me/portfolio", { headers });
  const portfolio = await pResponse.json();

  return {
    netWorth,
    portfolio,
  };
}