# Title

climbLog

## Description

REST API for logging climbing ascents. Still work in progress.

### Techstack

Typescript, Node.js, NestJS, MySQL, TypeORM

### Why did I do it?

My main focus for this project was to learn MySQL and NestJS.
Plus if I add some user authorization, authentication and deploy it somewhere
I might use it to actually log my own climbing ascents. 

### Usage

#### Working with climbing logs.
> **_NOTE:_** In order to log a climb you first need to have a valid climber and boulder created. More on that in next section.

> **_NOTE:_** The API is currently not deployed anywhere so I will use a 
http://localhost:3000 url for the examples.

1. Logging a climb.
Send a POST request to http://localhost:3000/climb-logs
with body in the following JSON format.
Replace the id numbers with your desired climberId and boulderId.
```
{
    "climbLogInput":{
        "boulderId":1,
        "climberId":1
    }
}
```
A successfull response looks like this.
```
{
    "message": "Climb Log created!",
    "newClimbLog": {
        "boulder": {
            "id": 1,
            "name": "bouldery boulder",
            "grade": "8B",
            "description": "overhung boulder"
        },
        "climber": {
            "id": 1,
            "firstName": "ding",
            "lastName": "dong",
            "surname": "theanimal"
        },
        "id": 6,
        "createdAt": "2023-02-21T10:27:23.149Z"
    }
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

