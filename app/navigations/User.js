import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import {
	createStackNavigator,
	createAppContainer,
	createBottomTabNavigator
} from 'react-navigation';
//Screens
import SearchScreen from '../screens/Search';
import TopFiveScreen from '../screens/TopFive';
//Screens MyAccount
import MyAccountScreen from '../screens/myAccount/MyAccount';
import RegisterScreen from '../screens/myAccount/Register';
import LoginScreen from '../screens/myAccount/Login';
//Screens reclamos
import ReclamosScreen from '../screens/reclamos/Reclamos';
import AgregarReclamoScreen from '../screens/reclamos/AgregarReclamo';
import ReclamoScreen from '../screens/reclamos/Reclamo';

const reclamosScreenStack = createStackNavigator({
	Reclamos: {
		screen: ReclamosScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Reclamos',
			login: props => {
				setLoginState();
			}
		})
	},
	AgregarReclamo: {
		screen: AgregarReclamoScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Nuevo Reclamo'
		})
	},
	Reclamo: {
		screen: ReclamoScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Reclamo N° ' + navigation.state.params.reclamo.item.reclamo.id
		})
	}
});

const topFiveScreenStack = createStackNavigator({
	TopFive: {
		screen: TopFiveScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Top 5 Restaurantes'
		})
	}
});

const searchScreenStack = createStackNavigator({
	Search: {
		screen: SearchScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Buscar'
		})
	}
});

const myAccountScreenStack = createStackNavigator({
	MyAccount: {
		screen: MyAccountScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Mi cuenta'
		})
	},
	Register: {
		screen: RegisterScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Registro'
		})
	},
	Login: {
		screen: LoginScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Login'
		})
	}
});

const RootStack = createBottomTabNavigator(
	{
		Reclamos: {
			screen: reclamosScreenStack,
			navigationOptions: ({ navigation }) => ({
				tabBarLabel: 'Reclamos',
				tabBarIcon: ({ tintColor }) => (
					<Icon
						name='file-document-outline'
						type='material-community'
						size={22}
						color={tintColor}
					/>
				)
			})
		},
		TopFive: {
			screen: topFiveScreenStack,
			navigationOptions: ({ navigation }) => ({
				tabBarLabel: 'Top 5',
				tabBarIcon: ({ tintColor }) => (
					<Icon
						name='star-outline'
						type='material-community'
						size={22}
						color={tintColor}
					/>
				)
			})
		},
		Search: {
			screen: searchScreenStack,
			navigationOptions: ({ navigation }) => ({
				tabBarLabel: 'Buscar',
				tabBarIcon: ({ tintColor }) => (
					<Icon
						name='magnify'
						type='material-community'
						size={22}
						color={tintColor}
					/>
				)
			})
		},
		MyAccount: {
			screen: myAccountScreenStack,
			navigationOptions: ({ navigation }) => ({
				tabBarLabel: 'Mi cuenta',
				tabBarIcon: ({ tintColor }) => (
					<Icon
						name='home-outline'
						type='material-community'
						size={22}
						color={tintColor}
					/>
				)
			})
		}
	},
	{
		initialRouteName: 'Reclamos',
		tabBarOptions: {
			inactiveTintColor: '#646464',
			activeTintColor: '#00a680'
		}
	}
);

export default createAppContainer(RootStack);
