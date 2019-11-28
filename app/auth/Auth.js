import { AsyncStorage } from 'react-native';

const USER_LOGGED_IN = 'user_loggued_in';
let usuarioEstaLogueado = false;

export const login = async userData =>
	await AsyncStorage.setItem(USER_LOGGED_IN, JSON.stringify(userData));

export const logout = async () => await AsyncStorage.removeItem(USER_LOGGED_IN);

export const getUser = async () => {
	return await AsyncStorage.getItem(USER_LOGGED_IN)
		.then(res => {
			return JSON.parse(res);
		})
		.catch(err => {
			console.log(err);
		});
};

export const estaLogueado = () => {
	return new Promise((resolve, reject) => {
		if (usuarioEstaLogueado) resolve(true);

		AsyncStorage.getItem(USER_LOGGED_IN)
			.then(res => {
				if (res !== null) {
					usuarioEstaLogueado = true;
					resolve(true);
				} else {
					usuarioEstaLogueado = false;
					resolve(false);
				}
			})
			.catch(err => reject(err));
	});
};
