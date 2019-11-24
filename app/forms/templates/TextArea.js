import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';

export default inputTemplate = locals => {
	return (
		<View style={styles.viewContainer}>
			<Input
				placeholder={locals.config.placeholder}
				multiline={true}
				rightIcon={
					<Icon
						type={locals.config.iconType}
						name={locals.config.iconName}
						size={24}
						color='#b3b3b3'
					/>
				}
				onChangeText={value => locals.onChange(value)}
				inputContainerStyle={styles.inputContainer}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	viewContainer: {
		margin: 12,
		height: 100,
		width: '100%'
	},
	inputContainer: {
		position: 'absolute',
		height: 100,
		width: '100%',
		padding: 0,
		margin: 0
	}
});
