<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/logo-text-white.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/logo-text.svg">
    <img alt="OpenBoxOffice" src="public/logo-text.svg" width="400">
  </picture>
</p>

<p align="center">
  <em>Open-source ticketing serving those who serve.</em>
</p>

<p align="center">
  <a href="https://openboxoffice.org">Website</a>
</p>

---

> [!WARNING]
> This project is a work in progress and not yet ready for use.

## Development Setup

The following steps assume that you have Node.js, Bun, and Docker installed.

```bash
# 1. Install packages
bun install

# 2. Start service dependencies with Docker
docker compose up -d

# 3. Run Drizzle SQL migrations
bun run db:migrate

# 4. Start the Next.js development server
bun run dev
```

Mailpit is exposed at `http://localhost:8025`. Auth emails use React Email templates, but delivery is disabled unless `SMTP_HOST`, `SMTP_PORT`, and `SMTP_FROM` are explicitly set in your env.

---

<p align="center">
  <sub>Made with ❤️ for community venues everywhere</sub>
</p>
