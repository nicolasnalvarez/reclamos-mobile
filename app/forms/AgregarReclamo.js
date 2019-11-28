import t from 'tcomb-form-native';
import inputTemplate from './templates/Input';
import textAreaTemplate from './templates/TextArea';

export const AgregarReclamoStruct = t.struct({
	documento: t.String,
	ubicacion: t.String,
	idEdificio: t.Number,
	idUnidad: t.Number,
	descripcion: t.String
});

export const AgregarReclamoOptions = {
	fields: {
		documento: {
			template: inputTemplate,
			config: {
				placeholder: 'Ej: 35444333',
				label: 'Documento',
				iconType: 'material-community',
				iconName: 'account-card-details'
			}
		},
		ubicacion: {
			template: inputTemplate,
			config: {
				placeholder: 'Ej: Laundry',
				label: 'Zona del reclamo',
				iconType: 'material-community',
				iconName: 'wall'
			}
		},
		idEdificio: {
			template: inputTemplate,
			config: {
				placeholder: 'Ej: 5',
				label: 'ID del edificio',
				iconType: 'material-community',
				iconName: 'city'
			}
		},
		idUnidad: {
			template: inputTemplate,
			config: {
				placeholder: 'Ej: 6',
				label: 'ID de la unidad',
				iconType: 'material-community',
				iconName: 'home-city'
			}
		},
		descripcion: {
			template: textAreaTemplate,
			config: {
				placeholder:
					'Ej: El lavarropas que se encuentra en el Laundry esta roto',
				label: 'Descripcion',
				iconType: 'material-community',
				iconName: 'card-text'
			}
		}
	}
};
