export type Position = "QB" | "RB" | "WR" | "TE" | "OL" | "DL" | "LB" | "CB" | "S" | "K" | "P";

export interface Team {
  id: string;
  name: string;
  city: string;
  mascot: string;
  colors: { primary: string; secondary: string };
  image?: string;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  position: Position;
  age: number;
  experience: number;
  overall: number;
  college: string;
  trend: "up" | "down" | "steady";
  salaryM: number;
  note?: string;
}

export interface CoachNote {
  coach: string;
  role: string;
  text: string;
}

export interface BoxScore {
  opponent: string;
  teamScore: number;
  oppScore: number;
  passingYds: number;
  rushingYds: number;
  turnovers: number;
}
