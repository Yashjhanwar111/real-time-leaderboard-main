# [Real Time Leaderboard](https://roadmap.sh/projects/realtime-leaderboard-system)

#### Create a real-time leaderboard system for ranking and scoring.

#

# Tech Stack

- Nodejs
- TypeSript
- Nestjs
- Postgresql
- Web socket (socket.io)
- Redis

#

# Features

- [x] User Authentication and Authorization

  - [x] login
  - [x] register
  - [x] JWT Authorization

- [x] Leader board

  - [x] user submit score
  - [x] update user score
  - [x] get game leaderbord
  - [x] Display a global leaderboard showing the top users across all games.

- [x] User Rankings

  - [x] ranks **CRUD**

- [x] Top Players Report

  - [x] Generate reports on the top 10 players

- [x] Handel web socket errors
  - [x] on listen event (**error**)
  ```json
  // error
  {
    "message": [
      "gameId must be a UUID",
      "score must be a number conforming to the specified constraints"
    ],
    "error": "Bad Request",
    "statusCode": 400
  }
  ```

## How To Install

```bash
> npm i -g pnpm
> pnpm install
```

## Run App (in dev env)

```bash
> pnpm start:dev
```

## Run App (in dev production)

```bash
> pnpm build
> pnpm start:prod
```

# Env file

```js
// APP
PORT: number;
JWT_KEY: string;
NODE_ENV: 'test' | 'dev' | 'prod';
HOST: string;
REDIS_URL: string;
// DB
DB_NAME: string;
DB_HOST: string;
DB_PORT: number;
DB_USERNAME: string;
DB_PASSWORD: string;
```

#

#### With thanks and appreciation to [roadmap.sh](https://roadmap.sh/)

## [Project Page](https://roadmap.sh/projects/realtime-leaderboard-system)
