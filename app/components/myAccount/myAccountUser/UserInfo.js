import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import UpdateUserInfo from './UpdateUserInfo';
import Toast, { DURATION } from 'react-native-easy-toast';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
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

	checkUserAvatar = photoURL => {
		return photoURL
			? photoURL
			: 'https://api.adorable.io/avatars/285/abott@adorable.png';
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

	updateUserPhotoURL = async newPhotoURL => {
		const update = {
			photoURL: newPhotoURL
		};
		await firebase.auth().currentUser.updateProfile(update);
		this.getUserInfo();
	};

	changeUserAvatar = async () => {
		const resultPermision = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (resultPermision.status === 'denied') {
			this.refs.toast.show(
				'Es necesario aceptar los permisos para acceder a la galeria',
				1500
			);
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowEditing: true,
				aspect: [4, 3]
			});

			if (result.cancelled) {
				this.refs.toast.show('Se cerro la galeria de imagenes');
			} else {
				const { uid } = this.state.userInfo;
				this.uploadImage(result.uri, uid)
					.then(res => {
						this.refs.toast.show('Avatar actualizado correctamente');

						firebase
							.storage()
							.ref('avatar/' + uid)
							.getDownloadURL()
							.then(url => {
								this.updateUserPhotoURL(url);
							})
							.catch(err => {
								this.refs.toast.show(
									'No se pudo recuperar el avatar del servidor'
								);
							});
					})
					.catch(err => {
						this.refs.toast.show('No se pudo actualizar el avatar');
					});
			}
		}
	};

	uploadImage = async (uri, imageName) => {
		fetch(uri)
			.then(async res => {
				let ref = firebase
					.storage()
					.ref()
					.child('avatar/' + imageName);
				return await ref.put(res._bodyBlob);
			})
			.catch(err => {
				this.refs.toast.show(err, 1500);
			});
	};

	signOut = () => {
		logout().then(() => {
			this.props.validateLoginStatus();
		});
	};

	goToScreen = nameScreen => {
		this.props.navigation.navigate(nameScreen);
	};

	render() {
		const { displayName, email, photoURL } = this.state.userInfo;

		return (
			<View>
				<View style={styles.bodyView}>
					<Avatar
						rounded
						size='large'
						source={{ uri: this.checkUserAvatar(photoURL) }}
						containerStyle={styles.userInfoAvatar}
						showEditButton
						onEditPress={() => this.changeUserAvatar()}
					/>
					<View>
						<Text style={styles.displayName}>{displayName}</Text>
						<Text>{email}</Text>
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
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#f2f2f2',
		paddingTop: 30,
		paddingBottom: 30
	},
	userInfoAvatar: {
		marginRight: 20
	},
	displayName: {
		fontWeight: 'bold'
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
