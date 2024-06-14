import React from "react";

import Image from "next/image";

import Typography from "@mui/material/Typography/Typography";
import Grid from "@mui/material/Grid/Grid";
import Box from "@mui/material/Box/Box";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import ComputerIcon from "@mui/icons-material/Computer";

import { sanitize } from "isomorphic-dompurify";

import { Material3Button } from "../../../../components/Material3Button";
import { MainDashboard } from "../../../../components/MainDashboard";
import { Card } from "../../../../components/Card";

import { useSelfbotConnected } from "../../../../hooks/useSelfbotConnected";
import { useConsole } from "../../../../hooks/useConsole";
import useStats from "../../../../hooks/useStats";
import useUser from "../../../../hooks/useUser";
import useWebSocket from "react-use-websocket";

import { millisecondsToTime } from "../../../../utils/millisecondsToTime";
import { classes } from "../../../../utils/classes";
import { WS_URL } from "../../../../config/config";

import homeStyles from "../../../../styles/Home.module.css";
import faqStyles from "../../../../styles/FAQ.module.css";
import styles from "../../../../styles/Console.module.css";

function getConsoleHTML(console) {
  var consoleHTML = sanitize(console);

  consoleHTML = consoleHTML.replace(
    '<div style="text-align:center;">',
    '<div style="display:inline-block;width:100%;text-align:center;">'
  );

  return consoleHTML;
}

function SelfbotConsole(props) {
  const selfbotConnected = useSelfbotConnected();
  const console = useConsole();
  const stats = useStats();
  const user = useUser();

  const { sendJsonMessage } = useWebSocket(WS_URL, { share: true });

  const consoleHTML = React.useMemo(() => getConsoleHTML(console), [console]);

  const onExitClick = () => sendJsonMessage({ op: "EXIT" });
  const onRestartClick = () => sendJsonMessage({ op: "RESTART" });

  const loginTime = millisecondsToTime(user.loginTime * 1000);

  let parsedLoginTime = `${loginTime.seconds ?? 0}s`;

  if (loginTime.minutes > 0) {
    parsedLoginTime = `${loginTime.minutes}m ${parsedLoginTime}`;
  }
  if (loginTime.hours > 0) {
    parsedLoginTime = `${loginTime.hours}h ${parsedLoginTime}`;
  }
  if (loginTime.days > 0) {
    parsedLoginTime = `${loginTime.days}d ${parsedLoginTime}`;
  }

  const titleClasses = classes([
    homeStyles.landingTitle,
    faqStyles.faqTitle,
    styles.cardTitle,
  ]);

  const consoleContainerClasses = classes([
    styles.consoleContainer,
    selfbotConnected && styles.selfbotConnected,
  ]);

  return (
    <MainDashboard {...props}>
      <Grid container justifyContent="center" spacing={3}>
        <Card.Container xs={12} sm={10} md={12} lg={10}>
          <Card.MuiCard className={styles.card}>
            <Typography variant="h2" className={titleClasses}>
              Console
            </Typography>

            <Box className={consoleContainerClasses}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Image
                  src="/assets/Banner.png"
                  width={650}
                  height={150}
                  alt="Banner"
                />
              </Box>

              <pre dangerouslySetInnerHTML={{ __html: consoleHTML }} />
            </Box>

            <Box
              display={selfbotConnected ? "flex" : "none"}
              className={styles.consoleActions}
            >
              <Material3Button
                variant="contained"
                className={styles.consoleButton}
                onClick={onExitClick}
              >
                Exit
              </Material3Button>

              <Material3Button
                variant="contained"
                className={styles.consoleButton}
                onClick={onRestartClick}
              >
                Restart
              </Material3Button>
            </Box>
          </Card.MuiCard>
        </Card.Container>

        <Grid item xs={12} sm={10} md={12} lg={10} margin="0 auto">
          <Grid container spacing={2}>
            <Card
              lg={4}
              title="Status"
              content={selfbotConnected ? "Connected" : "Disconnected"}
              icon={typeof ComputerIcon === "function" &&<ComputerIcon />}
            />

            <Card
              lg={4}
              title="Version"
              content={stats.version ?? "Loading"}
              icon={typeof DeviceHubIcon === "function" &&<DeviceHubIcon />}
            />

            <Card
              lg={4}
              title="Time Logged In"
              content={parsedLoginTime}
              icon={typeof AccessTimeIcon === "function" &&<AccessTimeIcon />}
            />
          </Grid>
        </Grid>
      </Grid>
    </MainDashboard>
  );
}

export default SelfbotConsole;
