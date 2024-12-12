export interface MessageObjType {
  id?: string;
  text: string;
  chatId: string;
  userId?: number;
  sender?: { nickname?: string };
  updatedAt: string;
}
