# React Client Application

This application is built using [React](https://react.dev/) and is 100% [TypeScript](https://www.typescriptlang.org/) safe. It uses [Vite](https://vitejs.dev/) as the build tool and [Jest](https://jestjs.io/) for testing.

## Prerequisites

- Node.js (>= 18.x)
- MongoDB (>= 8.x)

## Project Setup

### Install Dependencies

Navigate to the root of the monorepo and install the dependencies:

```bash
$ yarn install
```

### Set up Environment Variables

Create a `.env` file in `/apps/client` and add the following variables:

```
VITE_API_BASE_URL=http://localhost:3000/api
```


## Compile and Run the Project
Navigate to the `apps/client` directory and run the following commands:

```
# development
$ yarn run dev
```

The client application will be running at http://localhost:5173.

## Running Tests

Navigate to the `apps/client` directory and run the following commands:

```
# unit tests
$ yarn run test

# test coverage
$ yarn run coverage
```

## Linting
Navigate to the `apps/client` directory and run the following command to lint the code:

```
$ yarn run lint
```