import React, { useState } from 'react';
import { Form, Button, Container, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { RegisterMutation } from '../graphQl/Query';
import { useAuth } from '../context/auth';

function Register(props) {
	const { logIn } = useAuth();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [validationErr, setValidationErr] = useState({});
	const [addUser, { loading }] = useMutation(RegisterMutation, {
		update(cache, { data: { register } }) {
			logIn(register);
			props.history.push('/');
		},
		onError(errors) {
			setValidationErr(
				errors.graphQLErrors[0].extensions.exception.validationErrors,
			);
		},
	});

	const handleInput = (setter) => (e) => setter(e.target.value);
	const handleSubmit = (e) => {
		e.preventDefault();
		addUser({ variables: { username, email, password, confirmPassword } });
		// validationErr && console.log(validationErr.error?.details[0].path);
		// validationErr && console.log(validationErr);
	};
	return (
		<div className='mt-max w-60-center'>
			<Container>
				<Form onSubmit={handleSubmit} className={loading ? 'loading' : ''}>
					<Form.Input
						value={username}
						type='text'
						placeholder='username'
						onChange={handleInput(setUsername)}
						error={
							validationErr.error?.details[0].path[0] === 'username'
								? true
								: false
						}
					/>
					<Form.Input
						value={email}
						type='email'
						placeholder='email'
						onChange={handleInput(setEmail)}
						error={
							validationErr.error?.details[0].path[0] === 'email' ? true : false
						}
					/>
					<Form.Input
						value={password}
						type='password'
						placeholder='password'
						onChange={handleInput(setPassword)}
						error={
							validationErr.error?.details[0].path[0] === 'password'
								? true
								: false
						}
					/>
					<Form.Input
						value={confirmPassword}
						type='password'
						placeholder='confirm password'
						onChange={handleInput(setConfirmPassword)}
						error={
							validationErr.error?.details[0].path[0] === 'confirmPassword'
								? true
								: false
						}
					/>
					<Button primary type='submit'>
						Register
					</Button>
				</Form>
			</Container>
			{validationErr?.error && (
				<Message error header={validationErr.error?.details[0].message} />
			)}
		</div>
	);
}

export default Register;
