import { AsyncStorage } from 'react-native';

const LOGGED_IN = 'loggued_in';

export const login = () => AsyncStorage.setItem(LOGGED_IN, 'true');

export const logout = () => AsyncStorage.removeItem(LOGGED_IN);

export const estaLogueado = () => {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(LOGGED_IN)
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
