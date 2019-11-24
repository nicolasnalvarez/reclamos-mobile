import React from 'react';
import { StyleSheet, View } from 'react-native';
import UserNavigaton from './app/navigations/User';
import { firebaseApp } from './app/utils/Firebase';

export default function App() {
	return (
		<View style={styles.container}>
			<UserNavigaton />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
