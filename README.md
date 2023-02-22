# ClimbLog

## Description

REST API for logging climbing ascents. Still work in progress.

### Techstack

Typescript, Node.js, NestJS, MySQL, TypeORM

### Why did I do it?

My main focus for this project was to learn MySQL and NestJS.
Plus if I add some user authorization, authentication and deploy it somewhere
I might use it to actually log my own climbing ascents. 

## Usage
> **_NOTE:_** The API is currently not deployed anywhere so I will use a 
http://localhost:3000 url for the examples.

> **_NOTE:_** In order to log a climb you first need to have a valid climber and boulder created. More on that in next section.
### Working with boulders.
1. Creating a boulder.
Send a POST request to http://localhost:3000/boulders.
with request body in the following JSON format.
```
{
    "boulderInput":{
        "name": "insert boulder name",
        "grade": "7C",
        "description":"insert boulder description"
    }
}
```
> **_NOTE:_** The name, grade and description are all REQUIRED!
Successfull response looks like this.
```
{
    "message": "successfully created Boulder",
    "newBoulder": {
        "name": "insert boulder name",
        "grade": "7C",
        "description": "insert boulder description",
        "id": 9
    }
}
```
2. Fetching all boulders.
Send a GET request to http://localhost:3000/boulders.
No request body or parameteres required.

Successfull reponse looks like this.
```
{
    "boulders": [
        {
            "id": 1,
            "name": "bouldery boulder",
            "grade": "8B",
            "description": "overhung boulder",
        },
        {
            "id": 7,
            "name": "the good boulder",
            "grade": "7C",
            "description": "another boulder test",
        },
        {
            "id": 9,
            "name": "insert boulder name",
            "grade": "7C",
            "description": "insert boulder description",
        }
    ]
}
```
3. Fetch one boulder by id.
Send a GET request to http://localhost:3000/boulders/:id.
The :id parameter is replaced by desired id.

E.g. request GET http://localhost:3000/boulders/1 to get boulder of id 1.
Response look like this.
```
{
    "boulder": {
        "id": 1,
        "name": "bouldery boulder",
        "grade": "8B",
        "description": "overhung boulder"
    }
}
```

4. Patch boulder.
Finds boulder by id and patches it, allowing to optionally replace one or all parameteres.
Send PATCH request to http://localhost:3000/boulders/:id.
Replace :id with desired boulder id, and in the body put parameteres to be replaced.
E.g. PATCH http://localhost:3000/boulders/1
Body of the request:
```
{
    "boulderUpdateInput":{
        "name":"testing patch",
        "description":"changing params"
    }
}
```
> **_NOTE:_** Here I only changed name and description and grade stays the same.
Successfull response looks like this.
```
{
    "message": "Boulder update successfull!",
    "updatedBoulder": {
        "id": 1,
        "name": "testing patch",
        "grade": "8B",
        "description": "changing params"
    }
}
```

5. Delete boulder.
Deletes boulder by id.
Send DELETE request to http://localhost:3000/boulders/:id
And replace :id parameter with id of the boulder you want to delete.
E.g. DELETE http://localhost:3000/boulders/9

Successfull reponse looks like this.
```
{
    "message": "Boulder deletion successfull!"
}
```
Thats everything for boulders.

### Wprking with climbers.
1. Creating a climber.
Send a POST request to http://localhost:3000/climbers.
with request body in the following JSON format.
```
{
    "climberInput":{
        "firstName":"test",
        "lastName":"test",
        "surname":"thetest"
    }
}
```
> **_NOTE:_** The firstName, lastName and surname are all REQUIRED!
Successfull response looks like this.
```
{
    "message": "Climber created!",
    "climber": {
        "firstName": "test",
        "lastName": "test",
        "surname": "thetest",
        "id": 3
    }
}
```
2. Fetching all climbers.
Send a GET request to http://localhost:3000/climbers.
No request body or parameteres required.

Successfull reponse looks like this.
```
{
    "climbers": [
        {
            "id": 1,
            "firstName": "ding",
            "lastName": "dong",
            "surname": "theanimal"
        },
        {
            "id": 3,
            "firstName": "test",
            "lastName": "test",
            "surname": "thetest"
        }
    ]
}
```
3. Fetch one climber by id.
Send a GET request to http://localhost:3000/climbers/:id.
The :id parameter is replaced by desired id.

E.g. request GET http://localhost:3000/climbers/1 to get climber of id 1.
Response look like this.
```
{
    "climber": {
        "id": 1,
        "firstName": "ding",
        "lastName": "dong",
        "surname": "theanimal"
    }
}
```

4. Patch climber.
Finds climber by id and patches it, allowing to optionally replace one or all parameteres.
Send PATCH request to http://localhost:3000/climbers/:id.
Replace :id with desired climber id, and in the request body put parameteres to be replaced.
E.g. PATCH http://localhost:3000/climbers/1
Body of the request:
```
{
    "climberUpdateInput":{
        "firstName":"testing",
        "lastName":"patch request"
    }
}
```
> **_NOTE:_** Here I only changed firstName and lastName so surname stays the same.
Successfull response looks like this.
```
{
    "message": "Climber Updated!",
    "updatedClimber": {
        "id": 3,
        "firstName": "testing",
        "lastName": "patch request",
        "surname": "thetest"
    }
}
```

5. Delete climber.
Deletes climber by id.
Send DELETE request to http://localhost:3000/climbers/:id
And replace :id parameter with id of the climber you want to delete.
E.g. DELETE http://localhost:3000/climbers/3

Successfull reponse looks like this.
```
{
    "message": "Climber deletion successfull!"
}
```
Thats everything for climbers.

### Working with climbing logs.
1. Logging a climb.
Send a POST request to http://localhost:3000/climb-logs
with body in the following JSON format.
Replace the id numbers with your desired climberId and boulderId.
> **_NOTE:_** Both climberId and boulderId are REQUIRED!
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

2. Fetching all climb logs.
Send a GET request to http://localhost:3000/climb-logs.
No body or paramateres required.

Successfull response looks like this.
```
{
    "climbLogs": [
        {
            "id": 1,
            "createdAt": "2023-02-20T11:48:25.271Z",
            "climber": {
                "id": 1,
                "firstName": "ding",
                "lastName": "dong",
                "surname": "theanimal"
            },
            "boulder": {
                "id": 1,
                "name": "bouldery boulder",
                "grade": "8B",
                "description": "overhung boulder"
            }
        },
        {
            "id": 11,
            "createdAt": "2023-02-21T10:37:20.107Z",
            "climber": {
                "id": 1,
                "firstName": "ding",
                "lastName": "dong",
                "surname": "theanimal"
            },
            "boulder": {
                "id": 1,
                "name": "bouldery boulder",
                "grade": "8B",
                "description": "overhung boulder"
            }
        }
    ]
}
```

3. Fetch one climb log by id.
Send a GET request to http://localhost:3000/climb-logs/:id.
The :id parameter is replaced by desired id.

E.g. request GET http://localhost:3000/climb-logs/1 to get climb log of id 1.
Response look like this.
```
{
    "climbLog": {
        "id": 1,
        "createdAt": "2023-02-20T11:48:25.271Z",
        "climber": {
            "id": 1,
            "firstName": "ding",
            "lastName": "dong",
            "surname": "theanimal"
        },
        "boulder": {
            "id": 1,
            "name": "bouldery boulder",
            "grade": "8B",
            "description": "overhung boulder"
        }
    }
}
```

4. Patch climb log.
Finds climb log by id and patches it, allowing to replace the climber or boulder.
Send PATCH request to http://localhost:3000/climb-logs/:id.
Replace :id with desired climb log id, and in the body put either climberId, boulderId or both.
E.g. PATCH http://localhost:3000/climb-logs/11
Body of the request:
```
{
    "climbLogUpdateInput":{
        "boulderId":3,
        "climberId":3
    }
}
```
Response looks like this.
```
{
    "message": "Boulder successfully updated!",
    "updatedBoulder": {
        "id": 11,
        "createdAt": "2023-02-21T10:37:20.107Z",
        "climber": {
            "id": 3,
            "firstName": "test",
            "lastName": "test",
            "surname": "thetest"
        },
        "boulder": {
            "id": 3,
            "name": "the good boulder",
            "grade": "7B",
            "description": "another boulder test"
        }
    }
}
```

5. Delete climb log.
Deletes climb log by id.
Send DELETE request to http://localhost:3000/climb-logs/:id
And replace :id parameter with id you want to delete.
E.g. DELETE http://localhost:3000/climb-logs/3

Successfull reponse looks like this.
```
{
    "message": "Boulder deleted!"
}
```
Thats everything for clinmb logs.

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

