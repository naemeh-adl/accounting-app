export interface Transaction {
    id: string;
    date: Date | null;
    description: string;
    AccountRef: string;
    Credit: number|null;
    Debit: number | null;
    Blance: number|null;
  }