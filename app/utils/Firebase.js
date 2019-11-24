import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyDNXFkYvWEfYdv3jH-KcHIdFjEvbgOM81s',
	authDomain: 'tenedores-22146.firebaseapp.com',
	databaseURL: 'https://tenedores-22146.firebaseio.com',
	projectId: 'tenedores-22146',
	storageBucket: 'tenedores-22146.appspot.com',
	messagingSenderId: '993417152955',
	appId: '1:993417152955:web:771caf33ab1acd34e79c9e',
	measurementId: 'G-VKPFN93H7F'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
