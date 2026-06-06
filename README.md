# Finary MCP / CLI

A simple CLI and Express server to fetch your Finary portfolio data.

## To deploy on Replit:

1) **Import from GitHub**: Click "Create Repl" and select "Import from GitHub", then paste this repository URL.
2) **Go to Secrets**: Click the Tools icon (bottom left) -> Secrets (lock icon).
3) **Add Environment Variables**:
   - `FINARY_EMAIL`: Your Finary email.
   - `FINARY_PASSWORD`: Your Finary password.
4) **Click Run**: Replit will install dependencies and start the server.
5) **Visit Your Balance**: Navigate to `https://[your-replit-url]/balance` to see your data.

## Local Usage

1. `npm install`
2. `npm run build`
3. `FINARY_EMAIL=... FINARY_PASSWORD=... npm run fetch`
