import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Image } from 'react-native-elements';

export default class MyAccountGuest extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { goToLoginScreen } = this.props;

		return (
			<View style={styles.container}>
				<Image
					source={require('../../../assets/img/perfil-logout.jpg')}
					style={styles.logo}
					PlaceholderContent={<ActivityIndicator />}
					resizeMode='contain'
				/>
				<Text style={styles.title}>Logueate para ver tu perfil</Text>
				<Text style={styles.description}>
					Para poder realizar un reclamo, ver tus reclamos creados y más, debes
					estar logueado
				</Text>
				<Button
					title='Loguearme'
					buttonStyle={styles.btnLogin}
					onPress={() => {
						goToLoginScreen();
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
	btnLogin: {
		width: '100%',
		backgroundColor: '#00a680'
	}
});
