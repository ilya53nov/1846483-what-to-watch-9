import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchFilmsAction, fetchFilmPromoAction } from './store/api-actions';
import ErrorMessage from './components/error-message/errorMessage';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

store.dispatch(fetchFilmsAction());
store.dispatch(fetchFilmPromoAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>

      <HistoryRouter history={browserHistory}>
        <ErrorMessage />
        <App />

      </HistoryRouter>


    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
