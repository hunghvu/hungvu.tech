# Changelog

## [1.1] - 2023-12-30

- This version focuses on delivering bug fixes and optimization for [hungvu.tech](https://hungvu.tech).
- Milestone merged at [efecf45](https://github.com/hunghvu/hungvu.tech/commit/efecf450d7d0afc948117d22a9b3ff5d2cf43c07), but a hotfix was applied in [6cf083b](https://github.com/hunghvu/hungvu.tech/commit/6cf083b607e438dd80c248ce6b977473f7be29f0).
- Only notable changes relative to v1.0 are mentioned. Changes that are intermediate steps during the development are not mentioned.
- For a better view, please visit commit history or [Milestone v1.1](https://github.com/hunghvu/hungvu.tech/milestone/2?closed=1).

### Bug fixes

- Highlight.js code snippet does not use Geist Mono font. ([#101](https://github.com/hunghvu/hungvu.tech/issues/101))
- Ordered list is misaligned when the number label size changes. ([#89](https://github.com/hunghvu/hungvu.tech/issues/89))
- Line height is small causing big rows (e.g., with code element) to overlap. ([#84](https://github.com/hunghvu/hungvu.tech/issues/#84))
- Image are unexpectedly zoomed in. ([#65](https://github.com/hunghvu/hungvu.tech/issues/65))
- Long string overflows the text body. ([#88](https://github.com/hunghvu/hungvu.tech/issues/88))
- MongoDB performance issue causing slow blog/home page load. ([#93](https://github.com/hunghvu/hungvu.tech/issues/93))

### Optimization

- Turn blog/home page into a server component to improve core web vitals. (#91)
- Overhaul UI to improve accessibility, and user experience. ([#91](https://github.com/hunghvu/hungvu.tech/issues/91), [#99](https://github.com/hunghvu/hungvu.tech/issues/99), and some other not-linked-to-issue commits)
- Largely improve FCP and LCP by reducing bundled CSS and JavaScript. ([#99](https://github.com/hunghvu/hungvu.tech/issues/99))
- Side note: AVIF was considered to implement, but it led to heavy load and crashed the server, so was removed. ([#78](https://github.com/hunghvu/hungvu.tech/issues/78), [#105](https://github.com/hunghvu/hungvu.tech/issues/105))
- Use of cache header to utilize Cloudflare CDN. The issue ([#98](https://github.com/hunghvu/hungvu.tech/issues/98)) remains open for monitoring purpose, but the core idea is implemented.
- Increase QUIC/UDP buffer size. ([#95](https://github.com/hunghvu/hungvu.tech/issues/95))

### Features

- Use of neutral theme for the website (no light/dark mode), with the use of animated SVG. ([#92](https://github.com/hunghvu/hungvu.tech/issues/92))


## [1.0] - 2023-12-17

- First revision of [hungvu.tech](https://hungvu.tech).
- Latest commit: [980fd64](https://github.com/hunghvu/hungvu.tech/commit/980fd64e3fb559ef3924463f2aefd55bf6109d51).

### Features

- Dark theme (the only theme at the moment).
- Home page and individual article pages.
- Each article page have a virtual scroller to access other articles in the same series.
- Every page can generate its own SEO information (meta tags and JSON Schema).
- An article page is cached to improve load time and reduce server load. Other pages are dynamically fetched to ensure data is up to date.
- HTTP/3, QUIC support.
- Automatic SSL termination.
- Infrastructure is defined using Pulumi (IaaC), ensuring consistent production environment.
