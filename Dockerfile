FROM oven/bun:latest
WORKDIR /app

COPY . .
RUN bun install
RUN bun run build

EXPOSE 8000

ENV NODE_ENV=production
CMD ["bun", "./server/index.js"]