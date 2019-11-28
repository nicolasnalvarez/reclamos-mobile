import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { Button, Image, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

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

					<RNPickerSelect
						onValueChange={value => this.setState({ opcion: value })}
						placeholder={{ label: 'Seleccione un edificio' }}
						items={[
							{ label: 'Football', value: 'football' },
							{ label: 'Baseball', value: 'baseball' },
							{ label: 'Hockey', value: 'hockey' }
						]}
						value={this.state.opcion}
						style={styles.edificioPicker}
					/>

					{/* <Picker
						//selectedValue={''}
						style={{ height: 50, width: 100 }}
						onValueChange={(itemValue, itemIndex) =>
							this.setState({ opcion: itemValue })
						}
						style={styles.ubicacionPicker}
					>
						<Picker.Item label='Java' value='java' />
						<Picker.Item label='JavaScript' value='js' />
					</Picker> */}
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
	edificioPicker: {
		justifyContent: 'center',
		margin: 40
	},
	unidadPicker: {}
});
