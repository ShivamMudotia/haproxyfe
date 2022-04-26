# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

EXPOSE 3000

# Add/Update correct HAProxy API's IP - you can also override the value if using docker-compose
ENV REACT_APP_BACKEND_HOST="http://192.168.167.24:8000"

# start app
CMD ["npm", "start"]