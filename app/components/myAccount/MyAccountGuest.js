//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Image } from 'react-native-elements';

// create a component
export default class MyAccountGuest extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { goToScreen } = this.props;

		return (
			<View style={styles.container}>
				<Image
					source={require('../../../assets/img/image-my-account-guest-01.jpg')}
					style={styles.logo}
					PlaceholderContent={<ActivityIndicator />}
					resizeMode="contain"
				/>
				<Text style={styles.title}>Consulta tu perfil de 5 tenedores</Text>
				<Text style={styles.description}>
					¿Como describirias tu mejor restaurante? Busca y visualiza los mejores
					restaurantes de una forma sencilla. Vota cual te ha gustado mas y
					comenta como ha sido tu experiencia
				</Text>
				<Button
					title="Ver tu perfil"
					buttonStyle={styles.btnViewProfile}
					onPress={() => {
						goToScreen('Login');
					}}
				/>
			</View>
		);
	}
}

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 30,
		paddingRight: 30
	},
	logo: {
		height: 300,
		width: 300,
		marginBottom: 40
	},
	title: {
		fontWeight: 'bold',
		fontSize: 19,
		marginBottom: 10
	},
	description: {
		textAlign: 'center',
		marginBottom: 20
	},
	btnViewProfile: {
		width: '100%',
		backgroundColor: '#00a680'
	}
});
