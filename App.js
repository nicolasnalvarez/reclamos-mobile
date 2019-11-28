import React from 'react';
import { StyleSheet, View } from 'react-native';
import UserNavigaton from './app/navigations/User';
import { firebaseApp } from './app/utils/Firebase';
import store from './app/redux/store';
import { Provider } from "react-redux";

export default function App() {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				<UserNavigaton />
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
