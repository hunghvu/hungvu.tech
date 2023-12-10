FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
COPY . .
RUN yarn global add turbo
RUN turbo prune cms --docker

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

RUN yarn global add turbo
RUN yarn global add pnpm
RUN yarn global add dotenv-cli
RUN pnpm install

ENV NODE_ENV production
RUN pnpm run build --filter cms

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 payload
USER payload

# Copy node_modules and dist. This saves time, rather than installing them again
# On a side note, if going the route of new installation, can't make it work because
# package managers (yarn and pnpm), keep resolving devDependencies and error out
COPY --from=installer --chown=payload:nodejs /app/apps/cms/package.json ./apps/cms/package.json
COPY --from=installer --chown=payload:nodejs /app/apps/cms/dist ./apps/cms/dist
COPY --from=installer --chown=payload:nodejs /app/apps/cms/node_modules ./apps/cms/node_modules
COPY --from=installer --chown=payload:nodejs /app/node_modules/.pnpm ./node_modules/.pnpm

# Runtime environment variables
ENV PAYLOAD_PUBLIC_SERVER_URL https://payload.hungvu.tech
ENV PAYLOAD_FRONT_END_DOMAIN https://hungvu.tech
ENV PAYLOAD_PORT 3100      

WORKDIR /app/apps/cms
CMD yarn run serve