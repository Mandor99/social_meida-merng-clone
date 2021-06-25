import { gql } from '@apollo/client';

export const getPosts = gql`
	{
		getPosts {
			id
			userId
			username
			email
			body
			createdAt
			likesCount
			commentsCount
		}
	}
`;

export const RegisterMutation = gql`
	mutation addUser(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			username
			email
			token
		}
	}
`;
export const LogInMutation = gql`
	mutation getUser($email: String!, $password: String!) {
		logIn(logInInput: { email: $email, password: $password }) {
			id
			username
			email
			token
		}
	}
`;

// export const LogInMutation = gql`
// 	mutation getUser($email: String!, $password: String!) {
// 		logIn(logInInput: { email: $email, password: $password }) {
// 			id
// 			token
// 			username
// 			email
// 		}
// 	}
// `;
