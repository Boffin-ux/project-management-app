import App from 'components/app/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';
import './styles/style.scss';

export const store = setupStore();

store.subscribe(() => {
  localStorage.setItem('pmAppToken', store.getState().auth.token);
  console.log('Token is LS updated');
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
