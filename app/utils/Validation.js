import t from 'tcomb-form-native';

export default formValidation = {
	password: t.refinement(t.String, value => {
		return value.length >= 1;
		//TODO cambiar esto por el valor adecuado
	})
};
