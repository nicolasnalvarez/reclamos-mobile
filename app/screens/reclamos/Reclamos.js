import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { firebaseApp } from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Image } from 'react-native-elements';
import config from '../../utils/Config';
import Auth from '../../auth/Auth';

const db = firebase.firestore(firebaseApp);

export default class Restaurants extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: false,
			reclamos: null,
			isLoading: true
		};
	}

	componentDidMount() {
		this.checkLogin();
		this.loadReclamos();
	}

	checkLogin = () => {
		this.setState({
			login: true
		});

		// firebase.auth().onAuthStateChanged(user => {
		// 	if (user) {
		// 		this.setState({
		// 			login: true
		// 		});
		// 	} else {
		// 		this.setState({
		// 			login: false
		// 		});
		// 	}
		// });
	};

	loadActionButton = () => {
		const { login } = this.state;
		if (login) {
			return (
				<ActionButton
					buttonColor='#00a680'
					onPress={() => {
						this.props.navigation.navigate('AgregarReclamo', {
							loadReclamos: this.loadReclamos
						});
					}}
				/>
			);
		}
		return null;
	};

	loadReclamos = async () => {
		const { reclamosLimit: restaurantsLimit } = this.state;
		let result = [];

		//fetch(config.MIS_RECLAMOS_PATH + )

		const restaurants = db
			.collection('restaurantes')
			.orderBy('createdAt', 'desc')
			.limit(restaurantsLimit);

		await restaurants.get().then(res => {
			this.setState({
				restaurantsOffset: res.docs[res.docs.length - 1]
			});

			res.forEach(doc => {
				let restaurant = doc.data();
				restaurant.id = doc.id;
				result.push({ restaurant });
			});

			this.setState({
				restaurants: result
			});
		});
	};

	handleMoreRestaurantsLoader = async () => {
		const {
			reclamosLimit: restaurantsLimit,
			reclamosOffset: restaurantsOffset
		} = this.state;
		let result = [];

		this.state.reclamos.forEach(doc => {
			result.push(doc);
		});

		const limitedAndOffsetedRestaurants = db
			.collection('restaurantes')
			.orderBy('createdAt', 'desc')
			.startAfter(restaurantsOffset.data().createdAt)
			.limit(restaurantsLimit);

		await limitedAndOffsetedRestaurants
			.get()
			.then(res => {
				if (res.docs.length > 0) {
					this.setState({
						restaurantsOffset: res.docs(res.docs.length - 1)
					});
				} else {
					this.setState({
						isLoading: false
					});
				}

				res.forEach(doc => {
					let restaurant = doc.data();
					restaurant.id = doc.id;
					result.push({ restaurant });
				});

				this.setState({
					restaurants: result
				});
			})
			.catch(err => {});
	};

	renderRow = restaurant => {
		const {
			name,
			city,
			address,
			description,
			image
		} = restaurant.item.restaurant;

		return (
			<TouchableOpacity onPress={() => this.renderRestaurantPage(restaurant)}>
				<View style={styles.restaurantView}>
					<View style={styles.restautantImageView}>
						<Image
							resizeMode='cover'
							source={{ uri: image }}
							style={styles.restaurantImage}
						/>
					</View>
					<View>
						<Text style={styles.restaurantName}>{name}</Text>
						<Text style={styles.restaurantCityAddress}>
							{city},{address}
						</Text>
						<Text style={styles.restaurantDescription}>
							{this.formatDescription(description)}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	formatDescription = description => {
		if (description.length > 60) {
			let formattedDescription = description.substr(0, 60) + '...';
			return formattedDescription;
		}
		return description;
	};

	renderFooter = () => {
		if (this.state.isLoading) {
			return (
				<View style={styles.restaurantsLoaderFooter}>
					<ActivityIndicator size='large' />
				</View>
			);
		} else {
			return (
				<View style={styles.restaurantsNotFound}>
					<Text>No quedan mas por cargar</Text>
				</View>
			);
		}
	};

	renderFlatList = restaurants => {
		if (restaurants) {
			return (
				<View>
					<FlatList
						data={restaurants}
						renderItem={this.renderRow}
						keyExtractor={(item, index) => index.toString()}
						onEndReached={this.handleMoreRestaurantsLoader}
						onEndReachedThreshold={0}
						ListFooterComponent={this.renderFooter}
					/>
				</View>
			);
		} else {
			return (
				<View style={styles.restaurantsLoader}>
					<ActivityIndicator size='large' />
					<Text>Cargando restaurantes...</Text>
				</View>
			);
		}
	};

	renderRestaurantPage = restaurant => {
		this.props.navigation.navigate('Restaurant', { restaurant });
	};

	render() {
		const { reclamos: restaurants } = this.state;

		return (
			<View style={styles.viewBody}>
				{this.renderFlatList(restaurants)}
				{this.loadActionButton()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white'
	},
	restaurantsLoader: {
		marginTop: 20,
		alignItems: 'center'
	},
	restaurantView: {
		flexDirection: 'row',
		margin: 10
	},
	restaurantImage: {
		width: 80,
		height: 80
	},
	restautantImageView: {
		marginRight: 15
	},
	restaurantName: {
		fontWeight: 'bold'
	},
	restaurantCityAddress: {
		paddingTop: 2,
		color: 'grey'
	},
	restaurantDescription: {
		paddingTop: 2,
		color: 'grey',
		width: 200
	},
	restaurantsLoaderFooter: {
		marginTop: 10,
		marginBottom: 10
	},
	restaurantsNotFound: {
		marginTop: 10,
		marginBottom: 20,
		alignItems: 'center'
	}
});
