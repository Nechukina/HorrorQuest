import { Icon } from 'leaflet';

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


export enum APIRoute {
  Reservation = '/reservation',
  Canceling = '/reservation/:reservationId',
  Quests = '/quest',
  Quest = '/quest/:questId',
  Booking = '/quest/:id/booking',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
  }


export enum NameSpace {
  Quests = 'QUESTS',
  Quest = 'QUEST',
  Booking = 'BOOKING',
  Reservation = 'RESERVATION',
  User = 'USER',
  Notification = 'NOTIFICATION',
  Filter = 'FILTER'
}

export const ValidationPattern = {
  Email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  Password: /([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])/,
} as const;

export enum QuestLevel {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Any = 'any'
}

export enum QuestType {
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
  AllTypes = 'all-types'
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export const TypeFilter: Record<QuestType, string> = {
  [QuestType.AllTypes]: 'Все квесты',
  [QuestType.Adventures]: 'Приключения',
  [QuestType.Detective]: 'Детектив',
  [QuestType.Horror]: 'Ужасы',
  [QuestType.Mystic]: 'Мистика',
  [QuestType.SciFi]: 'Sci-Fi',
} as const;


export const LevelFilter: Record<QuestLevel, string> = {
  [QuestLevel.Any]: 'Любой',
  [QuestLevel.Easy]: 'Легкий',
  [QuestLevel.Medium]: 'Средний',
  [QuestLevel.Hard]: 'Сложный',
} as const;

export enum DateSlot {
  Today = 'today',
  Tomorrow = 'tomorrow'
}

export const SlotName: Record<string, string> = {
  [DateSlot.Today]: 'Сегодня',
  [DateSlot.Tomorrow]: 'Завтра'
} as const;

export enum ContactsLocation {
  lat = 59.968456,
  lng = 30.31759,
}

export const activeCustomIcon = new Icon({
  iconUrl: '/img/svg/pin-active.svg',
  iconSize: [23, 42],
  iconAnchor: [11.5, 42]

});

export const defaultCustomIcon = new Icon({
  iconUrl: '/img/svg/pin-default.svg',
  iconSize: [23, 42],
  iconAnchor: [11.5, 42]
});

export const BOOKING_ZOOM = 10;
export const CONTACTS_ZOOM = 10;


export enum MaxElementCountOnScreen {
  ToastError = 1,
}

export const STEP_BACK = -1;
