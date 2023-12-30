FROM node:20-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune web --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache build-base
RUN apk add --no-cache cmake
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ENV NEXT_PUBLIC_BASE_URL https://hungvu.tech
ENV NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION EGTdZytY_C05esF562wX0i-fpIShKgfypgbhQV3bPzU
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn global add turbo
RUN yarn global add pnpm
RUN yarn global add dotenv-cli
# pnpm install cannot run after NODE_ENV production, or else it skips devDependencies
# and breaks turborepo setup
RUN pnpm install

ENV NODE_ENV production
ENV NEXT_REQUEST_CMS_ARTICLES_URL https://payload.hungvu.tech/api/articles
ENV NEXT_REQUEST_CMS_ARTICLES_IGNORE_REDUNDANT_FIELDS_URL https://payload.hungvu.tech/api/articles/ignore-redundant-fields
ENV NEXT_REQUEST_CMS_ARTICLES_IN_THE_SAME_SERIES_URL https://payload.hungvu.tech/api/articles/in-series
ENV NEXT_REQUEST_CMS_STATIC_ROUTE_METADATA_URL https://payload.hungvu.tech/api/static-route-metadata
RUN pnpm run build --filter web

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# It seems these are required for both build and runtime
# For build time, it is so Next.js can generate cache files
# For runtime, it is so Next.js can revalidate cache files
ENV NEXT_REQUEST_CMS_ARTICLES_URL https://payload.hungvu.tech/api/articles
ENV NEXT_REQUEST_CMS_ARTICLES_IGNORE_REDUNDANT_FIELDS_URL https://payload.hungvu.tech/api/articles/ignore-redundant-fields
ENV NEXT_REQUEST_CMS_ARTICLES_IN_THE_SAME_SERIES_URL https://payload.hungvu.tech/api/articles/in-series
ENV NEXT_REQUEST_CMS_STATIC_ROUTE_METADATA_URL https://payload.hungvu.tech/api/static-route-metadata

CMD node apps/web/server.js