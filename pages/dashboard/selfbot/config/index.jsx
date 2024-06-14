import React from "react";

import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import SwipeableViews from "react-swipeable-views-v18";

import { MainDashboard } from "../../../../components/MainDashboard";
import { ConfigEditor } from "../../../../components/ConfigEditor";

import { useSelfbotConnected } from "../../../../hooks/useSelfbotConnected";

import { configFields } from "../../../../config/configFields";
import { classes } from "../../../../utils/classes";

import homeStyles from "../../../../styles/Home.module.css";
import pageStyles from "../../../../styles/Page.module.css";
import faqStyles from "../../../../styles/FAQ.module.css";

const configTabs = [
  {
    name: "Selfbot",
    component: <ConfigEditor fields={configFields.selfbot} />,
  },
  {
    name: "Notifications",
    component: <ConfigEditor fields={configFields.notifications} />,
  },
  {
    name: "Snipers",
    component: <ConfigEditor fields={configFields.snipers} />,
  },
  {
    name: "Webhooks",
    component: <ConfigEditor fields={configFields.webhooks} />,
  },
  {
    name: "Events",
    component: <ConfigEditor fields={configFields.events} />,
  },
  {
    name: "Activity",
    component: <ConfigEditor fields={configFields.activity} />,
  },
  {
    name: "UI",
    component: <ConfigEditor fields={configFields.ui} />,
  },
  {
    name: "Protections",
    component: <ConfigEditor fields={configFields.protections} />,
  },
  {
    name: "AFK",
    component: <ConfigEditor fields={configFields.afk} />,
  },
  {
    name: "Sharing",
    component: <ConfigEditor fields={configFields.sharing} />,
  },
];

function SelfbotConfig(props) {
  const [tabValue, setTabValue] = React.useState(0);
  const selfbotConnected = useSelfbotConnected();

  const titleClasses = classes([
    homeStyles.landingTitleGradient,
    faqStyles.faqTitle,
  ]);

  const handleTabChange = (_event, newValue) => {
    setTabValue(newValue);
  };

  const handleTabChangeIndex = (index) => {
    setTabValue(index);
  };

  if (!selfbotConnected) {
    return (
      <MainDashboard {...props}>
        <Box className={pageStyles.pageContainerVertical}>
          <Typography variant="h2" className={titleClasses}>
            Selfbot is not connected!
          </Typography>
          <Typography variant="body">
            Please start the selfbot on your computer to use this feature.
          </Typography>
        </Box>
      </MainDashboard>
    );
  }

  return (
    <MainDashboard {...props}>
      <Box sx={{ maxWidth: "100%", overflow: "hidden" }}>
        <Box sx={{ maxWidth: "min-content", width: "100%", margin: "0 auto" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", maxWidth: "100%" }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {configTabs.map((tab, index) => (
                <Tab key={index} label={tab.name} />
              ))}
            </Tabs>
          </Box>

          <SwipeableViews
            axis="x"
            index={tabValue}
            onChangeIndex={handleTabChangeIndex}
          >
            {configTabs.map((tab, index) => (
              <Box sx={{ p: 3 }} hidden={tabValue !== index} key={index}>
                {tab.component}
              </Box>
            ))}
          </SwipeableViews>
        </Box>
      </Box>
    </MainDashboard>
  );
}

export default SelfbotConfig;
