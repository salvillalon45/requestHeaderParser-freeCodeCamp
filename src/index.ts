import express from 'express';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';

const app = express();

const PORT = 3000;

const createContext = ({
	req,
	res
}: trpcExpress.CreateExpressContextOptions) => ({
	req,
	res
}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
	whoami: t.procedure.query((opts) => {
		// console.log({ opts });
		console.log(opts.ctx.req.ip);
		console.log(opts.ctx.req.connection.remoteAddress);
		// console.log(opts.ctx.req.headers['x-forwarded-for']);
		console.log(opts.ctx.req.socket.remoteAddress);
		// console.log(opts.ctx);
		return { name: 'Bilbo' };
	})
});

// export type definition of API
export type AppRouter = typeof appRouter;

app.use(
	'/api',
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext
	})
);

app.listen(PORT, () => console.log('Running on port ' + PORT));
