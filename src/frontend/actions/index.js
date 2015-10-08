import 'whatwg-fetch'; //polyfill
import { RECEIVED_SHOUTS } from '../constants';

export function fetchShouts() {
	return dispatch => {
		fetch('/api')
			.then(resp => resp.json())
			.then(json => dispatch({
				type: RECEIVED_SHOUTS,
				shouts: json.shouts
		}));
	}
}
