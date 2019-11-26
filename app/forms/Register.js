import t from 'tcomb-form-native';
import formValidation from '../utils/Validation';
import inputTemplate from './templates/Input';

export const RegisterStruct = t.struct({
	user: t.String,
	dni: t.String,
	password: formValidation.password,
	passwordConfirmation: formValidation.password
});

export const RegisterOptions = {
	fields: {
		user: {
			template: inputTemplate,
			config: {
				placeholder: 'Escribe tu usuario',
				iconType: 'material-community',
				iconName: 'account-circle-outline'
			}
		},
		dni: {
			template: inputTemplate,
			config: {
				placeholder: 'Escribe tu DNI',
				iconType: 'material-community',
				iconName: 'book-open-outline'
			}
		},
		password: {
			template: inputTemplate,
			config: {
				placeholder: 'Escribe un password',
				iconType: 'material-community',
				iconName: 'lock-outline',
				password: true,
				secureTextEntry: true
			}
		},
		passwordConfirmation: {
			template: inputTemplate,
			config: {
				placeholder: 'Repite el password',
				iconType: 'material-community',
				iconName: 'lock-reset',
				password: true,
				secureTextEntry: true
			}
		}
	}
};
