import jwt_decode from 'jwt-decode';

export const authState = { user: null };

//check if token is not expired and exist in localStorage with jwt_decode
//token data == user data
if (localStorage.getItem('userToken')) {
	const jwtDecode = jwt_decode(localStorage.getItem('userToken'));
	jwtDecode.exp * 1000 < Date.now()
		? localStorage.removeItem('userToken')
		: (authState.user = jwtDecode);
}
const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.user };
		case 'LOGOUT':
			return { ...state, user: null };
		default:
			return state;
	}
};

export default authReducer;
