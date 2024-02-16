import React from "react";

import CreateAPIKeyTable from "./Tables/CreateAPIKeyTable";
import CreateAPIKeyModal from "./Modals/CreateAPIKeyModal";

const APIKeysTab = () => {
  return (
    <section className="bg-white py-4 px-4 space-y-4">
      <CreateAPIKeyModal />
      <CreateAPIKeyTable />
    </section>
  );
};

export default APIKeysTab;
