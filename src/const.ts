export enum AppRoute {
  Main = '/',
  Login = '/v1/escape-room/login',
  Logout = '/v1/escape-room/logout',
  Quest = '/v1/escape-room/quest',
  QuestInfo = '/v1/escape-room/quest/:id',
  Booking = '/v1/escape-room/quest/:id/booking',
  Reservation = '/v1/escape-room/reservation',
  Contacts = '/v1/escape-room/contacts'
  }

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
  }

export enum StatusCodes {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
}

export enum NameSpace {
  Quests = 'QUESTS',
  Booking = 'BOOKING',
  Reservation = 'RESERVATION',
  User = 'USER',
}

export const ValidationPattern = {
  Email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  Password: /([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])/,
} as const;

