import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Image } from 'react-native-elements';
import config from '../../../utils/Config';
import { estaLogueado, getUser } from '../../../auth/Auth';

export default class ReclamosUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: false,
			reclamos: null,
			isLoading: true,
			sinReclamos: false
		};
	}

	componentDidMount() {
		this.checkLogin();
		this.loadReclamos();
	}

	checkLogin = () => {
		estaLogueado(logueado => {
			if (logueado) {
				this.setState({
					login: true
				});
			} else {
				this.setState({
					login: false
				});
			}
		});
	};

	loadActionButton = () => {
		const { login } = this.state;

		//if (login) {
		return (
			<ActionButton
				buttonColor='#00a680'
				onPress={() => {
					this.props.navigate('AgregarReclamo', {
						loadReclamos: this.loadReclamos
					});
				}}
			/>
		);
		//}
		//return null;
	};

	loadReclamos = async () => {
		let result = [];

		getUser()
			.then(user => {
				fetch(config.MIS_RECLAMOS_PATH + '/' + user.dni)
					.then(res => res.json())
					.then(reclamos => {
						if (reclamos.status == 500) {
							this.setState({
								sinReclamos: true
							});
						} else {
							reclamos.forEach(reclamo => {
								result.push({ reclamo });
							});
							this.setState({
								reclamos: result
							});
						}
					})
					.catch(err =>
						console.log('Hubo un error al querer conectarse al backend', err)
					);
			})
			.catch(err => {
				console.log(err);
			});
	};

	getImagenReclamo = imagesPaths => {
		if (imagesPaths && imagesPaths.length > 0) {
			return imagesPaths[0];
		} else {
			return 'https://www.todointeriores.com/wp-content/uploads/2019/04/Une-atmosphe%CC%80re-de%CC%81co-2019-Rivassoux-Murs-1-1.jpg';
		}
	};

	renderRow = reclamo => {
		const {
			id,
			estado,
			nombreEdificio,
			direccionEdificio,
			numeroUnidad,
			pisoUnidad,
			ubicacion,
			descripcion,
			imagesPaths
		} = reclamo.item.reclamo;

		return (
			<TouchableOpacity onPress={() => this.renderReclamo(reclamo)}>
				<View style={styles.reclamoRowView}>
					<View style={styles.imagenReclamoView}>
						<Image
							resizeMode='cover'
							source={{
								uri: this.getImagenReclamo(imagesPaths)
							}}
							style={styles.imagenReclamo}
						/>
					</View>
					<View>
						<Text style={styles.idReclamo}>Reclamo N°{id}</Text>
						<Text style={styles.edificioReclamo}>
							Edificio: {nombreEdificio}, {direccionEdificio}
						</Text>
						<Text style={styles.unidadReclamo}>
							Piso {pisoUnidad}, unidad {numeroUnidad}
						</Text>
						<Text style={styles.descripcionReclamo}>
							{this.formatDescription(descripcion)}
						</Text>
						<Text style={styles.estadoReclamo}>
							Estado: <Text style={styles.valorEstado}>{estado}</Text>
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	formatDescription = description => {
		if (description.length > 60) {
			let formattedDescription = description.substr(0, 60) + '...';
			return formattedDescription;
		}
		return description;
	};

	renderFlatList = reclamos => {
		if (reclamos) {
			return (
				<View>
					<FlatList
						data={reclamos}
						renderItem={this.renderRow}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
			);
		} else {
			return (
				<View style={styles.reclamosLoader}>
					<ActivityIndicator size='large' />
					<Text>Cargando reclamos...</Text>
				</View>
			);
		}
	};

	renderReclamo = reclamo => {
		this.props.navigate('Reclamo', { reclamo });
	};

	render() {
		const { reclamos } = this.state;

		return (
			<View style={styles.viewBody}>
				{this.renderFlatList(reclamos)}
				{this.loadActionButton()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white'
	},
	reclamosLoader: {
		marginTop: 20,
		alignItems: 'center'
	},
	reclamoRowView: {
		flexDirection: 'row',
		margin: 10
	},
	imagenReclamo: {
		width: 120,
		height: 120
	},
	imagenReclamoView: {
		marginRight: 15
	},
	idReclamo: {
		fontWeight: 'bold'
	},
	edificioReclamo: {
		paddingTop: 2,
		color: 'grey',
		width: 220
	},
	unidadReclamo: {
		paddingTop: 2,
		color: 'grey'
	},
	descripcionReclamo: {
		paddingTop: 2,
		color: 'grey',
		width: 220
	},
	estadoReclamo: {
		paddingTop: 2,
		color: 'grey',
		flexDirection: 'column-reverse'
	},
	valorEstado: {
		paddingTop: 2,
		fontWeight: 'bold'
	},
	restaurantsLoaderFooter: {
		marginTop: 10,
		marginBottom: 10
	},
	restaurantsNotFound: {
		marginTop: 10,
		marginBottom: 20,
		alignItems: 'center'
	}
});
