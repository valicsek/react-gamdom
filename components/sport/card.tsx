"use client";

import React from "react";
import { Team } from "@/interfaces/sport";
import { FaFootballBall, FaFlag } from "react-icons/fa";
import { betStore } from "@/stores/bet";

interface SportGameCardProps {
  sport: string;
  date: string;
  time: string;
  teams: Team[];
  odds: {
    team1: number;
    team2: number;
    draw: number;
  };
  onBetClick: (bet: string) => void;
}

const SportGameCard: React.FC<SportGameCardProps> = ({ sport, date, time, teams, odds, onBetClick }) => {
  const header = () => {
    return (
      <div className="flex items-center gap-2 p-2">
        <FaFootballBall className="text-white" />
        <span className="text-white font-medium">
          {sport} • {date} • {time}
        </span>
      </div>
    );
  };

  const body = () => {
    return (
      <div className="flex flex-col gap-3 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaFlag className="text-white" />
            <span className="text-white">{teams[0].name}</span>
          </div>
          <span className="text-white font-bold">{betStore.bets.filter((bet) => bet.teamId === teams[0].id).length}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaFlag className="text-white" />
            <span className="text-white">{teams[1].name}</span>
          </div>
          <span className="text-white font-bold">{betStore.bets.filter((bet) => bet.teamId === teams[1].id).length}</span>
        </div>
      </div>
    );
  };

  const footer = () => {
    return (
      <div className="flex rounded p-2">
        {[
          { label: "1", value: odds.team1 },
          { label: "X", value: odds.draw },
          { label: "2", value: odds.team2 },
        ].map(({ label, value }) => (
          <div
            data-testid="sport-card-item-bet"
            key={label}
            className="flex-1 flex flex-col items-center p-2  cursor-pointer bg-[var(--bg-main-elements)] hover:bg-[var(--primary-color)] hover:text-black"
            onClick={() => onBetClick(label)}
          >
            <span className="text-sm">{label}</span>
            <span className="font-bold">{value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div data-testid="sport-card-item" className="bg-[var(--bg-card)] rounded-lg overflow-hidden shadow-lg flex flex-col">
      {header()}
      {body()}
      {footer()}
    </div>
  );
};

export default SportGameCard;
