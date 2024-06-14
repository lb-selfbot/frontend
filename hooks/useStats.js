import { useState, useEffect } from "react";

import { api } from "../lbapi/lbapi";

function useStats(cache = 60) {
  const [stats, setStats] = useState(api.stats);

  useEffect(() => {
    api.GetStats().then((newStats) => {
      setStats(newStats);
    });

    const onStatsChange = (newStats) => {
      setStats(newStats);
    };

    api.onStatsChange.push(onStatsChange);

    return () => {
      api.onStatsChange = api.onStatsChange.filter((f) => f !== onStatsChange);
    };
  }, []);

  return stats;
}

export default useStats;
