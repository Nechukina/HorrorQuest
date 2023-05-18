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


export enum MainLocation {
  latitude = 59.968456,
  longitude = 30.31759,
  zoom = 14,
}

export enum MaxElementCountOnScreen {
  ToastError = 1,
}
