import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import browserHistory from './utils/browser-history';
import HistoryRouter from './components/history-router/history-router';
import NotificationCard from './components/notification-card/notification-card';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer theme='colored'/>
        <NotificationCard />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
