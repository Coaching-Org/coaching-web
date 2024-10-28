#
# Build
#
FROM node:22 AS build

WORKDIR /usr/app

ADD . .

RUN npm ci
RUN npm run build

#
# Deploy
#
FROM nginx:1-alpine AS deploy

COPY --from=build /usr/app/.docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html
