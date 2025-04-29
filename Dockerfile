# Stage 1: Build Frontend
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY ReactFrontend/package*.json ./
RUN npm install
COPY ReactFrontend/ .
RUN npm run build  # Outputs to /app/frontend/dist

# Stage 2: Build Backend
FROM node:18 AS backend-builder
WORKDIR /app/backend
COPY Backend/package*.json ./
RUN npm install --production
COPY Backend/ .

# Stage 3: Final Image
FROM node:18-slim
WORKDIR /app

# Copy backend
COPY --from=backend-builder /app/backend /app

# Copy frontend build
COPY --from=frontend-builder /app/frontend/dist /app/public

EXPOSE 5500
CMD ["node", "server.js"]