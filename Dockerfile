FROM node:lts-jessie

WORKDIR /usr/src/alchemy-type-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]