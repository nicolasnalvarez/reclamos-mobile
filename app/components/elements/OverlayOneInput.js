import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Input, Button, Icon } from 'react-native-elements';

export default class OverlayOneInput extends Component {
	constructor(props) {
		super(props);

		this.state = { ...props };
	}

	onChangeInput = inputData => {
		this.setState({
			inputValue: inputData
		});
	};

	update = () => {
		const newValue = this.state.inputValue;

		this.state.updateFunction(newValue);
		this.setState({
			overlayIsVisible: false
		});
	};

	close = () => {
		this.setState({
			overlayIsVisible: false
		});

		this.state.updateFunction(null);
	};

	render() {
		const { overlayIsVisible, placeholder, inputValue } = this.state;

		return (
			<Overlay
				isVisible={overlayIsVisible}
				overlayBackgroundColor='transparent'
				overlayStyle={styles.overlayStyle}>
				<View style={styles.overlayView}>
					<Input
						containerStyle={styles.inputContainer}
						placeholder={placeholder}
						onChangeText={value => this.onChangeInput(value)}
						value={inputValue}
					/>
					<Button
						title='Actualizar'
						buttonStyle={styles.buttonUpdate}
						onPress={() => this.update()}
					/>
					<Icon
						containerStyle={styles.containerIconClose}
						type='material-community'
						name='close-circle-outline'
						size={30}
						onPress={() => this.close()}
					/>
				</View>
			</Overlay>
		);
	}
}

const styles = StyleSheet.create({
	overlayStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	overlayView: {
		width: '100%',
		backgroundColor: '#fff',
		padding: 20
	},
	inputContainer: {
		marginBottom: 20
	},
	buttonUpdate: {
		backgroundColor: '#00a680'
	},
	containerIconClose: {
		position: 'absolute',
		right: -15,
		top: -16
	}
});
