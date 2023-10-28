import React from "react";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import {
  DeveloperBoard,
  Memory,
  ManageHistory,
  AccessTime,
  Storage,
  Add,
  People,
  Login,
} from "@mui/icons-material";

import { Material3Button } from "../../../components/Material3Button";
import { MainDashboard } from "../../../components/MainDashboard";
import { Loading } from "../../../components/Loading";
import { Card } from "../../../components/Card";

import useStats from "../../../hooks/useStats";
import useUser from "../../../hooks/useUser";

import { classes } from "../../../utils/classes";
import { api } from "../../../api/api";

import dashStyles from "../../../styles/Dashboard.module.css";
import loginStyles from "../../../styles/Login.module.css";
import homeStyles from "../../../styles/Home.module.css";
import faqStyles from "../../../styles/FAQ.module.css";
import Router from "next/router";

function AdminDashboard(props) {
  const [key, setKey] = React.useState("");
  const [creditKey, setCreditKey] = React.useState("");
  const [creditAmount, setCreditAmount] = React.useState(31 * 24 * 60);
  const stats = useStats();
  const user = useUser();

  // reload stats every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      api.GetStats(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [stats]);

  const onCreateKeyClick = async () => {
    const apiResponse = await api.CreateKey();
    setKey(apiResponse.json.key);
  };

  const onCreateCreditKeyClick = async () => {
    const apiResponse = await api.CreateCreditKey(creditAmount);
    setCreditKey(apiResponse.json.key);
  };

  const handleCreditAmountChange = (event) => {
    setCreditAmount(event.target.value);
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
            Admin Overview
          </Typography>
        </Grid>

        {/* Admin stats */}
        <Card
          title="CPU Usage"
          content={stats.admin?.cpu ?? "Loading"}
          icon={<DeveloperBoard />}
        />
        <Card
          title="RAM Usage"
          content={stats.admin?.ram ?? "Loading"}
          icon={<Memory />}
        />
        <Card
          title="Requests per minute"
          content={stats.admin?.rpm ?? "Loading"}
          icon={<ManageHistory />}
        />
        <Card
          title="System Uptime"
          content={stats.admin?.uptime ?? "Loading"}
          icon={<AccessTime />}
        />

        {/* Regular stats */}
        <Card
          title="Auth"
          content={stats.auth ?? "Loading"}
          icon={<Storage />}
        />
        <Card
          title="Version"
          content={stats.version ?? "Loading"}
          icon={<Add />}
        />
        <Card
          title="Users"
          content={stats.users ?? "Loading"}
          icon={<People />}
        />
        <Card
          title="Logins"
          content={stats.logins ?? "Loading"}
          icon={<Login />}
        />

        <Card.Container xs={12} sm={12} lg={6}>
          <Card.MuiCard sx={{ marginTop: 2 }}>
            <CardContent className={dashStyles.itemContainer}>
              <Typography variant="h4" className={dashStyles.itemTitle}>
                Key Creator
              </Typography>

              <TextField
                variant="filled"
                label="Key"
                value={key}
                className={loginStyles.input}
              />

              <Material3Button variant="contained" onClick={onCreateKeyClick}>
                Create Key
              </Material3Button>
            </CardContent>
          </Card.MuiCard>
        </Card.Container>

        <Card.Container xs={12} sm={12} lg={6}>
          <Card.MuiCard sx={{ marginTop: 2 }}>
            <CardContent className={dashStyles.itemContainer}>
              <Typography variant="h4" className={dashStyles.itemTitle}>
                Credit Key Creator
              </Typography>

              <Box sx={{ display: "flex" }}>
                <FormControl sx={{ flex: 1, mr: 1 }}>
                  <InputLabel id="demo-simple-select-label">
                    Credit Amount
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={creditAmount}
                    label="Credit Amount"
                    onChange={handleCreditAmountChange}
                  >
                    <MenuItem value={31 * 24 * 60}>1 Month</MenuItem>
                    <MenuItem value={93 * 24 * 60}>3 Months</MenuItem>
                    <MenuItem value={186 * 24 * 60}>6 Months</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  variant="filled"
                  label="Credit Key"
                  value={creditKey}
                  className={loginStyles.input}
                  sx={{ flex: 4, ml: 1 }}
                />
              </Box>

              <Material3Button
                variant="contained"
                onClick={onCreateCreditKeyClick}
              >
                Create Credit Key
              </Material3Button>
            </CardContent>
          </Card.MuiCard>
        </Card.Container>
      </Grid>
    </MainDashboard>
  );
  /*
   */
}

export default AdminDashboard;
