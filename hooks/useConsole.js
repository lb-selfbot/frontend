import { useState, useEffect } from "react";

import { wsData } from "../wsData/wsData";

function useConsole() {
  const [console, setConsole] = useState(wsData.console);

  useEffect(() => {
    const onChange = () => setConsole(wsData.console);

    wsData.addChangeListener(onChange);

    return () => wsData.removeChangeListener(onChange);
  }, []);

  return console;
}

export { useConsole };
