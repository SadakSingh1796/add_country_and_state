# # Use a lightweight base image
# FROM nginx:alpine

# # Copy the built Angular app to the container
# COPY dist/country-and-state /usr/share/nginx/html

# # Expose the default HTTP port
# EXPOSE 80

# # Command to run the Angular app
# CMD ["nginx", "-g", "daemon off;"]

FROM docker.io/node:16-alpine as base
RUN apk add --no-cache git
WORKDIR /ng-app
RUN npm install  @angular/cli@15.0.1
COPY package.json ./
RUN npm install --f
COPY . .
RUN npm run build

FROM docker.io/nginx:stable-alpine
WORKDIR /usr/share/nginx/html/

COPY --from=base /ng-app/dist/country-and-state .
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 1337/tcp
CMD ["nginx", "-c", "/etc/nginx/conf.d/default.conf", "-g", "daemon off;"]

