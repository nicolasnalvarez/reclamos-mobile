import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Toast, { DURATION } from 'react-native-easy-toast';
import OverlayOneInput from '../../elements/OverlayOneInput';
import OverlayTwoInputs from '../../elements/OverlayTwoInputs';
import OverlayThreeInputs from '../../elements/OverlayThreeInputs';

export default class UpdateUserInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...props,
			overlayComponent: null,
			menuItems: [
				{
					title: 'Cambiar nombre y apellido',
					iconType: 'material-community',
					iconNameRight: 'chevron-right',
					iconColorRight: '#ccc',
					iconNameLeft: 'account-circle',
					iconColorLeft: '#ccc',
					onPress: () =>
						this.openOverlay(
							'Nombre y Apellido',
							this.updateUserDisplayName,
							props.userInfo.displayName
						)
				},
				{
					title: 'Cambiar email',
					iconType: 'material-community',
					iconNameLeft: 'at',
					iconColorLeft: '#ccc',
					iconNameRight: 'chevron-right',
					iconColorRight: '#ccc',
					onPress: () =>
						this.openOverlayTwoInputs(
							'Email',
							'Clave',
							props.userInfo.email,
							this.updateUserEmail
						)
				},
				{
					title: 'Cambiar clave',
					iconType: 'material-community',
					iconNameLeft: 'lock-reset',
					iconColorLeft: '#ccc',
					iconNameRight: 'chevron-right',
					iconColorRight: '#ccc',
					onPress: () =>
						this.openOverlayThreeInputs(
							'Clave actual',
							'Nueva clave',
							'Repetir nueva clave',
							this.updateUserPassword
						)
				}
			]
		};
	}

	updateUserDisplayName = async newDisplayName => {
		if (newDisplayName) {
			this.state.updateUserDisplayName(newDisplayName);
		}
		this.setState({
			overlayComponent: null
		});
	};

	openOverlay = (placeholder, updateFunction, inputValue) => {
		this.setState({
			overlayComponent: (
				<OverlayOneInput
					overlayIsVisible={true}
					placeholder={placeholder}
					updateFunction={updateFunction}
					inputValue={inputValue}
				/>
			)
		});
	};

	updateUserEmail = async (newEmail, password) => {
		const emailOld = this.props.userInfo.email;
		if (emailOld != newEmail && password) {
			this.state.updateUserEmail(newEmail, password);
		}
		this.setState({
			overlayComponent: null
		});
	};

	openOverlayTwoInputs = (
		placeholderOne,
		placeholderTwo,
		inputValueOne,
		updateFunction
	) => {
		this.setState({
			overlayComponent: (
				<OverlayTwoInputs
					overlayIsVisible={true}
					placeholderOne={placeholderOne}
					placeholderTwo={placeholderTwo}
					inputValueOne={inputValueOne}
					inputValueTwo=''
					isPassword={true}
					updateFunction={updateFunction}
				/>
			)
		});
	};

	updateUserPassword = async (
		currentPassword,
		newPassword,
		newPasswordConfirmation
	) => {
		if (currentPassword && newPasswordConfirmation && newPasswordConfirmation) {
			if (newPassword === newPasswordConfirmation) {
				if (currentPassword === newPassword) {
					this.refs.toast.show('La nueva clave debe ser distinta a la actual');
				} else {
					this.state.updateUserPassword(currentPassword, newPassword);
				}
			} else {
				this.refs.toast.show('La clave actual y la repetida no son iguales');
			}
		} else {
			this.refs.toast.show('Tienes que completar todos los campos');
		}

		this.setState({
			overlayComponent: null
		});
	};

	openOverlayThreeInputs = (
		placeholderOne,
		placeholderTwo,
		placeholderThree,
		updateFunction
	) => {
		this.setState({
			overlayComponent: (
				<OverlayThreeInputs
					overlayIsVisible={true}
					placeholderOne={placeholderOne}
					placeholderTwo={placeholderTwo}
					placeholderThree={placeholderThree}
					inputValueOne=''
					inputValueTwo=''
					inputValueThree=''
					isPassword={true}
					updateFunction={updateFunction}
				/>
			)
		});
	};

	render() {
		const { menuItems, overlayComponent } = this.state;
		return (
			<View>
				{menuItems.map((item, index) => (
					<ListItem
						key={index}
						title={item.title}
						leftIcon={{
							type: item.iconType,
							name: item.iconNameLeft,
							color: item.iconColorLeft
						}}
						rightIcon={{
							type: item.iconType,
							name: item.iconNameRight,
							color: item.iconColorRight
						}}
						onPress={item.onPress}
						containerStyle={styles.containerContentStyle}
					/>
				))}
				{overlayComponent}

				<Toast
					ref='toast'
					position='center'
					positionValue={0}
					fadeInDuration={1000}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: '#fff' }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	containerContentStyle: {
		borderBottomWidth: 1,
		borderBottomColor: '#e3e3d3'
	}
});
