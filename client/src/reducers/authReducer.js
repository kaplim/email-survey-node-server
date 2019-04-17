import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {  // null - awaiting user status
	
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;

		default:
			return state;
	}
}