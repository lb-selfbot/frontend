import { useState, useEffect } from "react";

import { api } from "../lbapi/lbapi";

function useFileManagerContent() {
  const [content, setContent] = useState({});
  const [error, setError] = useState(null);

  const reload = () => {
    api.ListHostingFiles().then((apiResponse) => {
      if (!apiResponse.success) {
        setError(apiResponse.json?.reason ?? "Unknown error");
        return;
      }

      setContent(apiResponse.json.content);
    });
  };

  useEffect(reload, []);

  return [content, error, reload];
}

export default useFileManagerContent;
