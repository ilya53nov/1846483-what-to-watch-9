import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { films } from './mocks/films';
import { comments } from './mocks/comments';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        films={films}
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
