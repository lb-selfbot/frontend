import { useState, useEffect } from "react";

import { wsData } from "../wsData/wsData";

function useSelfbotConnected() {
  const [selfbotConnected, setSelfbotConnected] = useState(
    wsData.selfbotConnected
  );

  useEffect(() => {
    const onChange = () => setSelfbotConnected(wsData.selfbotConnected);

    wsData.addChangeListener(onChange);

    return () => wsData.removeChangeListener(onChange);
  }, []);

  return selfbotConnected;
}

export { useSelfbotConnected };
