"use client";

import React, { useState } from "react";
import CreateWhitelistModal from "./Modals/CreateWhitelistModal";
import WhitelistTable from "./Tables/WhitelistTable";

const WhitelistTab = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const refreshWhitelists = () => {
    setShouldRefresh(true);
  };

  return (
    <section className="bg-white py-4 px-4 space-y-4">
      <CreateWhitelistModal onWhitelistCreated={refreshWhitelists} />
      <WhitelistTable shouldRefresh={shouldRefresh} />
    </section>
  );
};

export default WhitelistTab;
