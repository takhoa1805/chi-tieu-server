FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install http-erros
RUN npm install -g nodemon
CMD ["npm","start"]
EXPOSE 3000