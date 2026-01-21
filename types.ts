
export interface UserProfile {
  uid: string;
  fullName: string;
  city: string;
  favoriteTeam: string;
  age: number;
  email: string;
  photoBase64?: string;
  isAdmin: boolean;
  score: number; // Cumulative score
  fcmToken?: string;
}

export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  date: string;
  time: string;
  championship: string;
  status: 'active' | 'finished' | 'canceled';
  homeResult?: number;
  awayResult?: number;
}

export interface Bet {
  id: string;
  userId: string;
  userName: string;
  gameId: string;
  homeScore: number;
  awayScore: number;
  amount: number;
  status: 'pending' | 'valid' | 'invalid';
  timestamp: any;
  pointsEarned?: number;
  ticketId?: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'game' | 'bet' | 'news' | 'system';
  timestamp: Date;
  read: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}
