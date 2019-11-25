import t from 'tcomb-form-native';
import formValidation from '../utils/Validation';
import inputTemplate from './templates/Input';

export const RegisterStruct = t.struct({
	name: t.String,
	user: t.String,
	password: formValidation.password,
	passwordConfirmation: formValidation.password
});

export const RegisterOptions = {
	fields: {
		name: {
			template: inputTemplate,
			config: {
				placeholder: 'Escribe un nombre y apellido',
				iconType: 'material-community',
				iconName: 'account-outline'
			}
		},
		user: {
			template: inputTemplate,
			config: {
				placeholder: 'Escribe tu usuario',
				iconType: 'material-community',
				iconName: 'account-circle-outline'
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
