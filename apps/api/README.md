# NestJS API
This application is built using [NestJS](https://nestjs.com) and is 100% [TypeScript](https://www.typescriptlang.org/) safe. It uses [Mongoose](https://mongoosejs.com/) for MongoDB integration and [Swagger](https://swagger.io/) for API documentation.

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

Create a `.env` file in `/apps/api` and add the following variables:

```
MONGODB_URI=mongodb://localhost/user-management
```

## Running the Application

### Start MongoDB

Ensure MongoDB is running on your machine. You can start it using the following command:

```bash
mongod
```


### Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run dev

# production mode
$ yarn run start:prod
```

The application will be running at [http://localhost:3000](http://localhost:3000).

### API Documentation

The Swagger UI will be available at [http://localhost:3000/apidocs](http://localhost:3000/apidocs).


## Running Tests

Navigate to the `apps/api` directory and run the following commands:

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```
## Linting

Navigate to the `apps/api` directory and run the following command to lint the code:

```bash
$ yarn run lint
```
