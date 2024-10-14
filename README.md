
# User Management Monorepo

This monorepo contains two main applications: a NestJS API and a React client application.

- The API application is built using [NestJS](https://nestjs.com) and uses [Mongoose](https://mongoosejs.com/) for MongoDB integration.
- The client application is built using [React](https://react.dev/) and uses [Vite](https://vitejs.dev/) as the build tool.
- Both applications are 100% [TypeScript](https://www.typescriptlang.org/) safe.
- API documentation is available at [http://localhost:3000/apidocs](http://localhost:3000/apidocs) when the API application is running.

## Prerequisites

- Node.js (>= 18.x)
- MongoDB (>= 8.x)

## Project Setup

### Install Dependencies

Navigate to the root of the monorepo and install the dependencies:

```bash
$ yarn install
```

### Start MongoDB

Ensure MongoDB is running on your machine. You can start it using the following command:

```bash
mongod
```

### Set up Environment Variables

Create a `.env` file in `/apps/api` and add the following variables:

```
MONGODB_URI=mongodb://localhost/user-management
```

Create a `.env` file in `/apps/client` and add the following variables:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## Running the Applications

### Development Mode

To run both the API and client applications in development mode, use the following command:

```bash
$ yarn run dev
```

- The backend will be running at [http://localhost:3000](http://localhost:3000).
- The client will be running at [http://localhost:5173](http://localhost:5173).

## Commands

### Common Commands

```bash
# Will build both the api and client.
yarn run build

# Will run the development server for both the api and client
yarn run dev

# Will launch a test suites for both the api and client.
yarn run test

# Will lint all for both the api and client.
yarn run lint
```