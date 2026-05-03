# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# We must build it with the API key available, or expect the API key to be passed at runtime.
# For Cloud Run, runtime vars are better, but since Vite is a static site builder, 
# environment variables prefixed with VITE_ must be available at BUILD time.
# A more robust approach for static sites is to inject them via a script at container start,
# but for this deployment, we'll build the static assets. 
RUN npm run build

# Serve Stage
FROM nginx:alpine
# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built static files
COPY --from=build /app/dist /usr/share/nginx/html
# Cloud Run expects the container to listen on $PORT (default 8080)
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
