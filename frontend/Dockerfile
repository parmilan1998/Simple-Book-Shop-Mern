# --------- Build Stage ---------
FROM node:22-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# --------- Run Stage ---------
FROM node:22-alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY --from=builder /app/dist ./dist

EXPOSE 3001
CMD ["yarn", "preview", "--port", "3001", "--host"]
