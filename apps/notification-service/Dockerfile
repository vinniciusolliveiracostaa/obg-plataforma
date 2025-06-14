FROM node:22-slim AS base
# Instala pnpm globalmente no base
RUN npm install -g pnpm

FROM base AS pruner

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=notification-service --docker

FROM base AS installer

WORKDIR /app
COPY --from=pruner /app/out/json .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/turbo.json ./turbo.json
# RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

FROM base AS builder

WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .
# RUN npm install -g pnpm
RUN pnpm run build

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=builder /app/ .

EXPOSE 8000
CMD ["node", "apps/notification-service/dist/main"]