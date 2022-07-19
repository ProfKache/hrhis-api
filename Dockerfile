FROM node:16
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm i
CMD ["npm", "start"]
