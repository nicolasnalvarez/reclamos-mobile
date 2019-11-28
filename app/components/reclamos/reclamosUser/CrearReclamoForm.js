import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { Button, Image, Input, Icon } from 'react-native-elements';

export default class CrearReclamoForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			opcion: ''
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.formCrearReclamo}>
					<Input
						placeholder='Ej: 33444555'
						leftIcon={
							<Icon name='sc-telegram' type='evilicon' color='#517fa4' />
						}
						label='N° de Documento'
						containerStyle={styles.documentoInput}
					/>
					<Input
						placeholder='Ej: Pared del Laundry'
						leftIcon={
							<Icon name='sc-telegram' type='evilicon' color='#517fa4' />
						}
						label='Zona del reclamo'
						containerStyle={styles.ubicacionInput}
					/>
					<Input
						placeholder='Ej: Se encontro la pared del laundry con mucha suciedad'
						leftIcon={
							<Icon name='sc-telegram' type='evilicon' color='#517fa4' />
						}
						label='Descripcion'
						containerStyle={styles.descripcionInput}
					/>
					<Picker
						//selectedValue={''}
						style={{ height: 50, width: 100 }}
						onValueChange={(itemValue, itemIndex) =>
							this.setState({ opcion: itemValue })
						}
						style={styles.ubicacionPicker}
					>
						<Picker.Item label='Java' value='java' />
						<Picker.Item label='JavaScript' value='js' />
					</Picker>
				</View>
				<View style={styles.iconoSeleccionarFotoView}>
					<Icon
						name='camera'
						type='material-community'
						color='#7a7a7a'
						iconStyle={styles.iconoSeleccionarFoto}
						onPress={() => this.subirImagen()}
					/>
				</View>
				<View style={styles.agregarReclamoBtnView}>
					<Button
						title='Crear Restaurante'
						onPress={() => this.agregarReclamo()}
						buttonStyle={styles.agregarReclamoBtn}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	formCrearReclamo: {
		marginTop: 50
	},
	documentoInput: {
		marginTop: 10
	},
	ubicacionInput: {
		marginTop: 10
	},
	descripcionInput: {
		marginTop: 10
	},
	ubicacionPicker: {
		justifyContent: 'center'
	},
	unidadPicker: {},
	iconoSeleccionarFotoView: {
		flex: 1,
		alignItems: 'flex-start',
		marginLeft: 12
	},
	iconoSeleccionarFoto: {
		backgroundColor: '#e3e3e3',
		padding: 17,
		paddingBottom: 14,
		margin: 0
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
