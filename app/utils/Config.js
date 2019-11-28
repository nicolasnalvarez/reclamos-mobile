const SERVER_URL = 'http://172.168.0.17:8080';
//const SERVER_URL = 'http://192.168.0.172:8080';
const REGISTER_PATH = SERVER_URL + '/auth/register';
const LOGIN_PATH = SERVER_URL + '/auth/login';
const MIS_RECLAMOS_PATH = SERVER_URL + '/reclamos/all';
const GET_RECLAMO_PATH = SERVER_URL + '/reclamos';
const GENERAR_RECLAMO_PATH = SERVER_URL + '/reclamos';

export default {
	REGISTER_PATH,
	LOGIN_PATH,
	MIS_RECLAMOS_PATH,
	GET_RECLAMO_PATH,
	GENERAR_RECLAMO_PATH
};
