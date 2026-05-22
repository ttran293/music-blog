# music-blog

A full-stack music blog where users share YouTube songs, write captions, and interact through likes and comments.

## Prerequisites

- [Node.js](https://nodejs.org/) **20 or later** (tested with Node 24)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A [YouTube Data API key](https://developers.google.com/youtube/v3/getting-started) (optional, for searching YouTube by keyword when creating a post)

## Environment variables

Create a `.env` file in the project root:

```env
dbuser=your_mongodb_username
dbpw=your_mongodb_password
jwtkey=your_jwt_secret
YOUTUBEAPIKEY=your_youtube_api_key
PORT=8080
```

| Variable | Required | Description |
|----------|----------|-------------|
| `dbuser` | Yes | MongoDB Atlas username |
| `dbpw` | Yes | MongoDB Atlas password |
| `jwtkey` | Yes | Secret used to sign JWT auth tokens |
| `YOUTUBEAPIKEY` | No | Enables YouTube search in the post form |
| `PORT` | No | Server port (defaults to `8080`) |

## Install dependencies

```bash
npm install
```

## Run locally (development)

Start the Express API and the React dev server together:

```bash
npm run dev
```

This runs:

- **Backend** — `http://localhost:8080` (API + MongoDB)
- **Frontend** — `http://localhost:3000` (webpack-dev-server, proxied to the backend)

Open **http://localhost:3000** in your browser.

You can also run each part separately:

```bash
npm run server   # backend only (port 8080)
npm run client   # frontend only (port 3000)
```

## Run locally (production build)

Build the client and serve everything from Express:

```bash
npm start
```

This runs `npm run build` then starts the server. Open **http://localhost:8080** (or the port set in `PORT`).

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run backend + frontend in development mode |
| `npm run server` | Run backend with nodemon |
| `npm run client` | Run webpack-dev-server |
| `npm run build` | Build the React app to `dist/` |
| `npm start` | Build and start the production server |

## Tech stack (client)

- React 18
- React Router 7
- Webpack 5
- Semantic UI React
