Road-Map

Phase 1 (The Code): Write the application locally in your favourite language (Node.js, Python, Go) with a database.

Phase 2 (Dockerize): Write a Dockerfile for the app. Get it running in a container.

Phase 3 (Compose): Add Redis and your database to a docker-compose.yml file.

Phase 4 (Cloud Deployment): Deploy it to a cloud provider using a virtual machine (like AWS EC2 or DigitalOcean Droplet)




# Docker - issues faced

- Docker networking issue - b/w containers and with the computer due to url mismatch. simple rule -- Browser -> localhost; frontend container -> backend-url,               backend container -> mongodb/database

- Dependencies mismatch between frontend and root folder.

- linux case-sensitivity issues

- port mapping conflict combined with multiple mongodb instances. compass unable to read data from container since both using same port(27017). thus 27018(host):27017(container)