import React from "react";

import APIKeyTable from "./Tables/APIKeyTable";
import CreateAPIKeyModal from "./Modals/CreateAPIKeyModal";

const APIKeysTab = () => {
  return (
    <section className="bg-white py-4 px-4 space-y-4">
      <CreateAPIKeyModal />
      <APIKeyTable />
    </section>
  );
};

export default APIKeysTab;
