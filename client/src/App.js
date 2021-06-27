import './App.css';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import LogIn from './components/LogIn';
import Register from './components/Register';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './context/auth';
import AuthProtectedRoute from './protectedRoutes/Auth.guard';

const link = createHttpLink({
	uri: 'http://localhost:5000',
});
const authAuthorization = setContext(() => {
	const token = localStorage.getItem('userToken');
	return {
		headers: {
			Authorization: token ? `${token}` : '',
		},
	};
});
const client = new ApolloClient({
	link: authAuthorization.concat(link),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<Router>
					{/* <div className="app"> */}
					<Container>
						<NavBar />
						<Route exact path='/' component={Home} />
						<AuthProtectedRoute exact path='/login' component={LogIn} />
						<AuthProtectedRoute exact path='/register' component={Register} />
					</Container>
					{/* </div> */}
				</Router>
			</AuthProvider>
		</ApolloProvider>
	);
}

export default App;
