import React, { Component } from 'react';
import ReclamosGuest from '../../components/reclamos/ReclamosGuest';
import ReclamosUser from '../../components/reclamos/reclamosUser/ReclamosUser';
import { estaLogueado } from '../../auth/Auth';

export default class Reclamos extends Component {
	constructor(props) {
		super(props);
		console.log(props);
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
			return <ReclamosUser navigate={this.props.navigation.navigate} />;
		} else {
			return <ReclamosGuest goToLoginScreen={this.goToLoginScreen} />;
		}
	}
}
