import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import UserInfo from './UserInfo';

export default class MyAccountUser extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<View style={styles.userAccountView}>
				<UserInfo />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	userAccountView: {
		height: '100%',
		backgroundColor: '#f2f2f2'
	}
});
