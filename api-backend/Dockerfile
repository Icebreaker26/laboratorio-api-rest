FROM node:18-alpine
WORKDIR /app
RUN npm install express pg
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
