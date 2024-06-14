import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import DescriptionIcon from "@mui/icons-material/Description";
import { DiscordIcon } from "../components/icons/Discord.jsx";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import SignUpIcon from "@mui/icons-material/PersonAdd";
import ConsoleIcon from "@mui/icons-material/Wysiwyg";
import GridViewIcon from "@mui/icons-material/GridView";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import GitHubIcon from "@mui/icons-material/GitHub";
import ConfigIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";

import { COMING_SOON, MAINTENANCE } from "./config.js";

function getNavButtons(user) {
  if (COMING_SOON || MAINTENANCE) return [];

  const navButtons = [
    {
      text: "Home",
      to: "/",
      icon: (props) => <HomeIcon {...props} />,
    },
    {
      text: "FAQ",
      to: "/faq",
      icon: (props) => <QuizIcon {...props} />,
    },
    {
      text: "Docs",
      to: "/docs",
      icon: (props) => <DescriptionIcon {...props} />,
    },
    {
      text: "Discord",
      to: "/discord",
      icon: (props) => <DiscordIcon {...props} />,
    },
  ];

  if (user.ready && user.loggedIn) {
    navButtons.push({
      text: "Dashboard",
      to: "/dashboard",
      icon: (props) => <DashboardIcon {...props} />,
    });
    navButtons.push({
      text: "Logout",
      to: "/logout",
      icon: (props) => <LogoutIcon {...props} />,
    });
  } else {
    navButtons.push({
      text: "Login",
      to: "/login",
      icon: (props) => <LoginIcon {...props} />,
    });
    navButtons.push({
      text: "Sign Up",
      to: "/signup",
      icon: (props) => <SignUpIcon {...props} />,
    });
  }

  return navButtons;
}

function getDashboardNavButtons(user) {
  if (COMING_SOON || MAINTENANCE) return [];

  const navButtons = {
    General: [
      {
        text: "Home",
        to: "/",
        icon: (props) => <HomeIcon {...props} />,
      },
      {
        text: "FAQ",
        to: "/faq",
        icon: (props) => <QuizIcon {...props} />,
      },
      {
        text: "Docs",
        to: "/docs",
        icon: (props) => <DescriptionIcon {...props} />,
      },
      {
        text: "Discord",
        to: "/discord",
        icon: (props) => <DiscordIcon {...props} />,
      },
      {
        text: "Dashboard",
        to: "/dashboard",
        icon: (props) => <GridViewIcon {...props} />,
      },
      {
        text: "Logout",
        to: "/logout",
        icon: (props) => <LogoutIcon {...props} />,
      },
    ],
    Dashboard: [
      {
        text: "Overview",
        to: "/dashboard",
        icon: (props) => <GridViewIcon {...props} />,
      },
    ],
    Selfbot: [
      {
        text: "Console",
        to: "/dashboard/selfbot/console",
        icon: (props) => <ConsoleIcon {...props} />,
      },
      {
        text: "Config",
        to: "/dashboard/selfbot/config",
        icon: (props) => <ConfigIcon {...props} />,
      },
      {
        text: "Hosting",
        to: "/dashboard/selfbot/hosting",
        icon: (props) => <StorageIcon {...props} />,
      },
    ],
  };

  if (user.ready && user.isStaff) {
    console.log(DataThresholdingIcon);
    navButtons.Admin = [
      {
        text: "Overview",
        to: "/dashboard/admin",
        icon: (props) => <GridViewIcon {...props} />,
      },
      {
        text: "Database",
        to: "/dashboard/admin/database",
        icon: (props) => <DataThresholdingIcon {...props} />,
      },
      {
        text: "Releases",
        to: "/dashboard/admin/releases",
        icon: (props) => <GitHubIcon {...props} />,
      },
    ];
  }

  return navButtons;
}

export { getNavButtons, getDashboardNavButtons };
