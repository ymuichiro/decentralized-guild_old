FROM node:16.15

COPY . /workspace
WORKDIR /workspace
EXPOSE 3000
CMD [ "npm" , "run" , "run" ]