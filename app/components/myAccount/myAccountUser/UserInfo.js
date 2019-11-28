import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import UpdateUserInfo from './UpdateUserInfo';
import Toast, { DURATION } from 'react-native-easy-toast';
import { getUser, logout } from '../../../auth/Auth';

export default class UserInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...props,
			userInfo: {}
		};
	}

	componentDidMount = async () => {
		await this.getUserInfo();
	};

	getUserInfo = () => {
		getUser()
			.then(userInfo => {
				if (userInfo) {
					this.setState({
						userInfo
					});
				}
			})
			.catch(err => console.log(err));
	};

	updateUserDisplayName = async newDisplayName => {
		console.log('TODO: Cambio de info del usuario');
	};

	getUpdateUserInfoComponent = userInfoData => {
		if (userInfoData.hasOwnProperty('uid')) {
			return (
				<UpdateUserInfo
					userInfo={this.state.userInfo}
					updateUserDisplayName={this.updateUserDisplayName}
				/>
			);
		}
	};

	signOut = () => {
		logout().then(() => {
			this.props.validateLoginStatus();
		});
	};

	goToScreen = nameScreen => {
		this.props.navigation.navigate(nameScreen);
	};

	formatearTipoDeUsuario = tipoUsuario => {
		if (tipoUsuario === 1) {
			return <Text style={styles.infoUsuarioFilaImpar}>Dueño</Text>;
		} else {
			return <Text style={styles.infoUsuarioFilaImpar}>Inquilino</Text>;
		}
	};

	formatearEmail = email => {
		if (email) {
			return <Text style={styles.infoUsuarioFilaPar}>{email}</Text>;
		}
	};

	render() {
		const { nombre, tipo_usuario, dni, email } = this.state.userInfo;

		return (
			<View>
				<View style={styles.bodyView}>
					<Avatar
						rounded
						size='large'
						source={{
							uri: 'https://api.adorable.io/avatars/285/abott@adorable.png'
						}}
						containerStyle={styles.userInfoAvatar}
					/>
					<View>
						<Text style={styles.infoUsuarioFilaImpar}>{nombre}</Text>
						<Text style={styles.infoUsuarioFilaPar}>{dni}</Text>
						{this.formatearTipoDeUsuario(tipo_usuario)}
						{this.formatearEmail(email)}
					</View>
				</View>

				{this.getUpdateUserInfoComponent(this.state.userInfo)}

				<Button
					title='Cerrar Sesion'
					onPress={() => this.signOut()}
					buttonStyle={styles.btnSignOut}
					titleStyle={styles.btnSignOutText}
				/>

				<Toast
					ref='toast'
					position='bottom'
					positionValue={250}
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
	bodyView: {
		flexDirection: 'row',
		backgroundColor: '#f2f2f2',
		paddingTop: 30,
		paddingBottom: 30,
		alignItems: 'center',
		justifyContent: 'center'
	},
	userInfoAvatar: {
		marginRight: 50
	},
	infoUsuarioFilaImpar: {
		fontWeight: 'bold',
		backgroundColor: 'lightblue'
	},
	infoUsuarioFilaPar: {
		fontWeight: 'bold',
		backgroundColor: 'lightgreen'
	},
	btnSignOut: {
		marginTop: 30,
		borderRadius: 0,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#e3e3e3',
		borderBottomWidth: 1,
		borderBottomColor: '#e3e3e3',
		paddingTop: 10,
		paddingBottom: 10
	},
	btnSignOutText: {
		color: '#00a680'
	}
});
