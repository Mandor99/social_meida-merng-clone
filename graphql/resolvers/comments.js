import postAuthGuard from '../../middlewares/auth.guard.js';
import PostDB from '../../models/PostsModel.js';
import { AuthenticationError, UserInputError } from 'apollo-server';

const commentResolver = {
	Mutation: {
		createComment: async (_, { postId, body }, { req }) => {
			//check user
			const userToken = await postAuthGuard({ req });
			if (userToken) {
				//check comment valid
				if (body.trim() === '') {
					throw new UserInputError('comment body must not be empty', {
						validErrors: { comment: 'comment body must not be empty' },
					});
				} else {
					//check post
					const Post = await PostDB.findById(postId);
					if (Post) {
						//i need to add (push new data) in the post not create a new post so i do unshift() not ...spread in new [] to make changes in the original POST
						await Post.comments.unshift({
							username: userToken.username,
							email: userToken.email,
							body: body,
							createdAt: new Date().toISOString(),
						});
						return await Post.save();
					} else {
						throw new Error('Post not found!');
					}
				}
			} else {
				throw new AuthenticationError('you need to logIn to can comment');
			}
		},
		deleteComment: async (_, { postId, commentId }, { req }) => {
			//check user
			const userToken = await postAuthGuard({ req });
			try {
				//check Post
				// if (userToken) {
				const Post = await PostDB.findById(postId);
				if (Post) {
					//check comment owner
					//i used findIndex and splice & didn't use filter() because i need to affect in the original [] (mutative)
					//also i can use filter and push the value in post.comments
					const commentIndex = await Post.comments.findIndex(
						(comment) => comment.id === commentId,
					);
					//in mongoose v.5 use []findIndex(x.id) not []findIndex(x._id) ==>> .id != ._id in production

					if (Post.comments[commentIndex].email === userToken.email) {
						await Post.comments.splice(commentIndex, 1);
						await Post.save();
						return 'comment deleted successfully';
					} else {
						console.log(Post.comments[commentIndex]);
						throw new AuthenticationError('action not allowed');
					}
				} else {
					throw new Error('post not found!');
				}
				// }
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

export default commentResolver;
