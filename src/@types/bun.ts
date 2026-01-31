declare module 'bun' {
	interface Env {
		DATABASE_URL: string;
		JWT_SECRET: string;
		RABBITMQ_URL: string;
		RABBITMQ_QUEUE_NAME: string;
	}
}
