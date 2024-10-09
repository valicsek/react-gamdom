import { useEffect, useState } from "react";
import { betStore } from "@/stores/bet";
import { Team } from "@/interfaces/sport";
import { sportStore } from "@/stores/sport";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BetModal: React.FC<BetModalProps> = ({ isOpen, onClose }) => {
  const [betAmount, setBetAmount] = useState<number>(0);
  const [betTeam, setBetTeam] = useState<number>(-1);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    if (sportStore.selectedSport) setTeams(sportStore.selectedSport.teams);
  }, [sportStore.selectedSport]);

  const onPlaceBet = () => {
    if (betAmount <= 0) return;

    betStore.addBet({
      teamId: betTeam,
      id: Date.now(),
      amount: betAmount,
      createdAt: new Date(),
    });

    setBetAmount(0);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Betting Modal">
      <Input
        type="select"
        options={teams.map((team) => ({ label: team.name, value: team.id }))}
        placeholder="Select team"
        value={betTeam}
        onChange={(e) => setBetTeam(Number(e.target.value))}
      />
      <Input type="number" placeholder="Bet amount" prefix="$" value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))} />
      <div slot="footer" className="flex flex-row gap-4">
        <Button className="w-full" variant="primary" onClick={onPlaceBet}>
          Place Bet
        </Button>
        <Button className="w-full" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default BetModal;
