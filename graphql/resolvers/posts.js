import { AuthenticationError } from 'apollo-server';
import postAuthGuard from '../../middlewares/auth.guard.js';
import PostDB from '../../models/PostsModel.js';

const postResolver = {
	Query: {
		getPosts: async () => {
			try {
				const Posts = await PostDB.find({}).sort({ createdAt: -1 });
				return Posts;
			} catch (err) {
				throw new Error(err);
			}
		},
		getPost: async (_, { id }) => {
			const Post = await PostDB.findById(id);
			if (Post) {
				return Post;
			} else {
				throw new Error('post not found!');
			}
		},
	},
	Mutation: {
		createPost: async (_, { body }, { req }) => {
			//check if he is a user
			const userToken = await postAuthGuard({ req });

			if (userToken) {
				try {
					if (body.trim() === '') {
						//trim ==>> because it delete extra whitespace
						throw new Error('post body must not be empty!');
					} else {
						// console.log(userToken);
						const newPost = new PostDB({
							body: body,
							username: userToken.username,
							email: userToken.email,
							createdAt: new Date().toISOString(),
							userId: userToken.userId,
						});
						const savePost = await newPost.save();
						// console.log(savePost);
						return savePost;
					}
				} catch (err) {
					throw new Error(err);
				}
			}
		},
		deletePost: async (_, { id }, { req }) => {
			//check if he is a user
			//check if he is the owner of the post with email or username (which u use it in register to be unique)
			const userToken = await postAuthGuard({ req });
			try {
				const Post = await PostDB.findById(id);
				if (Post.email === userToken.email) {
					await Post.delete();
					return 'post deleted successfully';
				} else {
					throw new AuthenticationError('action not allowed');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

export default postResolver;
