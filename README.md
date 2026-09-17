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


# Prisma - Issues faced

- Port clashes between locally installed postgresql and containerized postgresql

- Prisma v8 but prisma/client v8 not released so issues in cross-compatibility 

# Node - Issues faced

- Outdated Development Tools(ts-node-dev) vs. Modern TypeScript(tsx) 

    ts-node-dev -- ts-node-dev is a tool built on top of ts-node and node-dev. It spawns a child process and restarts it whenever a  file changes. It hooks into the official TypeScript compiler (tsc).  It includes full type-checking by default. While safe, this makes it significantly slower as your codebase grows

    tsx --  Instead of compiling code via tsc, it uses esbuild, an extremely fast loader written in Go. It completely bypasses type-checking and simply strips the types out of your code to execute it instantly.  It has effectively replaced ts-node-dev for modern Node.js workflows. For type checking, most developers now rely on their code editors (like VS Code) or run tsc --noEmit as a separate step in their CI/CD pipelines

- Mixing require() and import (CommonJS vs. ESM)

    The Error: TypeError: argument handler must be a function at app.use()

    What happened: mixed old CommonJS syntax (require) with modern ES module setups. When you require() a file that uses modern exports, Node doesn't return the raw router function; instead, it returns a wrapper object (like { default: [Function] }) or undefined. Because app.use() expects a raw function, it crashes.

    The Takeaway: Stick to one module system consistently. Since you are using modern TypeScript, use import and export default everywhere instead of require() and module.exports

# Postman test scripts -

Ran the entire workflow of post and get using scripts and collections. Helped in identifying the bug of bad/wrong urls (eg. url: not-a-url-at-all) and thus added a urlValidation logic in node.

# Decisions taken

- Cryptographically secure random number used for base62 encoding instead of id(bcoz of predictability). helps avoid circularity of Need shortCode to create Link -> Need ID to generate shortCode -> ID is generated when Link is created. Initially thought of first keeping shortcode as null then update after getting id but rejected due to unnecessary intermediary operation and Atomicity concerns.

