export interface Field {
  id: string;
  index: number;
  name: string;
  price: number;
  income: number[];
  group: string;
  specialField: boolean;
  line:
    | 'horizontal-top'
    | 'horizontal-bottom'
    | 'vertical-left'
    | 'vertical-right';
  ownedBy: null | string;
  players: any[];
  large: boolean;
  imageUrl: string;
  color: string;
  pledgePrice: number;
  branchPrice: number;
  redemptionPrice: number;
  isPledged: boolean;
  amountOfBranches: number;
  turnsToUnpledge: null | number;
  toPay: number;
  secret: boolean;
}
