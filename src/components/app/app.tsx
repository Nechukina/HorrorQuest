import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, Status } from '../../const';
import BookingPage from '../../pages/booking-page/booking-page';
import { checkAuthAction } from '../../store/api-actions';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import Page404 from '../../pages/page-404/page-404';
import PrivateRoute from '../private-route/private-route';
import QuestPage from '../../pages/quest-page/quest-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFetchStatus } from '../../store/user-process/user-process.selectors';
import Loader from '../loader/loader';


function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const fetchStatus = useAppSelector(getFetchStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (fetchStatus === (Status.Loading || Status.Idle)) {
    return <Loader />;
  }

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
            <PrivateRoute >
              <BookingPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Reservation}
          element={
            <PrivateRoute >
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
