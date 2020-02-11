FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY . /app
RUN npm install --silent

EXPOSE 3000
CMD ["npm", "start"]