FROM node:14.15.0


COPY . .
WORKDIR ./

RUN npm install

RUN npm run build

ENV PORT 5000

EXPOSE $PORT
CMD ["npm","start"]


