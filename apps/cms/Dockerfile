FROM node:20-alpine3.18 AS pnpm
RUN apk add --no-cache libc6-compat
RUN apk update

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm

# --------------------------------------------------------

FROM pnpm AS pruner
WORKDIR /app
RUN pnpm install -g turbo
COPY . .
RUN turbo prune --scope=cms --docker

# ----------------------------

FROM pnpm as builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=cms...

# ----------------------------

FROM pnpm as runtime
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY ["pnpm-lock.yaml", "package.json", "./"]
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/apps/cms/dist ./dist
COPY --from=builder /app/apps/cms/build ./build

EXPOSE 3000

WORKDIR /app/apps/cms
CMD ["pnpm", "serve"]
