// import t from 'tcomb-form-native';
// import inputTemplate from './templates/Input';
// import textAreaTemplate from './templates/TextArea';
// import { getUser } from '../auth/Auth';

// var Gender = t.enums({
// 	M: 'Male',
// 	F: 'Female'
// });

// export const AgregarReclamoStruct = t.struct({
// 	documento: t.String,
// 	ubicacion: t.String,
// 	descripcion: t.String,
// 	edificio: Gender
// });

// getEdificios = () => {
// 	getUser().then(res => {
// 		console.log(res);

// 	}).catch(err => {
// 		console.log(err);

// 	})
// }

// export const AgregarReclamoOptions = {
// 	fields: {
// 		documento: {
// 			template: inputTemplate,
// 			config: {
// 				placeholder: 'Nombre del Restaurante',
// 				iconType: 'material-community',
// 				iconName: 'silverware'
// 			}
// 		},
// 		ubicacion: {
// 			template: inputTemplate,
// 			config: {
// 				placeholder: 'Ciudad del Restaurante',
// 				iconType: 'material-community',
// 				iconName: 'city'
// 			}
// 		},
// 		descripcion: {
// 			template: textAreaTemplate,
// 			config: {
// 				placeholder: 'Descripcion del Restaurante',
// 				iconType: 'material-community',
// 				iconName: 'silverware'
// 			}
// 		},
// 		edificio: {
// 			config: {
// 				placeholder: 'Selecciona un edificio',
// 				iconType: 'material-community',
// 				iconName: 'silverware',
// 				options: {getEdificios()}
// 			}
// 		}
// 	}
// };
