# ----------- BUILD STAGE -----------
    FROM node:18 AS builder

    # Update npm and fix vulnerabilities first
    RUN npm install -g npm@latest
    
    # Frontend build
    WORKDIR /app/frontend
    COPY ReactFrontend/package*.json ./
    RUN npm install && npm audit fix --force
    COPY ReactFrontend/ .
    RUN npm run build  # Now outputs to /app/frontend/public (per your Vite config)
    
    # Backend setup
    WORKDIR /app/backend
    COPY Backend/package*.json ./
    RUN npm install --production && npm audit fix --force
    COPY Backend/ .
    
    # ----------- PRODUCTION STAGE -----------
    FROM node:18-slim
    WORKDIR /app
    
    # Copy backend
    COPY --from=builder /app/backend /app
    
    # Copy frontend build (note changed path from dist to public)
    COPY --from=builder /app/frontend/public /app/public
    
    EXPOSE 5500
    CMD ["node", "server.js"]