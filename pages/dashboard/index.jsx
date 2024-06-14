import React from "react";

import Typography from "@mui/material/Typography/Typography";
import Portal from "@mui/material/Portal";
import Grid from "@mui/material/Grid/Grid";

import StorageIcon from "@mui/icons-material/Storage";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import KeyIcon from "@mui/icons-material/Key";

import { MainDashboard } from "../../components/MainDashboard";
import { RedeemKey } from "../../components/cards/RedeemKey";
import { Card } from "../../components/Card";

import useStats from "../../hooks/useStats";
import useUser from "../../hooks/useUser";

import { classes } from "../../utils/classes";

import homeStyles from "../../styles/Home.module.css";
import faqStyles from "../../styles/FAQ.module.css";
import { ChangePassword } from "../../components/cards/ChangePassword";
import { SetEmail } from "../../components/cards/SetEmail";
import { Download } from "../../components/cards/Download";

function Dashboard(props) {
  const [verifyPasswordDialogOpen, setVerifyPasswordDialogOpen] =
    React.useState(false);

  const [redeemKeyDialogOpen, setRedeemKeyDialogOpen] = React.useState(false);
  const [buyKeyDialogOpen, setBuyKeyDialogOpen] = React.useState(false);

  const [email, setEmail] = React.useState("");

  const stats = useStats();
  const user = useUser();

  React.useEffect(() => {
    if (!user.email) {
      return;
    }

    setEmail(user.email);
  }, [user.email]);

  const toggleRedeemKeyDialog = () => {
    setRedeemKeyDialogOpen(!redeemKeyDialogOpen);
  };

  const toggleBuyKeyDialog = () => {
    setBuyKeyDialogOpen(!buyKeyDialogOpen);
  };

  const toggleVerifyPasswordDialog = () => {
    setVerifyPasswordDialogOpen(!verifyPasswordDialogOpen);
  };

  const titleClasses = classes([
    homeStyles.landingTitleGradient,
    faqStyles.faqTitle,
  ]);

  return (
    <MainDashboard {...props}>
      <Grid container spacing={2}>
        {/* Overview - Stats cards */}

        <Grid item xs={12}>
          <Typography variant="h4" className={titleClasses}>
            Overview
          </Typography>
        </Grid>

        <Card
          title="Auth"
          content={stats.auth ?? "Loading"}
          icon={typeof StorageIcon === "function" && <StorageIcon />}
        />
        <Card
          title="Version"
          content={stats.version ?? "Loading"}
          icon={typeof AddIcon === "function" && <AddIcon />}
        />
        <Card
          title="Users"
          content={stats.users ?? "Loading"}
          icon={typeof PeopleIcon === "function" && <PeopleIcon />}
        />
        <Card
          title="Logins"
          content={stats.logins ?? "Loading"}
          icon={typeof LoginIcon === "function" && <LoginIcon />}
        />

        {/* Overview - User data cards */}

        <Grid item xs={12} mt={1}>
          <Typography variant="h4" className={titleClasses}>
            Your Account
          </Typography>
        </Grid>

        <Card
          title="Username"
          content={user.username ?? "Loading"}
          icon={typeof PersonIcon === "function" && <PersonIcon />}
        />
        <Card
          title="Account Type"
          content={user.accountType ?? "Loading"}
          icon={typeof FingerprintIcon === "function" && <FingerprintIcon />}
        />
        <Card
          title="Key"
          content={user.key ?? "Loading"}
          icon={typeof KeyIcon === "function" && <KeyIcon />}
        />
        <Card
          title="Logins"
          content={user.logins ?? "Loading"}
          icon={typeof LoginIcon === "function" && <LoginIcon />}
        />

        <Card.Container xs={12} sm={6} lg={6}>
          <RedeemKey
            openRedeemKeyDialog={toggleRedeemKeyDialog}
            openBuyKeyDialog={toggleBuyKeyDialog}
          />

          <SetEmail
            openVerifyPasswordDialog={toggleVerifyPasswordDialog}
            email={email}
            setEmail={setEmail}
          />
        </Card.Container>

        <Card.Container xs={12} sm={6} lg={6}>
          <ChangePassword />
        </Card.Container>

        <Download />
      </Grid>

      <Portal>
        <RedeemKey.RedeemKeyDialog
          open={redeemKeyDialogOpen}
          onClose={toggleRedeemKeyDialog}
        />
        <RedeemKey.BuyKeyDialog
          open={buyKeyDialogOpen}
          onClose={toggleBuyKeyDialog}
        />

        <SetEmail.Dialog
          open={verifyPasswordDialogOpen}
          onClose={toggleVerifyPasswordDialog}
          email={email}
        />
      </Portal>
    </MainDashboard>
  );
}

export default Dashboard;
