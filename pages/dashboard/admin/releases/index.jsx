import React from "react";

import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField/TextField";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid/Grid";

import { Material3Button } from "../../../../components/Material3Button";
import { MainDashboard } from "../../../../components/MainDashboard";
import { Loading } from "../../../../components/Loading";
import { Card } from "../../../../components/Card";

import { useTableData } from "../../../../hooks/useTableData";
import useUser from "../../../../hooks/useUser";
import { useSnackbar } from "notistack";

import { releasesColumns } from "../../../../config/tableColumns";
import { classes } from "../../../../utils/classes";
import { api } from "../../../../lbapi/lbapi";

import Router from "next/router";

import dashStyles from "../../../../styles/Dashboard.module.css";
import loginStyles from "../../../../styles/Login.module.css";
import homeStyles from "../../../../styles/Home.module.css";
import faqStyles from "../../../../styles/FAQ.module.css";

function AdminReleases(props) {
  const [branch, setBranch] = React.useState("");
  const [version, setVersion] = React.useState("");
  const [changelog, setChangelog] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const releasesData = useTableData("releases");
  const user = useUser();

  const onBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const onVersionChange = (event) => {
    setVersion(event.target.value);
  };

  const onChangelogChange = (event) => {
    setChangelog(event.target.value);
  };

  const onCreateReleaseClick = async () => {
    if (branch === "" || version === "" || changelog === "") {
      enqueueSnackbar("Please fill out all fields", { variant: "error" });
      return;
    }

    const apiResponse = await api.CreateRelease(branch, version, changelog);
    if (apiResponse.success) {
      enqueueSnackbar("Release created successfully!", { variant: "success" });
      setBranch("");
      setVersion("");
      setChangelog("");
    } else {
      enqueueSnackbar(
        apiResponse.json?.message ?? "An unknown error has occurred",
        { variant: "error" }
      );
    }
  };

  const titleClasses = classes([
    homeStyles.landingTitleGradient,
    faqStyles.faqTitle,
  ]);

  const loading = (
    <MainDashboard {...props}>
      <Loading />
    </MainDashboard>
  );

  if (!user.ready) {
    return loading;
  }

  if (!user.isStaff) {
    Router.push("/dashboard?message=Forbidden");

    return loading;
  }

  return (
    <MainDashboard {...props}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={titleClasses}>
            Releases
          </Typography>
        </Grid>

        <Grid item xs={12} height="500px">
          <DataGrid
            rows={releasesData}
            columns={releasesColumns}
            pkeySize={5}
            rowsPerPkeyOptions={[5]}
          />
        </Grid>

        {/* Release creator */}

        <Card.Container xs={12} sm={12} lg={6}>
          <Card.MuiCard sx={{ marginTop: 2 }}>
            <CardContent className={dashStyles.itemContainer}>
              <Typography variant="h4" className={dashStyles.itemTitle}>
                Release Creator
              </Typography>

              <TextField
                variant="filled"
                label="Branch"
                value={branch}
                onChange={onBranchChange}
                className={loginStyles.input}
              />

              <TextField
                variant="filled"
                label="Version"
                value={version}
                onChange={onVersionChange}
                className={loginStyles.input}
              />

              <TextField
                variant="filled"
                label="Changelog"
                value={changelog}
                onChange={onChangelogChange}
                multiline
                className={loginStyles.input}
              />

              <Material3Button
                variant="contained"
                onClick={onCreateReleaseClick}
              >
                Create Release
              </Material3Button>
            </CardContent>
          </Card.MuiCard>
        </Card.Container>
      </Grid>
    </MainDashboard>
  );
}

export default AdminReleases;
