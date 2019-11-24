import { AsyncStorage } from 'react-native';

export const login = nombre => AsyncStorage.setItem(nombre, 'true');

export const logout = nombre => AsyncStorage.removeItem(nombre);

export const estaLogueado = nombre => {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(nombre)
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
