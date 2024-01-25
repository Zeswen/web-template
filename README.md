# Zeswen Monorepo Template

This is a monorepo template to do microservices, PostgreSQL, gRPC and Next.js applications.

## What's inside?
Everything is connected with gRPC.

### Apps
A folder containing all the applications.
- `authorization-service`: an Oauth2 gRPC Rust microservice.
- `payment-service`: a gRPC Go microservice.
- `product-service`: a gRPC Node.js microservice.
- `web`: a [Next.js](https://nextjs.org/) application.

### Packages
A folder containing all the packages
- `db`: a [Prisma](https://www.prisma.io/) ORM database client.
- `eslint-config`: `eslint` configuration.
- `proto`: Protos used throughout the monorepo.
- `tailwind-config`: `tailwindcss` configuration.
- `tsconfig`: `tsconfig.json`s used throughout the monorepo.
- `ui`: a stub React component library shared by the `web` application.

## Getting started

### Docker
Install [Docker](https://www.docker.com/).  
Run the following command to build and start the development environment:
```sh
docker build -t "web-template" .
docker run -it -p 3000:3000 -p 5432:5432 -p 50051:50051 -p 50052:50052 -p 50053:50053 --name "web-template" "web-template"
```

### Visual Studio Code
Install [Visual Studio Code](https://code.visualstudio.com/) and its Dev Containers extension.  
Connect to the `web-template` container and start coding!
