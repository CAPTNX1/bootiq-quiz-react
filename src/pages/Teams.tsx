import React, { useEffect, useState } from "react";
import TeamList from "../components/TeamList";

type Team = {
  id: number;
  name: string;
  score: number;
};

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState("");
  const [isInitialized, setIsInitialized] = useState(false); // Flag to track initialization

  // Load teams from localStorage when the component mounts
  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    }
    setIsInitialized(true); // Mark initialization as complete
  }, []);

  // Save teams to localStorage whenever `teams` changes, but only after initialization
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("teams", JSON.stringify(teams));
    }
  }, [teams, isInitialized]);

  const addTeam = () => {
    if (teamName.trim() === "") return;
    const newTeam: Team = {
      id: Date.now(),
      name: teamName,
      score: 0,
    };
    setTeams((prevTeams) => [...prevTeams, newTeam]);
    setTeamName("");
  };

  const deleteTeam = (id: number) => {
    setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
  };

  return (
    <div className="teams-wrap">
      <h1>Team Management</h1>
      <div className="flex">
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
        />
        <button onClick={addTeam}>Add Team</button>
      </div>

      {/* Pass teams and deleteTeam to TeamList */}
      <TeamList teams={teams} deleteTeam={deleteTeam} />
    </div>
  );
};

export default Teams;
