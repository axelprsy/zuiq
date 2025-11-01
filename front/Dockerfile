FROM node:16
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3030
CMD ["node", "app.js"]