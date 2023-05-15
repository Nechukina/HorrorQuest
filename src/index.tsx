import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import browserHistory from './utils/browser-history';
import HistoryRouter from './components/history-router/history-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <App />
    </HistoryRouter>
  </React.StrictMode>,
);
