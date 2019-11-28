import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Image, Icon, ListItem } from 'react-native-elements';

export default class Reclamo extends Component {
	constructor(props) {
		super(props);
	}

	getImagenReclamo = imagesPaths => {
		console.log('Entro al getImagenReclamo', imagesPaths);

		if (
			imagesPaths &&
			imagesPaths.length > 0 &&
			imagesPaths[0].startsWith('https://firebasestorage')
		) {
			return imagesPaths[0];
		} else {
			return 'https://www.todointeriores.com/wp-content/uploads/2019/04/Une-atmosphe%CC%80re-de%CC%81co-2019-Rivassoux-Murs-1-1.jpg';
		}
	};

	formatearZonaReclamo = zonaReclamo => {
		if (zonaReclamo) {
			return <Text style={styles.unidadReclamo}>Zona: {zonaReclamo}</Text>;
		}
	};

	render() {
		console.log(this.props.navigation.state.params.reclamo.item.reclamo);

		const {
			estado,
			nombreEdificio,
			direccionEdificio,
			numeroUnidad,
			pisoUnidad,
			ubicacion,
			descripcion,
			imagesPaths
		} = this.props.navigation.state.params.reclamo.item.reclamo;

		const listExtraInfo = [
			{
				text: `${direccionEdificio}`,
				iconName: 'map-marker',
				iconType: 'material-community',
				action: null
			}
		];

		return (
			<View style={styles.viewBody}>
				<View style={styles.imageView}>
					<Image
						source={{ uri: this.getImagenReclamo(imagesPaths) }}
						PlaceholderContent={<ActivityIndicator />}
						style={styles.imagenReclamo}
					/>
				</View>
				<View style={styles.InfoReclamoView}>
					<Text style={styles.edificioReclamo}>Edificio: {nombreEdificio}</Text>
					<View style={styles.reclamoExtraInfoView}>
						{listExtraInfo.map((item, index) => (
							<ListItem
								key={index}
								title={item.text}
								leftIcon={<Icon name={item.iconName} type={item.iconType} />}
							/>
						))}
					</View>
					<Text style={styles.unidadReclamo}>
						Piso {pisoUnidad}, unidad {numeroUnidad}
					</Text>
					{this.formatearZonaReclamo(ubicacion)}
					<Text style={styles.unidadReclamo}>Estado: {estado}</Text>
					<Text style={styles.descripcionReclamo}>{descripcion}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	imageView: {
		width: '100%'
	},
	imagenReclamo: {
		width: '100%',
		height: 300,
		resizeMode: 'cover'
	},
	InfoReclamoView: {
		margin: 15
	},
	edificioReclamo: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	descripcionReclamo: {
		marginTop: 5,
		color: 'grey'
	},
	unidadReclamo: {
		paddingTop: 2,
		color: 'grey'
	},
	reclamoExtraInfoView: {
		margin: 15,
		marginTop: 25
	}
});
