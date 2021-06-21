export interface Account {
    id: string;
    name: string;
    date: Date | null;
    description: string;
    type: string;
    status: string;
    userRef: string | null;
  }