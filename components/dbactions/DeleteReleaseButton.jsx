import React from "react";

import { Material3Button } from "../Material3Button";

import { useSnackbar } from "notistack";

import { handleTableChange } from "../../hooks/useTableData";
import { api } from "../../lbapi/lbapi";

export function DeleteReleaseButton(props) {
  const { enqueueSnackbar } = useSnackbar();

  const { id } = props.gridCellParams.row;

  const onReleaseDeleteClick = async () => {
    const apiResponse = await api.DeleteRelease(id);

    if (apiResponse.success) {
      enqueueSnackbar("Successfully deleted release!", { variant: "success" });
      handleTableChange("releases");
    } else {
      enqueueSnackbar(
        apiResponse.json?.message ?? "An unknown error has occurred",
        { variant: "error" }
      );
    }
  };

  return (
    <Material3Button variant="contained" onClick={onReleaseDeleteClick}>
      Delete
    </Material3Button>
  );
}
