# Build stage
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js .
COPY --from=build /app/package*.json .
RUN npm install --production

EXPOSE 3000
CMD ["npm", "start"]
