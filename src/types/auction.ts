interface Bidder {
  accepted: boolean;
  userId: string;
  bid: number;
}

export interface AuctionType {
  bidTimeSec: number;
  fieldIndex: number;
  bidders: Bidder[];
  turnEnds: string;
  usersRefused: string[];
}
