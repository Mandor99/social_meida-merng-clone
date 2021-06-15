import { Schema, model } from 'mongoose';

const postSchema = new Schema({
	body: String,
	username: String,
	createdAt: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	comments: [{ username: String, body: String, createdAt: String }],
	likes: [{ username: String, createdAt: String }],
});

const PostDB = model('user', postSchema);

export default PostDB;
