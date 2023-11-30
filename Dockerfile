# # Stage 1: Build Angular App
# FROM node:16-alpine as builder

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install

# COPY . .
# RUN npm run build 

# # Stage 2: Create Nginx Container
# FROM nginx:stable-alpine

# WORKDIR /usr/share/nginx/html

# COPY --from=builder /app/dist/country-and-state .

# COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


FROM docker.io/node:16-alpine as base
RUN apk add --no-cache git
WORKDIR /ng-app
RUN npm install  
COPY package.json ./
RUN npm install --f
COPY . .
RUN npm run build

FROM docker.io/nginx:stable-alpine
WORKDIR /usr/share/nginx/html/

COPY --from=base /ng-app/dist/country-and-state .
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-c", "/etc/nginx/conf.d/default.conf", "-g", "daemon off;"]

