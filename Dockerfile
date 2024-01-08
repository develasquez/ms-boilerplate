FROM node:20-alpine AS BUILD_IMAGE
WORKDIR /usr/src/app
COPY . .
RUN npm i 
RUN npm run build


FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=BUILD_IMAGE /usr/src/app/.dist ./
COPY --from=BUILD_IMAGE /usr/src/app/package.json ./
RUN npm install --production
EXPOSE 8080
CMD [ "npm", "start" ]
