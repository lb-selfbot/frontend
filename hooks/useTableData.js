import { useState, useEffect } from "react";

import { api } from "../api/api";

const tableChangeListeners = {
  users: [],
  "online-users": [],
  keys: [],
  "credit-keys": [],
  orders: [],
  releases: [],
};

function useTableData(tableName) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const onTableChange = () => {
      api.GetTableData(tableName).then((apiResponse) => {
        if (!apiResponse.success) {
          return;
        }

        setTableData(apiResponse.json.data);
      });
    };

    onTableChange();

    tableChangeListeners[tableName].push(onTableChange);

    return () => {
      tableChangeListeners[tableName] = tableChangeListeners[tableName].filter(
        (f) => f !== onTableChange
      );
    };
  }, [tableName]);

  return tableData;
}

function handleTableChange(tableName) {
  tableChangeListeners[tableName].forEach((f) => f());
}

export { useTableData, handleTableChange };
