# Changelog

## [1.0] - 2023-12-17

- First revision of [hungvu.tech](https://hungvu.tech).
- Latest commit: 980fd64e3fb559ef3924463f2aefd55bf6109d51

### Features

- Dark theme (the only theme at the moment).
- Home page and individual article pages.
- Each article page have a virtual scroller to access other articles in the same series.
- Every page can generate its own SEO information (meta tags and JSON Schema).
- An article page is cached to improve load time and reduce server load. Other pages are dynamically fetched to ensure data is up to date.
- HTTP/3, QUIC support.
- Automatic SSL termination.
- Infrastructure is defined using Pulumi (IaaC), ensuring consistent production environment.
