import React from "react";

import CreateWebhookModal from "./Modals/CreateWebhookModal";
import WebhookTable from "./Tables/WebhookTable";

const WebhooksTab = () => {
  return (
    <section className="bg-white py-4 px-4 space-y-4">
      <CreateWebhookModal />
      <WebhookTable />
    </section>
  );
};

export default WebhooksTab;
