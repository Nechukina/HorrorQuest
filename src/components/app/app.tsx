import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import BookingPage from '../../pages/booking-page/booking-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import Page404 from '../../pages/page-404/page-404';
import PrivateRoute from '../private-route/private-route';
import QuestPage from '../../pages/quest-page/quest-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { checkAuthAction } from '../../store/api-actions';


function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => () => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.QuestInfo}
          element={<QuestPage />}
        />
        <Route
          path={AppRoute.Booking}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <BookingPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Reservation}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyQuestsPage />
            </PrivateRoute>
          }
        />
        <Route
          path='*'
          element={<Page404 />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Contacts}
          element={<ContactsPage />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
