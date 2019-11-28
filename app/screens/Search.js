import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import config from '../utils/Config';

export default class Search extends Component {
	constructor() {
		super();

		this.state = {
			busqueda: '',
			reclamo: null
		};
	}

	buscarReclamo = async idReclamo => {
		this.setState({ busqueda: idReclamo });
		let url = config.GET_RECLAMO_PATH + '/' + idReclamo;

		fetch(url)
			.then(res => res.json())
			.then(reclamoResp => {
				console.log(reclamoResp);
				this.setState({
					reclamo: reclamoResp
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	getImagenReclamo = imagePaths => {
		if (imagePaths && imagePaths.length > 0) {
			return imagePaths[0];
		} else {
			return 'https://www.todointeriores.com/wp-content/uploads/2019/04/Une-atmosphe%CC%80re-de%CC%81co-2019-Rivassoux-Murs-1-1.jpg';
		}
	};

	renderReclamo = reclamo => {
		if (reclamo) {
			return (
				<View>
					<ListItem
						key={reclamo.id}
						title={reclamo.id}
						leftAvatar={{
							source: { uri: this.getImagenReclamo(reclamo.imagePaths) }
						}}
						rightIcon={<Icon type='material-community' name='chevron-right' />}
						onPress={() => this.clickReclamo(reclamo)}
					/>
				</View>
			);
		} else {
			return (
				<View>
					<Text style={styles.noEncontroReclamos}>Busca tus reclamos!</Text>
				</View>
			);
		}
	};

	clickReclamo = reclamo => {
		this.props.navigation.navigate('Reclamo', { reclamo });
	};

	render() {
		const { busqueda, reclamo } = this.state;

		return (
			<View style={styles.bodyView}>
				<SearchBar
					placeholder='Buscar un reclamo'
					onChangeText={this.buscarReclamo}
					value={busqueda}
					containerStyle={styles.barraDeBusqueda}
					lightTheme={true}
				/>
				{this.renderReclamo(reclamo)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bodyView: {
		flex: 1
	},
	barraDeBusqueda: {
		marginBottom: 20
	},
	noEncontroReclamos: {
		textAlign: 'center'
	}
});
