export interface Cart {
  sessionType: string;
  startTime: string;
  endTime: string;
  trainer: string;
  duration: number;
  price: number;
}

export interface Trainer {
  id: string;
  name: string;
  price?: number;
};

export interface Session {
  id: string;
  type: string;
  trainers: Trainer[];
}

export interface Booking {
  id: string;
  session: Session;
  trainer: Trainer;
  startTime: string;
  duration: number;
  price: number;
}