interface Bidder {
  accepted: boolean;
  userId: string;
  bid: number;
}

export interface AuctionType {
  fieldIndex: number;
  bidders: Bidder[];
  turnEnds: string;
  usersRefused: string[];
}
