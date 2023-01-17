import { useState, useEffect } from "react";

import { wsData } from "../wsData/wsData";

function useConfig() {
  const [config, setConfig] = useState(wsData.config);

  useEffect(() => {
    const onChange = () => setConfig(wsData.config);

    wsData.addChangeListener(onChange);

    return () => wsData.removeChangeListener(onChange);
  }, []);

  return { config, setConfig };
}

export { useConfig };
