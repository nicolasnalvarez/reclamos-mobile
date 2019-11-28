import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';

// create a component
export default inputTemplate = locals => {
	return (
		<View style={styles.container}>
			<Input
				placeholder={locals.config.placeholder}
				label={locals.config.label}
				rightIcon={
					<Icon
						type={locals.config.iconType}
						name={locals.config.iconName}
						size={24}
						color='#b3b3b3'
					/>
				}
				onChangeText={value => locals.onChange(value)}
			/>
		</View>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		marginVertical: 20
	}
});
