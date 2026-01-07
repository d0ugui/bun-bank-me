import { Routes } from './routes';

const server = Bun.serve({
	port: 3001,
	routes: Routes,
});

console.log(`Server started on port ${server.url} 🚀`);
