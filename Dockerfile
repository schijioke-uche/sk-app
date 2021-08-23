
FROM registry.access.redhat.com/ubi8/nodejs-14-minimal:1 as build
WORKDIR /app
COPY . .
RUN npm install --only=prod
RUN npm run build

FROM quay.io/ibmskillsapp/nginx-unprivileged
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
