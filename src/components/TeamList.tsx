import React from "react";

type Team = {
  id: number;
  name: string;
  score: number;
};

interface TeamListProps {
  teams: Team[];
  deleteTeam?: (id: number) => void;
}

const TeamList: React.FC<TeamListProps> = ({ teams, deleteTeam }) => {
  return (
    <ul className="team-list">
      {teams.map((team) => (
        <li className="team" key={team.id}>
          <span className="team-name">{team.name}</span> {team.score}
          {deleteTeam && (
            <button onClick={() => deleteTeam(team.id)}>Smazat</button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TeamList;
