import { QuestLevel, QuestType } from '../const';

export type Quest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevel;
  type: QuestType;
  peopleMinMax: [number];
}

export type Quests = Quest[];

export type QuestInfo = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevel;
  type: QuestInfo;
  peopleMinMax: [number];
  description: string;
  coverImg: string;
  coverImgWebp: string;
}
