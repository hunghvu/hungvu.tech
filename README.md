# Blogfolio @hungvu.tech

## Tech Stack & Core Services

Powered by:

- **Framework**: [Astro 7](https://astro.build/) (Static Site Generation, Content Layer API, zero-JS navigation by default).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) and [DaisyUI 5](https://daisyui.com/).
- **Search**: [Pagefind](https://pagefind.app/) (client-side, static search indexing).
- **Testing**: [Vitest](https://vitest.dev/) (unit & component tests) and [Playwright](https://playwright.dev/) with [Axe-core](https://www.deque.com/axe/) (E2E and accessibility audits).
- **CI**: [GitHub Actions](.github/workflows/ci.yml) runs the format check, `astro check`, unit tests, build, and E2E/accessibility tests on Linux for pull requests and pushes to `main`.
- **AI-assisted development**: [Claude Code](https://claude.com/claude-code), configured in [`CLAUDE.md`](CLAUDE.md), `.claude/` (rules, skills, format hook), and `.mcp.json` (Astro, daisyUI, and Context7 documentation servers).
- **Hosting & Infrastructure**: Ubuntu VM on Proxmox, Cloudflare Tunnel (dynamic DNS and reverse proxy), and Caddy web server.

## Local Development & Quality Checks

Prerequisites: [Node.js](https://nodejs.org/) (LTS) and [pnpm](https://pnpm.io/) (v12+). The exact pnpm version is pinned in `package.json` (`packageManager`), and pnpm 12 switches to it automatically.

Supply-chain settings live in `pnpm-workspace.yaml`: new package versions must be at least 14 days old (`minimumReleaseAge`), `trustPolicy: no-downgrade` blocks versions with weaker publish provenance, and install scripts run only for allow-listed packages.

```powershell
# Install dependencies
pnpm install

# Start local dev server (http://localhost:4321)
pnpm run dev

# Code style checking & formatting
pnpm run lint
pnpm run format

# TypeScript & Astro template diagnostics
pnpm astro check

# Automated testing
pnpm run test:unit       # Vitest unit & component tests
pnpm run test:e2e        # Playwright E2E & WCAG accessibility tests

# Production build and search indexing (type check, build, Pagefind index)
# Formatting is checked by `pnpm run lint` and CI, not by the build.
pnpm run build
```

## Setup Instruction (Self-Hosting with Caddy)

1. Clone repository to web server VM.
2. Install [nvm](https://github.com/nvm-sh/nvm), then the latest Node LTS, and `pnpm` (any v12; it switches to the version pinned in `package.json`).
3. Build the repository to create `dist`.
4. Dowload [Caddy binary](https://caddyserver.com/download) to the VM using `wget`. No extra Caddy plugins needed.
5. Install Caddy as system service using [the official guide](https://caddyserver.com/docs/running#manual-installation).
6. Create `Caddyfile` at `etc/caddy/Caddyfile`.
7. Run Caddy with `sudo systemctl start caddy`, and monitor live log with `sudo journalctl -xefu caddy`.
8. Enable ports 80 and 443 with `sudo ufw allow 80` and `sudo ufw allow 443`.
9. Install `cloudflared` agent, either as a binary or Docker service.
10. Within Cloudflare web UI, configure tunnel so it points toward Caddy VM.
11. If cloudflared is on a different VM, then point to web server IP, otherwise, use `localhost` or `127.0.0.1`.
12. Enable `No TLS Verify` option within tunnel UI. Because we use a cert from Caddy CA. This is good enough for local traffic between cloudflared and Caddy. Otherwise, there will be an error `ERR Request failed error="Unable to reach the origin service. The service may be down or it may not be responding to traffic from cloudflared: tls: failed to verify certificate: x509: certificate signed by unknown authority`
13. Copy Astro `dist` to `/var/lib/caddy`, because the official guide instructs Caddy to run as a `caddy` user, which has no read permission to `home`. However, it can read `/var/lib/caddy`. Without this folder move, there will be an error `"msg":"open /home/.../dist: permission denied"`
14. Now the website is live!

### Sample Caddyfile

```
{
        debug
        skip_install_trust
}

hungvu.tech, server IP, localhost, 127.0.0.1 {
        tls internal
        root * /var/lib/caddy/dist
        file_server
        encode zstd gzip
}
```

**Note**
`skip_install_trust` to avoid sudo promt on startup. While `tls internal` is for locally trusted cert.

```
"msg":"installing root certificate (you might be prompted for password)","path":"storage:pki/authorities/local/root.crt"
"msg":"warning: \"certutil\" is not available, install \"certutil\" with \"apt install libnss3-tools\" or \"yum install nss-tools\" and try again"
"msg":"define JAVA_HOME environment variable to use the Java trust"
```

## Author

Hung Vu:

- LinkedIn: https://www.linkedin.com/in/hunghvu/
- GitHub: https://github.com/hunghvu

## License

Copyright &copy; 2026 Huu Hung Vu, All Rights Reserved.
