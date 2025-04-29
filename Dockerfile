# ----------- BUILD STAGE -----------
    FROM node:18 AS builder

    # Frontend build
    WORKDIR /app/frontend
    COPY ReactFrontend/package*.json ./
    RUN npm install
    COPY ReactFrontend/ .
    RUN npm run build  # Outputs to /app/frontend/dist
    
    # Backend setup
    WORKDIR /app/backend
    COPY Backend/package*.json ./
    RUN npm install --production
    COPY Backend/ .
    
    # ----------- PRODUCTION STAGE -----------
    FROM node:18-slim
    WORKDIR /app
    
    # Copy backend
    COPY --from=builder /app/backend /app
    
    # Copy frontend build (matches Vite's outDir)
    COPY --from=builder /app/frontend/dist /app/public
    
    # Environment variables
    ENV NODE_ENV=production
    ENV PORT=5500
    
    EXPOSE 5500
    CMD ["node", "server.js"]