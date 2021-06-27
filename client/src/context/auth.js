import { createContext, useContext, useReducer } from 'react';
import authReducer, { authState } from './authReducer';

export const authContext = createContext({
	user: null,
	logIn: (data) => {},
	logOut: () => {},
});

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, authState);
	const logIn = (data) => {
		localStorage.setItem('userToken', data.token);
		dispatch({ type: 'LOGIN', user: data });
	};
	const logOut = () => {
		localStorage.removeItem('userToken');
		dispatch({ type: 'LOGOUT' });
	};
	return (
		<authContext.Provider value={{ user: state.user, logIn, logOut }}>
			{children}
		</authContext.Provider>
	);
};

export const useAuth = () => useContext(authContext);
