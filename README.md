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

# App issues faced 

variable name mismatch (longUrl and url). frontend sent json with key -> longUrl but backend expected url thus keys didnt match and was request was treated as empty.

# Testing(Supertest) issues faced

Exception Hangs in Asynchronous Route Handlers - every single incoming request must be terminated by sending a response or passing ctrl to middleware. missed res.json & only logged o/p thereby tcp sockets remained open. ["I ran into a silent request-hanging bug where async route errors were caught and logged, but no response was sent back to the client. This taught me the importance of the Express lifecycle: every code path—especially error handlers—must explicitly terminate the request cycle with a status code and a JSON response (like res.status(500).json(...)) or pass the error to next(err) to prevent hanging test suites."]

Jest mock resoln and string mismatch - [Jest mock matching is strictly string-sensitive. When our route files and test files used mismatched relative traversal paths (../../ vs ../), Jest couldn't reconcile the module identifiers, causing mocks to silently fail. I fixed this by implementing centralized path aliases (@prisma/*) mapped cleanly across TypeScript (tsconfig.json) and Jest (moduleNameMapper), ensuring every file references modules through a uniform identifier]

ESM interoperablt in commonjs test runners - Node's test execution worker thread struggled to parse modern module syntax natively without explicit compilation or transform rules, causing mysterious runtime syntax crashes. [Bridging modern ESM packages with traditional testing pipelines can cause compilation friction. I had to explicitly configure ts-jest's transformation rules to handle .mjs extensions and adjust transform-ignore patterns so that modern third-party package syntax compiles smoothly within our test runner environment]

Mixing Server Initialization with Application Logic - [learned to strictly decouple the Application Factory from the Server Bootstrap. app.ts should only configure middleware, routers, and export a headless Express app instance. index.ts (or server.ts) imports that app, binds environment variables, connects to external services like Redis, and calls app.listen(). This separation makes the app entirely testable in isolation.], 
Why shouldn't you put app.listen() inside your main app file? - [Because it couples application configuration with network infrastructure. If app.listen() executes on import, test runners like Supertest cannot load the app in isolation without accidentally opening ports and triggering background network connections, which leads to test timeouts and open-handle memory leaks]

# Decisions taken

- Cryptographically secure random number used for base62 encoding instead of id(bcoz of predictability). helps avoid circularity of Need shortCode to create Link -> Need ID to generate shortCode -> ID is generated when Link is created. Initially thought of first keeping shortcode as null then update after getting id but rejected due to unnecessary intermediary operation and Atomicity concerns.

