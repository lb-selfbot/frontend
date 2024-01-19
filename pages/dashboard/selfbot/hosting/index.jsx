import React from "react";

import dynamic from "next/dynamic";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Portal from "@mui/material/Portal";

import { MainDashboard } from "../../../../components/MainDashboard";
import { Card } from "../../../../components/Card";

import { classes } from "../../../../utils/classes";

import homeStyles from "../../../../styles/Home.module.css";
import faqStyles from "../../../../styles/FAQ.module.css";

import {
  DeveloperBoard,
  Memory,
  ManageHistory,
  AccessTime,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

import { millisecondsToTime } from "../../../../utils/millisecondsToTime";
import useStats from "../../../../hooks/useStats";
import useUser from "../../../../hooks/useUser";
import { api } from "../../../../api/api";

import FileManager from "../../../../components/FileManager";

const SelfbotHostingModal = dynamic(
  () => import("../../../../components/modals/SelfbotHosting"),
  { ssr: false }
);
const HostingCreditModal = dynamic(
  () => import("../../../../components/modals/HostingCredit"),
  { ssr: false }
);

function SelfbotHosting(props) {
  const titleClasses = classes([
    homeStyles.landingTitleGradient,
    faqStyles.faqTitle,
  ]);

  const [hostingEnabled, setHostingEnabled] = React.useState(false);
  const [hostingModalOpen, setHostingModalOpen] = React.useState(false);
  const [creditModelOpen, setCreditModalOpen] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const stats = useStats();
  const user = useUser();

  React.useEffect(() => {
    if (!user.ready) {
      return;
    }

    setHostingEnabled(user.isHosting);
  }, [user.ready]);

  const hostingTime = millisecondsToTime(user.hostingCredit * 60 * 1000);

  let parsedHostingTime = `${hostingTime.minutes ?? 0}min`;
  if (hostingTime.hours > 0) {
    parsedHostingTime = `${hostingTime.hours}h ${parsedHostingTime}`;
  }
  if (hostingTime.days > 0) {
    parsedHostingTime = `${hostingTime.days}d ${parsedHostingTime}`;
  }

  if (user.hostingLifetime) {
    parsedHostingTime = "Lifetime";
  }

  const onHostingToggle = () => {
    if (!user.ready) {
      return;
    }
    
    if (user.key === "None") {
      enqueueSnackbar("You must have a license key to use hosting.", {
        variant: "error",
      });
      return;
    }

    if (hostingEnabled) {
      api.DisableHosting().then((res) => {
        if (res.success) {
          setHostingEnabled(false);

          enqueueSnackbar("Successfully disabled hosting.", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Failed to disable hosting.", { variant: "error" });
        }
      });
    } else {
      setHostingModalOpen(true);
    }
  };

  const onGetMoreCredits = () => {
    if (user.key === "None") {
      enqueueSnackbar("You must have a license key to use hosting.", {
        variant: "error",
      });
      return;
    }

    setCreditModalOpen(true);
  };

  return (
    <MainDashboard {...props}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={titleClasses}>
            Hosting
          </Typography>
        </Grid>
        {/* Hosting stats */}
        <Card
          title="Status"
          content={hostingEnabled ? "Enabled" : "Disabled"}
          icon={<DeveloperBoard />}
        >
          <Box style={{ marginLeft: 10, display: "inline" }}>
            <Button variant="outlined" size="small" onClick={onHostingToggle}>
              {hostingEnabled ? "Disable" : "Enable"}
            </Button>
          </Box>
        </Card>
        <Card title="Credit" content={parsedHostingTime} icon={<Memory />}>
          <Box style={{ marginLeft: 10, display: "inline" }}>
            <Button variant="outlined" size="small" onClick={onGetMoreCredits}>
              Get More
            </Button>
          </Box>
        </Card>
        <Card
          title="Hosting Server Status"
          content={stats.hosting_status ?? "Loading"}
          icon={<ManageHistory />}
        />
        <Card
          title="Hosted Bots"
          content={stats.hosting ?? "Loading"}
          icon={<AccessTime />}
        />
        <Grid item xs={12}>
          <Typography variant="h4" className={titleClasses}>
            File Manager
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FileManager />
        </Grid>
      </Grid>

      <Portal>
        <SelfbotHostingModal
          open={hostingModalOpen}
          setOpen={setHostingModalOpen}
          setHostingEnabled={setHostingEnabled}
        />

        <HostingCreditModal
          open={creditModelOpen}
          setOpen={setCreditModalOpen}
        />
      </Portal>
    </MainDashboard>
  );
}

export default SelfbotHosting;
