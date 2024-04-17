"use client";

import React, { useState } from "react";
import APIKeyTable from "./Tables/APIKeyTable";
import CreateAPIKeyModal from "./Modals/CreateAPIKeyModal";

const APIKeysTab = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const refreshApiKeys = () => {
    setShouldRefresh(true);
  };

  return (
    <section className="bg-white px-4 space-y-4">
      <CreateAPIKeyModal onApiKeyCreated={refreshApiKeys} />
      <APIKeyTable shouldRefresh={shouldRefresh} />
    </section>
  );
};

export default APIKeysTab;
