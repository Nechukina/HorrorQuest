import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './utils/browser-history';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store/store';
import NotificationCard from './components/notification-card/notification-card';
import { MaxElementCountOnScreen } from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer limit={MaxElementCountOnScreen.ToastError} />
        <NotificationCard />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
