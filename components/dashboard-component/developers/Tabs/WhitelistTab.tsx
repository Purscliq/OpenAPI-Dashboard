import React from "react";

import CreateWhitelistModal from "./Modals/CreateWhitelistModal";
import WhitelistTable from "./Tables/WhitelistTable";

const WhitelistTab = () => {
  return (
    <section className="bg-white py-4 px-4 space-y-4">
      <CreateWhitelistModal />
      <WhitelistTable />
    </section>
  );
};

export default WhitelistTab;
