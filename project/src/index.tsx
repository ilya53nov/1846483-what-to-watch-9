import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import ErrorMessage from './components/error-message/errorMessage';
import { checkAuthAction, fetchFilmAction, fetchFilmPromoAction } from './store/api-actions';

store.dispatch(fetchFilmAction());
store.dispatch(fetchFilmPromoAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorMessage />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
