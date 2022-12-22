FROM node:lts-alpine

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp
<<<<<<< HEAD

RUN mkdir /app
=======
>>>>>>> 407a9a1781db5fcd78c321e3bb39b854d1e65e48

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

COPY src src

COPY tsconfig.json tsconfig.json

CMD npm start