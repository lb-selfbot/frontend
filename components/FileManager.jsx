import React from "react";

import {
  CardContent,
  Typography,
  Breadcrumbs,
  Link,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import { Folder, FileCopy } from "@mui/icons-material";

import { Card } from "./Card";

import useFileManagerContent from "../hooks/useFileManagerContent";

import { API_URL } from "../config/config";

import dashStyles from "../styles/Dashboard.module.css";
import { api } from "../api/api";

import { useSnackbar } from "notistack";

function Container({ children }) {
  return (
    <Card.MuiCard>
      <CardContent className={dashStyles.itemContainer}>{children}</CardContent>
    </Card.MuiCard>
  );
}

function Header({ currentPath, splitPath, setCurrentPath }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        underline="hover"
        sx={{ cursor: "pointer" }}
        color="inherit"
        onClick={() => setCurrentPath("/")}
      >
        LightningBot
      </Link>

      {splitPath.map((path, index) => {
        if (path === "") {
          return null;
        }

        const fullPath = currentPath
          .split("/")
          .slice(0, index + 1)
          .join("/");

        return (
          <Link
            key={fullPath}
            underline="hover"
            sx={{ cursor: "pointer" }}
            color={index === splitPath.length - 1 ? "text.primary" : "inherit"}
            onClick={() => setCurrentPath(fullPath)}
          >
            {path}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

function MenuListItem({ menu, children, ...props }) {
  const [anchorPos, setAnchorPos] = React.useState(null);

  const handleClick = (event) => {
    event.preventDefault();

    setAnchorPos({ top: event.clientY, left: event.clientX });
  };

  return (
    <>
      <ListItemButton onContextMenu={handleClick} {...props}>
        {children}
      </ListItemButton>

      <Menu
        anchorPosition={anchorPos}
        anchorReference="anchorPosition"
        open={Boolean(anchorPos)}
        onClose={() => setAnchorPos(null)}
      >
        {menu}
      </Menu>
    </>
  );
}

function FileList({ files, folders, currentPath, setCurrentPath, reload }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleFileDownload = (file) => {
    window.open(
      `${API_URL}/v3/selfbot/hosting/download-file?file_path=${currentPath}/${file}`
    );
  };

  const handleFileDelete = async (file) => {
    const apiResponse = await api.DeleteFile(`${currentPath}/${file}`);
    if (!apiResponse.success) {
      enqueueSnackbar(
        "Failed to delete file: " + apiResponse.json?.reason ??
          "Unknown reason",
        { variant: "error" }
      );
    }

    reload();
  };

  const handleFolderDelete = async (folder) => {
    const apiResponse = await api.DeleteFolder(`${currentPath}/${folder}`);
    if (!apiResponse.success) {
      enqueueSnackbar(
        "Failed to delete folder: " + apiResponse.json?.reason ??
          "Unknown reason",
        { variant: "error" }
      );
    }

    reload();
  };

  return (
    <List dense>
      {folders.map((folder) => (
        <MenuListItem
          key={folder}
          onClick={() =>
            setCurrentPath((currentPath + "/" + folder).replace("//", "/"))
          }
          menu={[
            <Typography variant="body" display="inline-block" mx={2} my={1}>
              Folder: {folder}
            </Typography>,

            <Divider />,

            <MenuItem onClick={() => handleFolderDelete(folder)}>
              Delete
            </MenuItem>,
          ]}
        >
          <ListItemAvatar>
            <Folder />
          </ListItemAvatar>

          <ListItemText primary={folder} />
        </MenuListItem>
      ))}

      {files.map((file) => (
        <MenuListItem
          key={file}
          onClick={() => handleFileDownload(file)}
          menu={[
            <Typography variant="body" display="inline-block" mx={2} my={1}>
              File: {file}
            </Typography>,

            <Divider />,

            <MenuItem onClick={() => handleFileDownload(file)}>
              Download
            </MenuItem>,
            <MenuItem onClick={() => handleFileDelete(file)}>Delete</MenuItem>,
          ]}
        >
          <ListItemAvatar>
            <FileCopy />
          </ListItemAvatar>

          <ListItemText primary={file} />
        </MenuListItem>
      ))}
    </List>
  );
}

function FileManager() {
  const [content, error, reload] = useFileManagerContent();
  const [currentPath, setCurrentPath] = React.useState("/");

  const currentContent = React.useMemo(() => {
    if (!content || !content[currentPath]) {
      return { files: [], folders: [] };
    }

    return content[currentPath];
  });

  const splitPath = currentPath.split("/");
  const files = currentContent["files"];
  const folders = currentContent["folders"];

  const sortedFiles = files.sort((a, b) => {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    } else if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }

    return 0;
  });

  const sortedFolders = folders.sort((a, b) => {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    } else if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }

    return 0;
  });

  if (error) {
    return (
      <Container>
        <Typography variant="body">{error}</Typography>
      </Container>
    );
  }

  return (
    <Card.MuiCard>
      <CardContent className={dashStyles.itemContainer}>
        <Header
          currentPath={currentPath}
          splitPath={splitPath}
          setCurrentPath={setCurrentPath}
        />

        <FileList
          files={sortedFiles}
          folders={sortedFolders}
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
          reload={reload}
        />
      </CardContent>
    </Card.MuiCard>
  );
}

export default FileManager;
