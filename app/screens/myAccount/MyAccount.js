import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as firebase from 'firebase';
import MyAccountGuest from '../../components/myAccount/MyAccountGuest';
import MyAccountUser from '../../components/myAccount/myAccountUser/MyAccountUser';
import { estaLogueado } from '../../auth/Auth';

export default class MyAccount extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: false
		};
	}

	componentDidMount() {
		this.validateLoginStatus();
	}

	goToLoginScreen = () => {
		this.props.navigation.navigate('Login', {
			validateLoginStatus: this.validateLoginStatus
		});
	};

	validateLoginStatus = () => {
		estaLogueado()
			.then(res => {
				console.log('Pantalla de cuenta. Esta logueado? ', res);
				if (res) {
					this.setState({
						login: true
					});
				} else {
					this.setState({
						login: false
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		const { login } = this.state;

		if (login) {
			return <MyAccountUser validateLoginStatus={this.validateLoginStatus} />;
		} else {
			return <MyAccountGuest goToLoginScreen={this.goToLoginScreen} />;
		}
	}
}
