import userResolver from './users.js';
import postResolver from './posts.js';
// const testArr = [{ id: '1' }, { id: '2' }, { id: '3' }];
// getPosts: () => {
// 	return testArr;
// },
const resolvers = {
	Query: {
		...postResolver.Query,
	},
	Mutation: {
		...userResolver.Mutation,
		...postResolver.Mutation,
	},
	// Subscription: {}
};

export default resolvers;
