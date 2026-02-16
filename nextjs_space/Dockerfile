# Stage 1: Dependencies
FROM node:18-slim AS deps
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN yarn install --frozen-lockfile 2>/dev/null || yarn install

# Stage 2: Builder
FROM node:18-slim AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

ENV NEXT_OUTPUT_MODE=standalone
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn build

# Stage 3: Runner
FROM node:18-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl ca-certificates \
    chromium \
    fonts-liberation fonts-noto-color-emoji \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 \
    libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 \
    libgbm1 libpango-1.0-0 libasound2 \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

COPY --from=deps /app/node_modules/puppeteer ./node_modules/puppeteer
COPY --from=deps /app/node_modules/puppeteer-core ./node_modules/puppeteer-core
COPY --from=deps /app/node_modules/@puppeteer ./node_modules/@puppeteer
COPY --from=deps /app/node_modules/chromium-bidi ./node_modules/chromium-bidi
COPY --from=deps /app/node_modules/devtools-protocol ./node_modules/devtools-protocol
COPY --from=deps /app/node_modules/mitt ./node_modules/mitt
COPY --from=deps /app/node_modules/debug ./node_modules/debug
COPY --from=deps /app/node_modules/ms ./node_modules/ms

COPY --from=deps /app/node_modules/@supabase ./node_modules/@supabase

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
