# Zeswen Monorepo Template

This is a monorepo template to do TypeScript microservices, Prisma + PostgreSQL, gRPC and Next.js applications.

## What's inside?

This Monorepo includes the following packages/apps:

### Apps and Packages

- `product-service`: a gRPC microservice
- `web`: a [Next.js](https://nextjs.org/) app with App Router
- `db`: a [Prisma](https://www.prisma.io/) ORM
- `eslint-config`: `eslint` configuration
- `proto`: Protobufs used throughout the monorepo
- `tailwind-config`: `tailwindcss` configuration
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `ui`: a stub React component library shared by the `web` application

## Getting started

### pnpm

Install [pnpm](https://pnpm.io/installation).

### Protocol Buffer Compiler

Install [Protocol Buffer Compiler](https://grpc.io/docs/protoc-installation/).

### PostgreSQL

Install [PostgreSQL]('https://hub.docker.com/_/postgres').

### Environment Variables

Clone `.env.example` to `.env` and fill in the values.

### Develop

To develop all apps and packages, run the following command:

```sh
pnpm dev
```

### Deploy

To build all apps and packages, run the following command:

```sh
pnpm build
```

To start the already built and optimized apps, run the following command:

```sh
pnpm start
```
