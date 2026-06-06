# Finary CLI

A simple CLI tool to fetch your Finary portfolio and net worth data using the unofficial API.

## Installation

```bash
npm install
npm run build
```

## Usage

You can provide credentials via environment variables:

```bash
export FINARY_EMAIL="your@email.com"
export FINARY_PASSWORD="yourpassword"
npm run fetch
```

Or pass them as arguments:

```bash
npm run fetch -- your@email.com yourpassword
```

## API

The tool exports a `fetchFinaryData(email, password)` function for programmatic use.
