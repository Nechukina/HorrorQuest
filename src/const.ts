export enum AppRoute {
  Main = '/',
  Login = '/login',
  Logout = '/logout',
  Quest = '/quest',
  QuestInfo = '/quest/:id',
  Booking = '/quest/:id/booking',
  Reservation = '/reservation',
  Contacts = '/contacts'
  }

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
  }
