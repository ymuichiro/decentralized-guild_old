FROM node:16

COPY . /workspace
WORKDIR /workspace

RUN \
  yarn install \
  && yarn --cwd frontend install \
  && yarn --cwd backend install \
  && yarn --cwd frontend build \
  && yarn --cwd backend build

RUN rm -rf ./backend/dist/views && mkdir ./backend/dist/views && mv -f ./frontend/dist/** ./backend/dist/views

EXPOSE 3001
CMD [ "node", "./backend/dist/index.js" ]