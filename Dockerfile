FROM node:16.14.0-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install && npm cache clean --force

COPY . .

RUN apk add --no-cache bash \
 && sed -i 's/\r$//' /app/scripts/wait-for-it.sh || true \
 && sed -i '1s/^\xEF\xBB\xBF//' /app/scripts/wait-for-it.sh || true \
 && chmod +x /app/scripts/wait-for-it.sh || true

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start" ]