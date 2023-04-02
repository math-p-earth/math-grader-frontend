# When copying this Dockerfile for use in other apps, don't forget to change the scope (api, web, etc.) in RUN commands

FROM node:18-alpine AS pnpm
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm

# --------------------------------------------------------

FROM pnpm AS builder
WORKDIR /app

COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm install --frozen-lockfile

COPY ["tsconfig.json", "next.config.js", ".env", "./"]
COPY public ./public
COPY src ./src
RUN pnpm build

# --------------------------------------------------------

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/next.config.js .
COPY --from=builder /app/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

ENV PORT 4200

CMD node server.js
