import { AsyncStorage } from 'react-native';

const USER_LOGGED_IN = 'user_loggued_in';

export const login = async userData =>
	await AsyncStorage.setItem(USER_LOGGED_IN, JSON.stringify(userData));

export const logout = async () => await AsyncStorage.removeItem(USER_LOGGED_IN);

export const getUser = async () => {
	return await AsyncStorage.getItem(USER_LOGGED_IN)
		.then(res => {
			console.log('entro al then');

			return JSON.parse(res);
		})
		.catch(err => {
			console.log('entro al catch');
		});
};

export const estaLogueado = () => {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(USER_LOGGED_IN)
			.then(res => {
				if (res !== null) {
					resolve(true);
				} else {
					resolve(false);
				}
			})
			.catch(err => reject(err));
	});
};
