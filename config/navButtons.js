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
      icon: (props) =>
        typeof HomeIcon === "function" && <HomeIcon {...props} />,
    },
    {
      text: "FAQ",
      to: "/faq",
      icon: (props) =>
        typeof QuizIcon === "function" && <QuizIcon {...props} />,
    },
    {
      text: "Docs",
      to: "/docs",
      icon: (props) =>
        typeof DescriptionIcon === "function" && <DescriptionIcon {...props} />,
    },
    {
      text: "Discord",
      to: "/discord",
      icon: (props) =>
        typeof DiscordIcon === "function" && <DiscordIcon {...props} />,
    },
  ];

  if (user.ready && user.loggedIn) {
    navButtons.push({
      text: "Dashboard",
      to: "/dashboard",
      icon: (props) =>
        typeof DashboardIcon === "function" && <DashboardIcon {...props} />,
    });
    navButtons.push({
      text: "Logout",
      to: "/logout",
      icon: (props) =>
        typeof LogoutIcon === "function" && <LogoutIcon {...props} />,
    });
  } else {
    navButtons.push({
      text: "Login",
      to: "/login",
      icon: (props) =>
        typeof Loginicon === "function" && <LoginIcon {...props} />,
    });
    navButtons.push({
      text: "Sign Up",
      to: "/signup",
      icon: (props) =>
        typeof SignUpIcon === "function" && <SignUpIcon {...props} />,
    });
  }

  return navButtons;
}

function getDashboardNavButtons(user) {
  if (COMING_SOON || MAINTENANCE) return [];

  const navButtons = {
    General: [
      { text: "Home", to: "/", icon: (props) => typeof HomeIcon === "function" &&<HomeIcon {...props} /> },
      { text: "FAQ", to: "/faq", icon: (props) => typeof QuizIcon === "function" &&<QuizIcon {...props} /> },
      {
        text: "Docs",
        to: "/docs",
        icon: (props) => typeof DescriptionIcon === "function" &&<DescriptionIcon {...props} />,
      },
      {
        text: "Discord",
        to: "/discord",
        icon: (props) => typeof DiscordIcon === "function" &&<DiscordIcon {...props} />,
      },
      {
        text: "Dashboard",
        to: "/dashboard",
        icon: (props) => typeof GridViewicon === "function" &&<GridViewIcon {...props} />,
      },
      {
        text: "Logout",
        to: "/logout",
        icon: (props) => typeof LogoutIcon === "function" &&<LogoutIcon {...props} />,
      },
    ],
    Dashboard: [
      {
        text: "Overview",
        to: "/dashboard",
        icon: (props) => typeof GridViewIcon === "function" &&<GridViewIcon {...props} />,
      },
    ],
    Selfbot: [
      {
        text: "Console",
        to: "/dashboard/selfbot/console",
        icon: (props) => typeof ConsoleIcon === "function" &&<ConsoleIcon {...props} />,
      },
      {
        text: "Config",
        to: "/dashboard/selfbot/config",
        icon: (props) => typeof ConfigIcon === "function" &&<ConfigIcon {...props} />,
      },
      {
        text: "Hosting",
        to: "/dashboard/selfbot/hosting",
        icon: (props) => typeof StorageIcon === "function" &&<StorageIcon {...props} />,
      },
    ],
  };

  if (user.ready && user.isStaff) {
    navButtons.Admin = [
      {
        text: "Overview",
        to: "/dashboard/admin",
        icon: (props) => typeof GridViewIcon === "function" &&<GridViewIcon {...props} />,
      },
      {
        text: "Database",
        to: "/dashboard/admin/database",
        icon: (props) => typeof DataThresholdingIcon === "function" &&<DataThresholdingIcon {...props} />,
      },
      {
        text: "Releases",
        to: "/dashboard/admin/releases",
        icon: (props) => typeof GitHubIcon === "function" &&<GitHubIcon {...props} />,
      },
    ];
  }

  return navButtons;
}

export { getNavButtons, getDashboardNavButtons };
