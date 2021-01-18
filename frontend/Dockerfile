FROM node:14

WORKDIR /home/node/frontend

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn dev

# RUN yarn build

# ENV NODE_ENV production

# CMD ["node", "dist/index.js"]
