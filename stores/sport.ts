import { makeAutoObservable } from "mobx";
import { Sport } from "@/interfaces/sport";

class SportStore {
  selectedSport: Sport | null = null;
  sports: Sport[] = [
    {
      id: 1,
      sport: "Football",
      date: "2024-01-01",
      time: "12:00",
      teams: [
        { id: 1, name: "Barcelona" },
        { id: 2, name: "Real Madrid" },
      ],
      odds: { team1: 1.5, draw: 2.0, team2: 1.5 },
    },
    {
      id: 2,
      sport: "Football",
      date: "2024-01-04",
      time: "12:35",
      teams: [
        { id: 3, name: "Hungary" },
        { id: 4, name: "England" },
      ],
      odds: { team1: 1.5, draw: 2.0, team2: 1.5 },
    },
    {
      id: 3,
      sport: "Basketball",
      date: "2024-01-01",
      time: "12:00",
      teams: [
        { id: 5, name: "Hungary" },
        { id: 6, name: "England" },
      ],
      odds: { team1: 1.5, draw: 2.0, team2: 1.5 },
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addSport = (sport: Sport) => {
    this.sports.push(sport);
  };

  removeSport = (sport: Sport) => {
    this.sports = this.sports.filter((s) => s.sport !== sport.sport);
  };

  updateSport = (sport: Sport) => {
    this.sports = this.sports.map((s) => (s.sport === sport.sport ? sport : s));
  };

  setSelectedSport = (sport: Sport) => {
    this.selectedSport = sport;
  };
}

export const sportStore = new SportStore();
