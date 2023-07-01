# Zeswen Web Template

This is a turborepo template to do TypeScript microservices, Prisma + PostgreSQL, gRPC and Next.js applications.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `product-service`: a gRPC server
- `web`: a [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by the `web` application
- `eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `proto`: Protobufs used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Getting started

### pnpm

Install [pnpm](https://pnpm.io/installation).

### Protocol Buffer Compiler

Install [Protocol Buffer Compiler](https://grpc.io/docs/protoc-installation/).

### PostgreSQL

Install [PostgreSQL]('https://hub.docker.com/_/postgres').

### Environment Variables

Add .env to `apps/product-service` and `packages/db` with the `DATABASE_URL` variable.

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

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
