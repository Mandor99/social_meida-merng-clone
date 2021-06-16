import userResolver from './users.js';
const testArr = [{ id: '1' }, { id: '2' }, { id: '3' }];
const resolvers = {
	Query: {
		getPosts: () => {
			return testArr;
		},
	},
	Mutation: {
		...userResolver.Mutation,
	},
	// Subscription: {}
};

export default resolvers;
