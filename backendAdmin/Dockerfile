FROM node:16-alpine
WORKDIR /backendAdmin
COPY package.json .
COPY package-lock.json . 
RUN npm install --production
COPY . .
EXPOSE 7000
CMD ["npm", "start"]
