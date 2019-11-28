import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Image, Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import { LoginStruct, LoginOptions } from '../../forms/Login';
import Toast from 'react-native-easy-toast';
import config from '../../utils/Config';
import { estaLogueado } from '../../auth/Auth';
// import { connect } from 'react-redux';
// import { login } from '../../redux/actions';
import { login } from '../../auth/Auth'

const Form = t.form.Form;

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loginStruct: LoginStruct,
			loginOptions: LoginOptions,
			loginData: {
				user: 'test2',
				password: 'a123456b'
			},
			loginErrorMessage: ''
		};
	}

	login = () => {
		const { navigation } = this.props;
		console.log('Entró al login');

		const validate = this.refs.loginForm.getValue();
		if (!validate) {
			this.setState({
				loginErrorMessage: 'Los datos del formulario son erroneos'
			});
		} else {
			this.setState({ loginErrorMessage: '' });

			const loginRequest = {
				nombre: validate.user,
				password: validate.password
			};

			fetch(config.LOGIN_PATH, {
				method: 'POST',
				body: JSON.stringify(loginRequest),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => {
					if (response.status === 500) {
						this.refs.toastLogin.show('Usuario o clave incorrectos', 2500);
					} else {
						return response.json();
					}
				})
				.then(response => {
					if (response) {
                        this.refs.toastLogin.show('antes del login interno');
                        // this.props.login(response)
                        login(response)
                            .then(() => {
                                this.refs.toastLogin.show('Login correcto', 2500, () => {
                                    navigation.state.params.validateLoginStatus();
                                    this.props.navigation.goBack();
                                });
                            })
                            .catch((error) => {
                                this.setState({ error })
                                this.refs.toastLogin.show(
                                    'Hubo un error al registrar la informacion del usuario',
                                    2500
                                );
                            });

						// login(response)
						// 	.then(() => {
                        //         this.refs.toastLogin.show('Login correcto', 2500, () => {
                        //             navigation.state.params.validateLoginStatus();
                        //             this.props.navigation.goBack();
                        //         });
						// 	})
						// 	.catch(err => {
                        //         this.refs.toastLogin.show(
                        //             'Hubo un error al registrar la informacion del usuario',
                        //             2500
                        //         );
						// 	});
						estaLogueado().then(resp =>
							console.log('Estado de Estado de login: ', resp)
						);
					}
				})
				.catch(err => {
					this.refs.toastLogin.show('Error de conexion al backend', 2500);
                    // this.refs.toastLogin.show(err.message || '', 2500);
					console.log(err);
				});
		}
	};

	onChangeFormLogin = formValue => {
		this.setState({
			loginData: formValue
		});
	};

	render() {
		const {
			loginStruct,
			loginOptions,
			loginData,
			loginErrorMessage
		} = this.state;

		return (
			<View style={styles.viewBody}>
				<Image
					source={require('../../../assets/img/reclamos.png')}
					containerStyle={styles.containerLogo}
					style={styles.logo}
					PlaceholderContent={<ActivityIndicator />}
					resizeMode='contain'
				/>
				<View style={styles.viewForm}>
					<Form
						ref='loginForm'
						type={loginStruct}
						options={loginOptions}
						value={loginData}
						onChange={formValue => this.onChangeFormLogin(formValue)}
					/>
					<Button
						buttonStyle={styles.buttonLoginContainer}
						title='Login'
						onPress={() => this.login()}
					/>
					<Text style={styles.textRegister}>
						¿Aun no tienes una cuenta?{' '}
						<Text
							style={styles.buttonRegister}
							onPress={() => this.props.navigation.navigate('Register')}
						>
							Registrate
						</Text>
					</Text>
					<Text style={styles.loginErrorMessage}>{loginErrorMessage}</Text>
				</View>
				<Toast
					ref='toastLogin'
					position='bottom'
					positionValue={250}
					faceInDuration={1000}
					faceOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: '#fff' }}
				/>
			</View>
		);
	}
}

// const mapStateToProps = state => ({
// 	token: state.token,
// });
// const mapDispatchToProps = dispatch => ({
// 	login: data => dispatch(login(data)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;

const styles = StyleSheet.create({
	viewBody: {
		flex: 1,
		marginLeft: 30,
		marginRight: 30,
		marginTop: 40
	},
	containerLogo: {
		alignItems: 'center'
	},
	logo: {
		width: 300,
		height: 150
	},
	viewForm: {
		marginTop: 50
	},
	buttonLoginContainer: {
		backgroundColor: '#00a680',
		marginTop: 20,
		marginBottom: 20,
		marginLeft: 10,
		marginRight: 10
	},
	loginErrorMessage: {
		color: '#f00',
		textAlign: 'center',
		marginTop: 20
	},
	textRegister: {
		marginTop: 15,
		marginLeft: 10,
		marginRight: 10
	},
	buttonRegister: {
		color: '#00a680',
		fontWeight: 'bold'
	}
});
