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
		id: ID!
		userId: String!
		username: String!
		email: String!
		body: String!
		createdAt: String
		comments: [Comment]!
		likes: [Like]!
		likesCount: Int!
		commentsCount: Int!
	}
	type Comment {
		id: ID!
		username: String!
		email: String!
		createdAt: String!
		body: String!
	}
	type Like {
		id: ID!
		username: String!
		email: String!
		createdAt: String!
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
	type Query {
		getPosts: [Post]
		getPost(id: ID!): Post
	}
	type Mutation {
		register(registerInput: registerInput): User!
		logIn(logInInput: logInInput!): User!
		createPost(body: String!): Post
		deletePost(id: ID!): String
		createComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): String!
		createLike(postId: ID!): Post
	}
	type Subscription {
		newPost: Post!
	}
`;

export default typeDefs;
