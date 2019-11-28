import { AsyncStorage } from 'react-native';
const USER_LOGGED_IN = 'user_loggued_in';

export const getToken = (token) => ({
    type: 'GET_TOKEN',
    token,
});

export const saveToken = token => ({
    type: 'SAVE_TOKEN',
    token
});

export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
});

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});

export const getUserToken = () => dispatch =>
    AsyncStorage.getItem(USER_LOGGED_IN)
        .then((data) => {
            dispatch(loading(false));
            dispatch(getToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        });

export const login = userData => dispatch => {
    console.warn(`ACTION LOGIN: ${JSON.stringify(userData)}`);
    AsyncStorage.setItem(USER_LOGGED_IN, JSON.stringify(userData))
        .then((data) => {
            console.warn(`ACTION LOGIN THEN DATA`);
            dispatch(loading(false));
            dispatch(saveToken('Token saved'));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        });
};

export const logout = () => dispatch => {
    console.warn(`ACTION LOGOUT`);
    AsyncStorage.removeItem(USER_LOGGED_IN)
        .then((data) => {
            console.warn(`ACTION LOGOUT THEN DATA: ${data}`);
            dispatch(loading(false));
            dispatch(removeToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        });
};