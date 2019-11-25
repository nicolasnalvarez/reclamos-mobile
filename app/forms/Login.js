import t from 'tcomb-form-native';
import formValidation from '../utils/Validation';
import inputTemplate from './templates/Input';

export const LoginStruct = t.struct({
	user: formValidation.user,
	password: formValidation.password
});

export const LoginOptions = {
	fields: {
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
				placeholder: 'Escribe tu password',
				iconType: 'material-community',
				iconName: 'lock-outline',
				password: true,
				secureTextEntry: true
			}
		}
	}
};
