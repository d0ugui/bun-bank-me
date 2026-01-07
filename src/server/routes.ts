const Routes = {
	'/': {
		GET: async () => {
			return new Response('Hello, World!');
		},
	},
};

export { Routes };
