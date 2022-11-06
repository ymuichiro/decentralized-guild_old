/**
 * QuestModel
 */
export interface QuestModel {
  id: string;
  info: QuestInfoModel;
}

/**
 * base information of quest
 */
export interface QuestInfoModel {
  title: string;
  description: string;
  reward: number;
  imagePath: string;
}

export enum QuestStatus {
  WANTED = 'WANTED',
  WORKING = 'WORKING',
  COMPLETED = 'COMPLETED',
}

export enum Evaluation {
  GOOD,
  BAD,
}