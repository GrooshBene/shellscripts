// Session related actions come here
import { createAction } from 'redux-actions';
import { api, GET, POST, DELETE } from '../middleware/api.js';

export const FETCH = 'SESSION_FETCH';
export const LOGIN = 'SESSION_LOGIN';
export const LOGOUT = 'SESSION_LOGOUT';

export const fetch = createAction(FETCH,
  () => api(GET, '/session', {}));
export const login = createAction(LOGIN,
  credentials => api(POST, '/session', credentials));
export const logout = createAction(LOGOUT,
  () => api(DELETE, '/session', {}));

export function load() {
  return (dispatch, getState) => {
    const session = getState().session;
    if (!session.loaded) return dispatch(fetch());
    return Promise.resolve();
  };
}
