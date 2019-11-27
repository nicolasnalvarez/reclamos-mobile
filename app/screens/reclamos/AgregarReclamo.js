import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import t from 'tcomb-form-native';
import {
	AgregarReclamoStruct,
	AgregarReclamoOptions
} from '../../forms/AgregarReclamo';
import { Icon, Image, Button, Text, Overlay } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-easy-toast';
import { uploadImage } from '../../utils/UploadImage';
import { firebaseApp } from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Form = t.form.Form;
const db = firebase.firestore(firebaseApp);

export default class AgregarReclamo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			URIImagenReclamo: '',
			formData: {
				documento: '',
				ubicacion: '',
				descripcion: ''
			},
			loading: false
		};
	}

	imageIsRestaurant = image => {
		return image ? (
			<Image source={{ uri: image }} style={{ width: 500, height: 200 }} />
		) : (
			<Image
				source={require('../../../assets/img/restaurante.jpg')}
				style={{ width: 200, height: 200 }}
			/>
		);
	};

	uploadImage = async () => {
		const permissionResult = await Permissions.askAsync(
			Permissions.CAMERA_ROLL
		);

		if (permissionResult.status === 'denied') {
			this.refs.toast.show(
				'Es necesario aceptar los permisos de la galeria',
				1500
			);
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true
			});
			if (result.cancelled) {
				this.refs.toast.show('Has cerrado la galeria', 1500);
			} else {
				this.setState({
					URIImagenReclamo: result.uri
				});
			}
		}
	};

	onChangeAddFormRestaurant = formValue => {
		this.setState({
			formData: formValue
		});
	};

	addRestaurant = () => {
		const { URIImagenReclamo } = this.state;
		const {
			documento: name,
			ubicacion: city,
			address,
			descripcion: description
		} = this.state.formData;

		if (URIImagenReclamo && name && city && address && description) {
			this.setState({
				loading: true
			});
			db.collection('restaurantes')
				.add({
					name,
					city,
					address,
					description,
					image: '',
					createdAt: new Date()
				})
				.then(res => {
					const restaurantId = res.id;

					uploadImage(URIImagenReclamo, restaurantId, 'restaurantes')
						.then(res => {
							const restaurantRef = db
								.collection('restaurantes')
								.doc(restaurantId);

							restaurantRef
								.update({ image: res })
								.then(() => {
									this.setState({
										loading: false
									});
									this.refs.toast.show(
										'Restaurante creado correctamente',
										100,
										() => {
											this.props.navigation.state.params.loadReclamos();
											this.props.navigation.goBack();
										}
									);
								})
								.catch(err => {
									this.refs.toast.show(err);
									this.setState({
										loading: false
									});
								});
						})
						.catch(err => {
							this.refs.toast.show('Error del servidor');
							this.setState({
								loading: false
							});
						});
				})
				.catch(err => {
					this.refs.toast.show('Error del servidor');
					this.setState({
						loading: false
					});
				});
		} else {
			this.refs.toast.show('Tienes que llenar todos los campos');
		}
	};

	render() {
		const {
			restaurantImageURIImagenReclamo: restaurantImageUri,
			loading
		} = this.state;

		return (
			<View style={styles.viewBody}>
				<View style={styles.photoPreview}>
					{this.imageIsRestaurant(restaurantImageUri)}
				</View>
				<View>
					<Form
						ref='addRestaurantForm'
						type={AgregarReclamoStruct}
						options={AgregarReclamoOptions}
						value={this.state.formData}
						onChange={formValue => this.onChangeAddFormRestaurant(formValue)}
					/>
				</View>
				<View style={styles.uploadPhotoIconView}>
					<Icon
						name='camera'
						type='material-community'
						color='#7a7a7a'
						iconStyle={styles.uploadPhotoIcon}
						onPress={() => this.uploadImage()}
					/>
				</View>
				<View style={styles.addRestaurantBtnView}>
					<Button
						title='Crear Restaurante'
						onPress={() => this.addRestaurant()}
						buttonStyle={styles.addRestaurantBtn}
					/>
				</View>
				<Toast
					ref='toast'
					position='bottom'
					positionValue={320}
					fadeInDuration={1000}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: '#fff' }}
				/>
				<View>
					<Overlay
						overlayStyle={styles.loadingOverlay}
						isVisible={loading}
						width='auto'
						height='auto'
					>
						<View>
							<Text style={styles.loadingOverlayText}>Creando Restaurante</Text>
							<ActivityIndicator size='large' color='#00a680' />
						</View>
					</Overlay>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	photoPreview: {
		alignItems: 'center',
		height: 150,
		marginBottom: 20
	},
	uploadPhotoIconView: {
		flex: 1,
		alignItems: 'flex-start',
		marginLeft: 12
	},
	uploadPhotoIcon: {
		backgroundColor: '#e3e3e3',
		padding: 17,
		paddingBottom: 14,
		margin: 0
	},
	addRestaurantBtnView: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	addRestaurantBtn: {
		backgroundColor: '#00a680',
		margin: 20
	},
	loadingOverlay: {
		padding: 20
	},
	loadingOverlayText: {
		color: '#00a680',
		marginBottom: 20,
		fontSize: 20
	}
});
