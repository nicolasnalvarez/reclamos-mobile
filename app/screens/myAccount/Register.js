import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Text, Image } from 'react-native-elements';
import t from 'tcomb-form-native';
import { RegisterStruct, RegisterOptions } from '../../forms/Register';
import * as firebase from 'firebase';
import Toast, { DURATION } from 'react-native-easy-toast';
import config from '../../utils/Config';

const Form = t.form.Form;

export default class MyAccount extends Component {
	constructor(props) {
		super(props);

		this.state = {
			registerStruct: RegisterStruct,
			registerOptions: RegisterOptions,
			formData: {
				user: '',
				dni: '',
				password: '',
				passwordConfirmation: ''
			},
			formErrorMessage: ''
		};
	}

	register = () => {
		const { password, passwordConfirmation } = this.state.formData;

		if (password === passwordConfirmation) {
			const validate = this.refs.registerForm.getValue();
			if (validate) {
				this.setState({ formErrorMessage: '' });

				const registerRequest = {
					nombre: validate.user,
					password: validate.password,
					dni: validate.dni
				};

				//TODO al no funcionarme bien el backend no puedo probar el registro correctamente
				fetch(config.REGISTER_PATH, {
					method: 'POST',
					body: JSON.stringify(registerRequest),
					headers: {
						'Content-Type': 'application/json'
					}
				})
					.then(response => {
						if (response.status === 500) {
							this.refs.toast.show(
								'Los valores del usuario y/o dni son erroneos',
								2500
							);
						} else {
							return response.json();
						}
					})
					.then(cleanResponse => {
						console.log(cleanResponse);
						// this.refs.toast.show('Registro exitoso', 200, () => {
						// 	this.props.navigation.goBack();
						// });
					})
					.catch(err => {
						console.log(err);

						this.refs.toast.show(
							'Hubo un error. Intente luego nuevamente',
							2500
						);
					});
			} else {
				this.setState({
					formErrorMessage: 'Formulario invalido'
				});
			}
		} else {
			this.setState({
				formErrorMessage: 'Las contraseñas no son iguales'
			});
		}
	};

	onChangeFormRegister = formValue => {
		this.setState({
			formData: formValue
		});
	};

	render() {
		const {
			registerStruct,
			registerOptions,
			formData,
			formErrorMessage
		} = this.state;

		return (
			<View style={styles.viewBody}>
				<Image
					source={require('../../../assets/img/5-tenedores-letras-icono-logo.png')}
					containerStyle={styles.containerLogo}
					style={styles.logo}
					PlaceholderContent={<ActivityIndicator />}
					resizeMode='contain'
				/>
				<Form
					ref='registerForm'
					type={registerStruct}
					options={registerOptions}
					value={formData}
					onChange={formValue => this.onChangeFormRegister(formValue)}
				/>
				<Button
					buttonStyle={styles.buttonRegisterContainer}
					title='Unirse'
					onPress={() => this.register()}
				/>
				<Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
				<Toast
					ref='toast'
					style={{ backgroundColor: 'green' }}
					position='bottom'
					positionValue={150}
					fadeInDuration={1000}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: '#fff' }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1,
		justifyContent: 'center',
		marginLeft: 40,
		marginRight: 40
	},
	buttonRegisterContainer: {
		backgroundColor: '#00a680',
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10
	},
	formErrorMessage: {
		color: '#f00',
		textAlign: 'center',
		marginTop: 30
	},
	containerLogo: {
		alignItems: 'center',
		marginBottom: 30
	},
	logo: {
		width: 300,
		height: 150
	}
});
