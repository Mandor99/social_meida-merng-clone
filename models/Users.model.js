import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	createdAt: String,
});

const UserDB = model('user', userSchema);

export default UserDB;
