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

export default class Restaurants extends Component {
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
		if (login) {
			return (
				<ActionButton
					buttonColor='#00a680'
					onPress={() => {
						this.props.navigation.navigate('AgregarReclamo', {
							loadReclamos: this.loadReclamos
						});
					}}
				/>
			);
		}
		return null;
	};

	loadReclamos = async () => {
		let result = [];

		getUser()
			.then(user => {
				fetch(config.MIS_RECLAMOS_PATH + '/' + user.dni)
					.then(res => res.json())
					.then(reclamos => {
						console.log(reclamos);

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
							console.log(result);
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

	renderRow = reclamo => {
		console.log('Info del reclamo a mostrar en renderRow: ', reclamo);

		const {
			id,
			estado,
			nombreEdificio,
			direccionEdificio,
			numeroUnidad,
			pisoUnidad,
			ubicacion,
			descripcion,
			imagePaths
		} = reclamo.item.reclamo;

		return (
			<TouchableOpacity onPress={() => this.renderReclamo(reclamo)}>
				<View style={styles.reclamoRowView}>
					<View style={styles.imagenReclamoView}>
						<Image
							resizeMode='cover'
							source={{
								uri:
									'https://unimate.com.ar/wp-content/uploads/2018/05/living-3.jpg'
							}}
							style={styles.imagenReclamo}
						/>
					</View>
					<View>
						<Text style={styles.restaurantName}>{name}</Text>
						<Text style={styles.restaurantCityAddress}>
							{city},{address}
						</Text>
						<Text style={styles.descripcionReclamo}>
							{this.formatDescription(descripcion)}
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
		this.props.navigation.navigate('Reclamo', { reclamo });
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
		width: 80,
		height: 80
	},
	imagenReclamoView: {
		marginRight: 15
	},
	restaurantName: {
		fontWeight: 'bold'
	},
	restaurantCityAddress: {
		paddingTop: 2,
		color: 'grey'
	},
	descripcionReclamo: {
		paddingTop: 2,
		color: 'grey',
		width: 200
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
