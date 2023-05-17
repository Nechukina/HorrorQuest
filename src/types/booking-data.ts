export type BookingQuest = {
  id: string;
  location: QuestLocation;
  slots: Slots;
};

export type BookingQuests = BookingQuest[];

export type Slot = {
  time: string;
  isAvailable: boolean;
};

export type Slots = Slot[];

export type QuestLocation = {
    address: string;
    coords: [number, number];
};
