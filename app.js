import { ApolloServer, PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import env from 'dotenv';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers/resolvers';

env.config();
const pubSub = new PubSub();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubSub }),
});

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB is connected');
		return server.listen({ port: 5000 });
	})
	.then(({ url }) => console.log(`server is listening on bort ${url}`));
