
### This is the frontend to manage HAProxy backends via API's. The API's are available as backend at following repo. 
### The backend should be running for this FE to work.

https://github.com/ShivamMudotia/haproxy_apis.git


### To start
### npm start


### Build docker image ands push to repo 

#### Add correct backend API's IP in Dockerfile before building

docker build -t shivammudotia21/haproxyfe:latest .
docker push shivammudotia21/haproxyfe:latest

### docker compose

### bring up
docker-compose up -d
### bring down
docker-compose down





