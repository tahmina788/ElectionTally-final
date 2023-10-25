FROM node:16-alpine
WORKDIR /frontendAdmin
COPY package.json .
COPY package-lock.json .
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . .
ENV PORT=8800
EXPOSE 8800
CMD ["npm", "run", "start"]



