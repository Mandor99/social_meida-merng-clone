import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
	username: String,
	email: String,
	password: String,
	createdAt: String,
});

const UserDB = model('user', userSchema);

export default UserDB;
