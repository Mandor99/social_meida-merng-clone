import { UserInputError } from 'apollo-server';
import {
	registerValidation,
	logInValidation,
} from '../../middlewares/validator.js';
import UserDB from '../../models/UsersModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
	return jwt.sign(
		{
			//this data because i need it in authGuard
			username: user.username,
			email: user.email,
			userId: user._id,
		},
		process.env.SECRET_TOKEN,
		{ expiresIn: '24h' },
	);
};

const userResolver = {
	Mutation: {
		register: async (
			_,
			{ registerInput: { username, email, password, confirmPassword } },
		) => {
			// validation before check auth
			const { error, value } = registerValidation({
				username,
				email,
				password,
				confirmPassword,
			});
			if (error) {
				console.log(error);
				throw new UserInputError('failed to signUp', {
					validationErrors: error.message,
				});
			} else {
				console.log(value);
				// auth user
				const checkEmail = await UserDB.findOne({ email: value.email });
				if (checkEmail) {
					throw new UserInputError('email is already exist', {
						authError: { email: 'email is already exist!' },
					});
					// console.log(checkEmail)
				} else {
					const hashedPassword = await bcrypt.hash(value.password, 10);
					const newUser = new UserDB({
						username: value.username,
						email: value.email,
						password: hashedPassword,
						createdAt: new Date().toISOString(),
					});
					const savedUser = await newUser.save();
					const token = generateToken(savedUser);
					// console.log(savedUser);
					return {
						//return all data in new user with ._doc and the token & id because it is in the User type
						...savedUser._doc,
						id: savedUser._id,
						token,
					};
				}
			}
		},

		logIn: async (_, { logInInput: { email, password } }) => {
			const { error, value } = logInValidation({ email, password });
			if (error) {
				throw new UserInputError('failed to logIn', {
					validationErrors: error.message,
				});
			} else {
				const user = await UserDB.findOne({ email: value.email });
				if (user) {
					const correctPassword = await bcrypt.compare(
						value.password,
						user.password,
					);
					if (correctPassword) {
						const token = generateToken(user);
						return {
							...user._doc,
							id: user._id,
							token,
						};
					} else {
						throw new UserInputError('password is wrong', {
							authError: { password: 'password is wrong' },
						});
					}
				} else {
					throw new UserInputError('email is not exist, sign up first!', {
						authError: { email: 'email is not exist, sign up first' },
					});
				}
			}
		},
	},
};

export default userResolver;
