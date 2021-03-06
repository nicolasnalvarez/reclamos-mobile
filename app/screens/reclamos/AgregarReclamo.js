import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
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
import config from '../../utils/Config';
import { getUser } from '../../auth/Auth';

const Form = t.form.Form;
const db = firebase.firestore(firebaseApp);

export default class AgregarReclamo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			URIImagenReclamo: '',
			formData: {
				ubicacion: '',
				descripcion: '',
				idEdificio: null,
				idUnidad: null
			},
			documento: '',
			loading: false
		};
	}

	mostrarImagenReclamo = imagen => {
		return imagen ? (
			<Image source={{ uri: imagen }} style={{ width: 500, height: 200 }} />
		) : (
			<Image
				source={require('../../../assets/img/sin-reclamo.jpg')}
				style={{ width: 200, height: 200 }}
			/>
		);
	};

	subirImagen = async () => {
		const permisoAccesoImagenesDispositivo = await Permissions.askAsync(
			Permissions.CAMERA_ROLL
		);

		if (permisoAccesoImagenesDispositivo.status === 'denied') {
			this.refs.toast.show(
				'Es necesario aceptar los permisos de la galeria',
				1500
			);
		} else {
			const resultado = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true
			});
			if (resultado.cancelled) {
				this.refs.toast.show('Has cerrado la galeria', 1500);
			} else {
				this.setState({
					URIImagenReclamo: resultado.uri
				});
			}
		}
	};

	abrirCamara = async () => {};

	onChangeAgregarFormReclamo = formValue => {
		this.setState({
			formData: formValue
		});
	};

	agregarReclamo = () => {
		const { URIImagenReclamo } = this.state;
		const {
			ubicacion,
			descripcion,
			idEdificio,
			idUnidad
		} = this.state.formData;

		if ((URIImagenReclamo && ubicacion && descripcion, idEdificio, idUnidad)) {
			this.setState({
				loading: true
			});

			getUser()
				.then(user => {
					this.setState({
						documento: user.dni
					});
				})
				.catch(err => {
					console.log(err);
				});

			uploadImage(URIImagenReclamo, Date.now(), 'reclamos')
				.then(URLImagen => {
					const nuevoReclamoRequest = {
						reclamo: {
							documento: this.state.documento,
							ubicacion: ubicacion,
							descripcion: descripcion,
							idEdificio: idEdificio,
							idUnidad: idUnidad
						},
						imagenes: [
							{
								path: URLImagen,
								tipo: 'imagen'
							}
						]
					};
					console.log(nuevoReclamoRequest);
					fetch(config.GENERAR_RECLAMO_PATH, {
						method: 'POST',
						body: JSON.stringify(nuevoReclamoRequest),
						headers: {
							'Content-Type': 'application/json'
						}
					})
						.then(res => {
							if (res.status != 201) {
								this.refs.toast.show(
									'Los datos ingresados en el formulario son incorrectos'
								);
							} else {
								return res.json();
							}
						})
						.then(idReclamo => {
							this.setState({
								loading: false
							});
							this.refs.toast.show(
								'Reclamo N° ' + idReclamo + ' creado correctamente',
								100,
								() => {
									this.props.navigation.state.params.loadReclamos();
									this.props.navigation.goBack();
								}
							);
						})
						.catch(err => {
							this.setState({ loading: false });
							console.log(err);
						});
				})
				.catch(err => {
					this.refs.toast.show(
						'Hubo un problema al intentar subir la imagen a Firebase'
					);
				});
		} else {
			this.refs.toast.show('Tienes que llenar todos los campos');
		}
	};

	render() {
		const { URIImagenReclamo, loading } = this.state;

		return (
			<ScrollView style={styles.viewBody}>
				<View style={styles.photoPreview}>
					{this.mostrarImagenReclamo(URIImagenReclamo)}
				</View>
				<View>
					<Form
						ref='agregarReclamoForm'
						type={AgregarReclamoStruct}
						options={AgregarReclamoOptions}
						value={this.state.formData}
						onChange={formValue => this.onChangeAgregarFormReclamo(formValue)}
					/>
				</View>
				<View style={styles.iconoSeleccionarFotoView}>
					<Icon
						name='image'
						type='material-community'
						onPress={() => this.subirImagen()}
						reverse
						color='orange'
						containerStyle={styles.containerIconoSeleccionarFoto}
						size={30}
					/>
					{/* <Icon
						name='camera'
						type='material-community'
						onPress={() => this.props.navigation.navigate('Camara')}
						reverse
						color='orange'
						containerStyle={styles.containerIconoTomarFoto}
						size={30}
					/> */}
				</View>
				<View style={styles.agregarReclamoBtnView}>
					<Button
						title='Crear Reclamo'
						onPress={() => this.agregarReclamo()}
						buttonStyle={styles.agregarReclamoBtn}
					/>
				</View>
				<Toast
					ref='toast'
					position='bottom'
					positionValue={3}
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
							<Text style={styles.loadingOverlayText}>Creando Reclamo</Text>
							<ActivityIndicator size='large' color='#00a680' />
						</View>
					</Overlay>
				</View>
			</ScrollView>
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
		marginBottom: 70
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
	},
	iconoSeleccionarFotoView: {
		flex: 1,
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center'
	},
	containerIconoSeleccionarFoto: {
		padding: 30
	},
	containerIconoTomarFoto: {
		padding: 30,
		paddingLeft: 60
	},
	agregarReclamoBtnView: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	agregarReclamoBtn: {
		backgroundColor: '#00a680',
		margin: 20
	}
});
