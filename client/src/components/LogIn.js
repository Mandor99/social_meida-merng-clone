import React, { useState } from 'react';
import { Form, Button, Container, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { LogInMutation } from '../graphQl/Query';

function LogIn(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validationErr, setValidationErr] = useState({});
	const [authErr, setAuthErr] = useState({});
	const [getUser, { loading }] = useMutation(LogInMutation, {
		update(cache, result) {
			props.history.push('/');
		},
		onError(errors) {
			// console.log(errors.graphQLErrors);
			setValidationErr(
				errors.graphQLErrors[0].extensions.exception.validationErrors,
			);
			// setAuthErr(errors.graphQLErrors[0].extensions.exception.authError);
			console.log({ errors });
		},
	});

	const handleInput = (setter) => (e) => setter(e.target.value);
	const handleSubmit = (e) => {
		e.preventDefault();
		getUser({ variables: { email, password } });
		// authErr && console.log(Object.values(authErr)[0]);
		// authErr && console.log(authErr);
		// validationErr && console.log(validationErr.error?.details[0].path)
	};
	return (
		<div className='mt-max w-60-center'>
			<Container>
				<Form onSubmit={handleSubmit} className={loading ? 'loading' : ''}>
					<Form.Input
						value={email}
						type='email'
						placeholder='email'
						onChange={handleInput(setEmail)}
						error={
							validationErr?.error?.details[0].path[0] === 'email'
								? true
								: false
						}
					/>
					<Form.Input
						value={password}
						type='password'
						placeholder='password'
						onChange={handleInput(setPassword)}
						error={
							validationErr?.error?.details[0].path[0] === 'password'
								? true
								: false
						}
					/>
					<Button primary type='submit'>
						LogIn
					</Button>
				</Form>
			</Container>
			{validationErr?.error && (
				<Message error header={validationErr?.error?.details[0].message} />
			)}
			{/* {validationErr?.error ? (
				<Message error header={validationErr?.error?.details[0].message} />
			) : Object.keys(authErr).length > 0 ? (
				<Message error header={Object.values(authErr)[0]} />
			) : (
				<Message header='congrats' />
			)} */}
			{/* {Object.keys(authErr).length > 0 && (
				// Object.keys(authErr) !== null &&
				// Object.keys(authErr) !== undefined &&
				<Message error header={Object.values(authErr)[0]} />
			)} */}
			{/* <Message error header={error?.message} /> */}
		</div>
	);
}

export default LogIn;
