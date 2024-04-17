"use client";

import React, { useState } from "react";
import TeamTabTable from "../TeamTabTable";
import TeamTabModal from "../TeamTabModal";

const TeamTab = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const refreshTeam = () => {
    setShouldRefresh(true);
  };

  return (
    <section className="bg-white py-4 px-4 space-y-4">
      <TeamTabModal onTeamMemberAdded={refreshTeam} />
      <TeamTabTable shouldRefresh={shouldRefresh} />
    </section>
  );
};

export default TeamTab;
