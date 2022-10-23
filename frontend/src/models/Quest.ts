/**
 * QuestModel
 */
export interface QuestModel {
  id: string;
  info: QuestInfoModel
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