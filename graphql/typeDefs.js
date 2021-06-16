import { gql } from 'apollo-server';

const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		email: String!
		createdAt: String!
		token: String!
	}
	type Post {
		userId: ID!
		username: String!
		email: String!
		body: String!
		createdAt: String
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
		getPosts: [Post]
		getPost(id: ID!): Post
	}
	type Mutation {
		register(registerInput: registerInput): User!
		logIn(logInInput: logInInput!): User!
		createPost(body: String!): Post
		deletePost(id: ID!): String
	}
`;

export default typeDefs;
