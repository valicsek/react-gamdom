"use client";

import React, { memo } from "react";
import { observer } from "mobx-react-lite";
import { Team } from "@/interfaces";
import { FaFootballBall, FaFlag } from "react-icons/fa";
import { betStore } from "@/stores/bet";

interface SportGameCardProps {
  id: number;
  sport: string;
  date: string;
  time: string;
  teams: [Team, Team];
  odds: {
    team1: number;
    team2: number;
    draw: number;
  };
  onBetClick: (bet: string) => void;
}

const BetCount = observer(({ gameId, teamId }: { gameId: number; teamId: number }) => <span className="text-white font-bold">{betStore.getBetsCountForGame(gameId, teamId)}</span>);

const SportGameCard: React.FC<SportGameCardProps> = ({ id, sport, date, time, teams, odds, onBetClick }) => {
  const header = (
    <div className="flex items-center gap-2 p-2">
      <FaFootballBall className="text-white" />
      <span className="text-white font-medium">
        {sport} • {date} • {time}
      </span>
    </div>
  );

  const body = (
    <div className="flex flex-col gap-3 p-2">
      {teams.map((team) => (
        <div key={team.id} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaFlag className="text-white" />
            <span className="text-white">{team.name}</span>
          </div>
          <BetCount gameId={id} teamId={team.id} />
        </div>
      ))}
    </div>
  );

  const footer = (
    <div className="flex rounded p-2">
      {[
        { label: "1", value: odds.team1 },
        // { label: "X", value: odds.draw },
        { label: "2", value: odds.team2 },
      ].map(({ label, value }) => (
        <div
          data-testid="sport-card-item-bet"
          key={label}
          className="flex-1 flex flex-col items-center p-2 cursor-pointer bg-[var(--bg-main-elements)] hover:bg-[var(--primary-color)] hover:text-black"
          onClick={() => onBetClick(label)}
        >
          <span className="text-sm">{label}</span>
          <span className="font-bold">{value.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div data-testid="sport-card-item" className="bg-[var(--bg-card)] rounded-lg overflow-hidden shadow-lg flex flex-col">
      {header}
      {body}
      {footer}
    </div>
  );
};

export default memo(SportGameCard);
