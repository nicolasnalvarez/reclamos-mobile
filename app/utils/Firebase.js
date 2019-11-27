import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAIot9BRcEgGnNDZxYix-O4IXbvswWXMBA',
	authDomain: 'reclamos-5819a.firebaseapp.com',
	databaseURL: 'https://reclamos-5819a.firebaseio.com',
	projectId: 'reclamos-5819a',
	storageBucket: 'reclamos-5819a.appspot.com',
	messagingSenderId: '994422036759',
	appId: '1:994422036759:web:3a98acd0c4d741d7ebff52',
	measurementId: 'G-6PS0GFE778'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
