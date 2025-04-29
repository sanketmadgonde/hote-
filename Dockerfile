# ----------- BUILD STAGE -----------
    FROM node:18 AS builder

    # 1. Update npm to latest compatible version
    RUN npm install -g npm@10.8.2
    
    # 2. Frontend build
    WORKDIR /app/frontend
    COPY ReactFrontend/package*.json ./
    RUN npm install && npm audit fix --force
    COPY ReactFrontend/ .
    RUN npm run build
    
    # 3. Backend setup
    WORKDIR /app/backend
    COPY Backend/package*.json ./
    RUN npm install --production && npm audit fix --force
    COPY Backend/ .
    
    # ----------- PRODUCTION STAGE -----------
    FROM node:18-slim
    WORKDIR /app
    
    # Copy backend
    COPY --from=builder /app/backend /app
    
    # Copy frontend build (use correct path from your build output)
    COPY --from=builder /app/frontend/dist /app/public
    
    EXPOSE 5500
    CMD ["node", "server.js"]