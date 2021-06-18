import userResolver from './users.js';
import postResolver from './posts.js';
import commentResolver from './comments.js';
// const testArr = [{ id: '1' }, { id: '2' }, { id: '3' }];
// getPosts: () => {
// 	return testArr;
// },
const resolvers = {
	Post: {
		likesCount: (parent) => parent.likes.length,
		commentsCount: (parent) => parent.comments.length,
	},
	Query: {
		...postResolver.Query,
	},
	Mutation: {
		...userResolver.Mutation,
		...postResolver.Mutation,
		...commentResolver.Mutation,
	},
	Subscription: {
		...postResolver.Subscription,
	},
};

export default resolvers;
