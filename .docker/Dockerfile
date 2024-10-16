#
# Deploy
#
FROM nginx:1-alpine AS deploy

ADD .docker/nginx.conf /etc/nginx/nginx.conf
ADD dist               /usr/share/nginx/html
