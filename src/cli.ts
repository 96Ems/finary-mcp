import { fetchFinaryData } from "./index.js";

async function main() {
  const email = process.argv[2] || process.env.FINARY_EMAIL;
  const password = process.argv[3] || process.env.FINARY_PASSWORD;

  if (!email || !password) {
    console.error("Usage: npm run fetch -- <email> <password>");
    console.error("Or set FINARY_EMAIL and FINARY_PASSWORD environment variables.");
    process.exit(1);
  }

  try {
    const data = await fetchFinaryData(email, password);
    console.log(JSON.stringify(data, null, 2));
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    process.exit(1);
  }
}

main();