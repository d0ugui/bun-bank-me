# bun-bank-me

This project is a REST API that simulates a simple banking system for managing payables (receivables) and assignors (creditors) and was created to dive deeper into the Bun runtime and experiment with some technologies that I hadn't used before. It served as a hands-on opportunity to learn:

- **Bun** - A fast JavaScript runtime as an alternative to Node.js
- **Elysia** - A TypeScript web framework designed for Bun with excellent DX
- **RabbitMQ** - Message broker for handling batch payable processing with retries and dead-letter queues

## Installation

> [!IMPORTANT]
> You need to have Bun runtime installed on your machine. 
> You can find the installation guide [here](https://bun.sh/docs/installation).
> You also need to have Docker installed.


#### Clone the repository

```sh
git clone https://github.com/d0ugui/bun-bank-me.git
cd bun-bank-me
```

#### Create .env file

```sh
cp .env.example .env
```

#### Build image and run containers

```sh
docker build -t bun-bank-me .
docker compose up -d
```

#### Run migrations

```sh
bunx prisma migrate deploy
```

#### Start server

```sh
The docker compose file will start the server on port 3001.
But if you want to run the server locally, you can use the following command:

bun run dev
```

## Endpoints

See [requests.http](./requests.http) for all available endpoints with example payloads. You can use the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VS Code extension to execute requests directly from the file.

