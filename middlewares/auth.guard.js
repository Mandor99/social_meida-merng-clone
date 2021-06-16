import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

const postAuthGuard = async ({ req }) => {
	const token = await req.headers.authorization;
	if (token) {
		try {
			const user = jwt.verify(token, process.env.SECRET_TOKEN);
			return user;
		} catch {
			throw new AuthenticationError('invalid/expired token');
		}
	} else {
		throw new Error('Authorization header must be provided!');
	}
};

export default postAuthGuard;
