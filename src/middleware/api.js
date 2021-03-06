export const GET = 'GET';
export const POST = 'POST';
export const DELETE = 'DELETE';
export const PUT = 'PUT';

export function api(type, endpoint, options) {
  return {
    apiRequest: true,
    type,
    endpoint,
    options
  };
}

export const apiMiddleware = client => store => next => action => {
  if (action == null) return next(action);
  if (action.payload == null) return next(action);
  if (!action.payload.apiRequest) return next(action);
  // Client function should return a Promise
  const { type, endpoint, options } = action.payload;
  let promise = client(type, endpoint, options);
  if (promise == null) {
    // Dispatch an Error!
    return store.dispatch(Object.assign({}, action, {
      error: true,
      payload: new Error('Client did not return a Promise object')
    }));
  }
  return store.dispatch(Object.assign({}, action, {
    payload: promise
  }));
};

export default apiMiddleware;
