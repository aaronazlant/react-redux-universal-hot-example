import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';

export default function createApiClientStore(client, data) {
  const middleware = createMiddleware(client);
  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { devTools, persistState } = require('redux-devtools');
    finalCreateStore = compose(
      applyMiddleware(middleware),
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(
      createStore
    );
  } else {
    finalCreateStore = applyMiddleware(middleware)(createStore);
  }

  const reducer = combineReducers(require('../reducers'));
  const store = finalCreateStore(reducer, data);
  store.client = client;

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(combineReducers(require('../reducers')));
    });
  }

  return store;
}
