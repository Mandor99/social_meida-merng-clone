import { gql } from 'apollo-server';

const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		email: String!
		createdAt: String!
		token: String!
	}
	input registerInput {
		username: String!
		email: String!
		password: String!
		confirmPassword: String!
	}
	input logInInput {
		email: String!
		password: String!
	}
	type test {
		id: String!
	}
	type Query {
		getPosts: [test]
	}
	type Mutation {
		register(registerInput: registerInput): User!
		logIn(logInInput: logInInput!): User!
	}
`;

export default typeDefs;
