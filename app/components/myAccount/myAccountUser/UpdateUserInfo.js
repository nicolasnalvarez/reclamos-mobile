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
							props.userInfo.nombre
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
