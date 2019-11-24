import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Image, Icon, ListItem } from 'react-native-elements';

export default class Restaurant extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const {
			name,
			city,
			address,
			description,
			image
		} = this.props.navigation.state.params.restaurant.item.restaurant;

		const listExtraInfo = [
			{
				text: `${city}, ${address}`,
				iconName: 'map-marker',
				iconType: 'material-community',
				action: null
			}
		];

		return (
			<View style={styles.viewBody}>
				<View style={styles.imageView}>
					<Image
						source={{ uri: image }}
						PlaceholderContent={<ActivityIndicator />}
						style={styles.restaurantImage}
					/>
				</View>
				<View style={styles.restaurantInfoView}>
					<Text style={styles.restaurantName}>{name}</Text>
					<Text style={styles.restaurantDescription}>{description}</Text>
				</View>
				<View style={styles.restaurantExtraInfoView}>
					<Text style={styles.restaurantExtraInfoTitle}>
						Informacion sobre el restaurante
					</Text>
					{listExtraInfo.map((item, index) => (
						<ListItem
							key={index}
							title={item.text}
							leftIcon={<Icon name={item.iconName} type={item.iconType} />}
						/>
					))}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	imageView: {
		width: '100%'
	},
	restaurantImage: {
		width: '100%',
		height: 200,
		resizeMode: 'cover'
	},
	restaurantInfoView: {
		margin: 15
	},
	restaurantName: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	restaurantDescription: {
		marginTop: 5,
		color: 'grey'
	},
	restaurantExtraInfoView: {
		margin: 15,
		marginTop: 25
	},
	restaurantExtraInfoTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10
	}
});
