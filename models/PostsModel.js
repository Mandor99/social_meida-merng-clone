import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema({
	body: String,
	username: String,
	email: String,
	createdAt: String,
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	// comments: [{ username: String, body: String, createdAt: String }],
	// likes: [{ username: String, createdAt: String }],
});

const PostDB = model('post', postSchema);

export default PostDB;
