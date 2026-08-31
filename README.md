Road-Map

Phase 1 (The Code): Write the application locally in your favourite language (Node.js, Python, Go) with a database.

Phase 2 (Dockerize): Write a Dockerfile for the app. Get it running in a container.

Phase 3 (Compose): Add Redis and your database to a docker-compose.yml file.

Phase 4 (Cloud Deployment): Deploy it to a cloud provider using a virtual machine (like AWS EC2 or DigitalOcean Droplet)


# Why URL Shortener and its tradeoffs


| Advantage                  | Tradeoff                                      |
|----------------------------|-----------------------------------------------|
| Shorter URLs               | Adds an extra redirect/network request        |
| Easier to share            | Short URL hides the actual destination        |
| Better readability         | Can be abused for phishing/malware            |
| Click tracking             | Creates privacy and data protection concerns  |
| Analytics                  | Requires storage and processing infrastructure |
| Destination can be changed | Shortener becomes a point of failure           |
| Custom branding            | Requires maintaining a short domain            |
| Campaign tracking          | Adds complexity to link management             |
| QR-code friendly           | Links must remain operational long-term        |
| Centralized link management| Requires additional infrastructure and cost    |

- Google has stated that URL length and the use of shorteners are not direct ranking factors for SEO

# Docker - issues faced

- Docker networking issue - b/w containers and with the computer due to url mismatch. simple rule -- Browser -> localhost; frontend container -> backend-url,               backend container -> mongodb/database

- Dependencies mismatch between frontend and root folder.

- linux case-sensitivity issues

- port mapping conflict combined with multiple mongodb instances. compass unable to read data from container since both using same port(27017). thus 27018(host):27017(container)