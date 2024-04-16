"use client";

import React, { useState } from "react";

import CreateWebhookModal from "./Modals/CreateWebhookModal";
import WebhookTable from "./Tables/WebhookTable";

const WebhooksTab = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const refreshWebhooks = () => {
    setShouldRefresh(true);
  };

  return (
    <section className="bg-white py-4 px-4 space-y-4">
      <CreateWebhookModal onWebhookCreated={refreshWebhooks} />
      <WebhookTable shouldRefresh={shouldRefresh} />
    </section>
  );
};

export default WebhooksTab;
