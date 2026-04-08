import { Team, Player, CoachNote, BoxScore } from "./types";

export const MOCK_TEAMS: Team[] = [
  { id: "PHX", name: "Phoenix Fury", city: "Phoenix", mascot: "Fury", colors: { primary: "#CC2200", secondary: "#1A1A1A" }, image: "/img/PHX.jpg" },
  { id: "MIN", name: "Minneapolis Frost", city: "Minneapolis", mascot: "Frost", colors: { primary: "#A8D8EA", secondary: "#FFFFFF" }, image: "/img/MIN.jpg" },
  { id: "NSH", name: "Nashville Wolves", city: "Nashville", mascot: "Wolves", colors: { primary: "#5C4D8A", secondary: "#C0C0C0" }, image: "/img/NSH.jpg" },
  { id: "DET", name: "Detroit Iron", city: "Detroit", mascot: "Iron", colors: { primary: "#4A4A4A", secondary: "#1A1A1A" }, image: "/img/DET.jpg" },
];

export const MOCK_FRANCHISE = MOCK_TEAMS[0];

export const MOCK_PLAYERS: Player[] = [
  { id: "p01", firstName: "Marcus", lastName: "Jenkins", position: "QB", age: 24, experience: 2, overall: 82, college: "Alabama", trend: "up", salaryM: 4.2, note: "First in, last out." },
  { id: "p02", firstName: "Tyler", lastName: "Davis", position: "QB", age: 22, experience: 0, overall: 71, college: "Ohio State", trend: "up", salaryM: 0.9 },
  { id: "p03", firstName: "Andre", lastName: "Mitchell", position: "QB", age: 26, experience: 4, overall: 74, college: "LSU", trend: "down", salaryM: 6.1 },
  { id: "p04", firstName: "DeShawn", lastName: "Rivers", position: "RB", age: 25, experience: 3, overall: 86, college: "Georgia", trend: "steady", salaryM: 3.8 },
  { id: "p05", firstName: "Cole", lastName: "Bennett", position: "RB", age: 23, experience: 1, overall: 68, college: "Iowa", trend: "up", salaryM: 0.8 },
  { id: "p06", firstName: "Jaylen", lastName: "Brooks", position: "WR", age: 27, experience: 5, overall: 88, college: "Michigan", trend: "steady", salaryM: 9.4 },
  { id: "p07", firstName: "Isaiah", lastName: "Carter", position: "WR", age: 24, experience: 2, overall: 76, college: "Oregon", trend: "up", salaryM: 1.6 },
  { id: "p08", firstName: "Brandon", lastName: "Wells", position: "WR", age: 29, experience: 7, overall: 70, college: "USC", trend: "down", salaryM: 5.0 },
  { id: "p09", firstName: "Trent", lastName: "Holloway", position: "TE", age: 26, experience: 4, overall: 79, college: "Notre Dame", trend: "steady", salaryM: 3.2 },
  { id: "p10", firstName: "Marcus", lastName: "Reed", position: "OL", age: 28, experience: 6, overall: 84, college: "Penn State", trend: "steady", salaryM: 7.1 },
  { id: "p11", firstName: "Kwame", lastName: "Lawson", position: "DL", age: 25, experience: 3, overall: 81, college: "Florida", trend: "up", salaryM: 4.6 },
  { id: "p12", firstName: "Devonte", lastName: "Rodriguez", position: "LB", age: 23, experience: 1, overall: 73, college: "Texas", trend: "down", salaryM: 1.1, note: "Getting burned in coverage." },
  { id: "p13", firstName: "Marquise", lastName: "Hayes", position: "CB", age: 26, experience: 4, overall: 80, college: "Miami", trend: "steady", salaryM: 4.0 },
  { id: "p14", firstName: "Jordan", lastName: "Park", position: "S", age: 30, experience: 8, overall: 78, college: "Stanford", trend: "down", salaryM: 5.5 },
  { id: "p15", firstName: "Liam", lastName: "Sullivan", position: "K", age: 27, experience: 5, overall: 77, college: "BYU", trend: "steady", salaryM: 1.4 },
];

export const MOCK_COACH_NOTES: CoachNote[] = [
  { coach: "Mike Torres", role: "Head Coach", text: "Keep an eye on Jenkins. He's been the first one in, last one out. That kind of effort earns a spot on my team." },
  { coach: "Sarah Park", role: "Defensive Coordinator", text: "I love Rodriguez's athleticism, but he's getting burned in coverage drills. If he doesn't clean it up by Week 3, we have a problem." },
  { coach: "James Liu", role: "Offensive Coordinator", text: "Honestly? Davis is a better pure passer than Mitchell right now. I know Mitchell was our second-round pick, but the tape doesn't lie." },
];

export const MOCK_WEEK_REPORT = {
  title: "Week 1 — Training Camp",
  body: [
    "The pads came on Monday and the tone shifted immediately. Veterans set the pace through install, but the rookies refused to be background characters. Jenkins ran the two-minute drill twice without a stalled possession, and the secondary spent most of Wednesday chasing ghosts in the slot.",
    "Friday's joint practice exposed the offensive line's right side. Two false starts, one ugly sack, and a closed-door meeting between the position coach and the second unit. Expect rotations.",
  ],
  highlights: ["Jenkins: 14/16 in red zone reps", "Rivers broke off a 60-yard scramble", "OL allowed 3 pressures in team period"],
};

export const MOCK_BOX_SCORE: BoxScore = {
  opponent: "Detroit Iron",
  teamScore: 24,
  oppScore: 17,
  passingYds: 248,
  rushingYds: 112,
  turnovers: 1,
};
