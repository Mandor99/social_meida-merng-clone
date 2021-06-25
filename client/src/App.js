import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import LogIn from './components/LogIn';
import Register from './components/Register';
import { Container } from 'semantic-ui-react';

const client = new ApolloClient({
	uri: 'http://localhost:5000',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				{/* <div className="app"> */}
				<Container>
					<NavBar />
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={LogIn} />
					<Route exact path='/register' component={Register} />
				</Container>
				{/* </div> */}
			</Router>
		</ApolloProvider>
	);
}

export default App;
