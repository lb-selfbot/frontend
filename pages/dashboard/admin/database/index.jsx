import React from "react";

import Typography from "@mui/material/Typography/Typography";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid/Grid";

import { MainDashboard } from "../../../../components/MainDashboard";
import { Loading } from "../../../../components/Loading";

import { useTableData } from "../../../../hooks/useTableData";
import useUser from "../../../../hooks/useUser";

import { classes } from "../../../../utils/classes";

import Router from "next/router";

import {
  usersColumns,
  onlineUsersColumns,
  keysColumns,
  ordersColumns,
  creditKeysColumns,
} from "../../../../config/tableColumns";

import homeStyles from "../../../../styles/Home.module.css";
import faqStyles from "../../../../styles/FAQ.module.css";

function AdminDatabase(props) {
  const usersData = useTableData("users");
  const onlineUsersData = useTableData("online-users");
  const keysData = useTableData("keys");
  const creditKeysData = useTableData("credit-keys");
  const ordersData = useTableData("orders");
  const user = useUser();

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
            Database
          </Typography>
        </Grid>

        {/* Users table */}

        <Grid item xs={12} marginLeft="10px">
          <Typography variant="h4" className={titleClasses}>
            Users
          </Typography>
        </Grid>

        <Grid item xs={12} height="500px">
          <DataGrid
            rows={usersData}
            columns={usersColumns}
            pkeySize={5}
            rowsPerPkeyOptions={[5]}
          />
        </Grid>

        {/* Online users table */}

        <Grid item xs={12} marginLeft="10px">
          <Typography variant="h4" className={titleClasses}>
            Online Users
          </Typography>
        </Grid>

        <Grid item xs={12} height="500px">
          <DataGrid
            rows={onlineUsersData}
            columns={onlineUsersColumns}
            pkeySize={5}
            rowsPerPkeyOptions={[5]}
          />
        </Grid>

        {/* Keys table */}

        <Grid item xs={12} marginLeft="10px">
          <Typography variant="h4" className={titleClasses}>
            Keys
          </Typography>
        </Grid>

        <Grid item xs={12} height="500px">
          <DataGrid
            rows={keysData}
            columns={keysColumns}
            pkeySize={5}
            rowsPerPkeyOptions={[5]}
          />
        </Grid>

        {/* Credit Keys table */}

        <Grid item xs={12} marginLeft="10px">
          <Typography variant="h4" className={titleClasses}>
            Credit Keys
          </Typography>
        </Grid>

        <Grid item xs={12} height="500px">
          <DataGrid
            rows={creditKeysData}
            columns={creditKeysColumns}
            pkeySize={5}
            rowsPerPkeyOptions={[5]}
          />
        </Grid>

        {/* Orders table */}

        <Grid item xs={12} marginLeft="10px">
          <Typography variant="h4" className={titleClasses}>
            Orders
          </Typography>
        </Grid>

        <Grid item xs={12} height="500px">
          <DataGrid
            rows={ordersData}
            columns={ordersColumns}
            pkeySize={5}
            rowsPerPkeyOptions={[5]}
          />
        </Grid>
      </Grid>
    </MainDashboard>
  );
}

export default AdminDatabase;
