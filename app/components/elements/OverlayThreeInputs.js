import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Input, Button, Icon } from 'react-native-elements';

export default class OverlayTwoInputs extends Component {
	constructor(props) {
		super(props);

		this.state = { ...props };
	}

	onChangeInputOne = inputData => {
		this.setState({
			inputValueOne: inputData
		});
	};

	onChangeInputTwo = inputData => {
		this.setState({
			inputValueTwo: inputData
		});
	};

	onChangeInputThree = inputData => {
		this.setState({
			inputValueThree: inputData
		});
	};

	update = () => {
		const newValueOne = this.state.inputValueOne;
		const newValueTwo = this.state.inputValueTwo;
		const newValueThree = this.state.inputValueThree;

		this.state.updateFunction(newValueOne, newValueTwo, newValueThree);

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
		const {
			overlayIsVisible,
			placeholderOne,
			placeholderTwo,
			placeholderThree,
			inputValueOne,
			inputValueTwo,
			inputValueThree,
			isPassword
		} = this.state;

		return (
			<Overlay
				isVisible={overlayIsVisible}
				overlayBackgroundColor='transparent'
				overlayStyle={styles.overlayStyle}>
				<View style={styles.overlayView}>
					<Input
						containerStyle={styles.inputContainer}
						placeholder={placeholderOne}
						onChangeText={value => this.onChangeInputOne(value)}
						value={inputValueOne}
						password={isPassword}
						secureTextEntry={isPassword}
					/>
					<Input
						containerStyle={styles.inputContainer}
						placeholder={placeholderTwo}
						onChangeText={value => this.onChangeInputTwo(value)}
						value={inputValueTwo}
						password={isPassword}
						secureTextEntry={isPassword}
					/>
					<Input
						containerStyle={styles.inputContainer}
						placeholder={placeholderThree}
						onChangeText={value => this.onChangeInputThree(value)}
						value={inputValueThree}
						password={isPassword}
						secureTextEntry={isPassword}
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
