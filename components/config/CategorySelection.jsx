import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";

import { Material3Button } from "../Material3Button";
import { TextFieldTooltip } from "../TextFieldTooltip";

import { useModal } from "mui-modal-provider";
import { useConfig } from "../../hooks/useConfig";

import { categoriesList } from "../../config/categories";
import { wsData } from "../../wsData/wsData";

import dashStyles from "../../styles/Dashboard.module.css";

function CategoryChip(props) {
  let { category, categories, set, onDelete, onConfigUpdate } = props;

  const onChipDelete = () => {
    categories = categories.filter((s) => s !== category);

    onDelete(categories);

    wsData.setConfig(set(wsData.config, categories));
    onConfigUpdate();
  };

  return <Chip label={category} sx={{ margin: 1 }} onDelete={onChipDelete} />;
}

function CategorySelectionModal({ name, get, set, onConfigUpdate }) {
  const [categoryAddValue, setCategoryAddValue] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(true);

  const { config } = useConfig();
  const [categories, setCategories] = React.useState(get(config));

  const closeDialog = () => setDialogOpen(false);

  const onCategoryAddValueChange = (e) => setCategoryAddValue(e.target.value);

  const onCategoryAdd = (event) => {
    event.preventDefault();

    if (!categoriesList.includes(categoryAddValue)) return;

    var categories = get(wsData.config);

    if (categories.includes(categoryAddValue)) return;

    categories.push(categoryAddValue);

    wsData.setConfig(set(wsData.config, categories));
    onConfigUpdate();

    setCategories(categories);
    setCategoryAddValue("");
  };

  const inputAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={onCategoryAdd}>
        <AddIcon />
      </IconButton>
    </InputAdornment>
  );

  const categoryChips = categories.map((category) => (
    <CategoryChip
      category={category}
      categories={categories}
      set={set}
      onDelete={(categories) => setCategories(categories)}
      onConfigUpdate={onConfigUpdate}
      key={category}
    />
  ));

  const labelId = `${name}-label`;

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
      <DialogTitle>{name}</DialogTitle>

      <DialogContent className={dashStyles.itemContainer}>
        <Typography variant="h6" p={1}>
          Categories
        </Typography>

        <Box flexWrap="wrap" mb={1}>
          {categoryChips}
        </Box>

        <FormControl fullWidth>
          <InputLabel id={labelId}>{name}</InputLabel>
          <Select
            labelId={labelId}
            value={categoryAddValue}
            label={name}
            onChange={onCategoryAddValueChange}
            endAdornment={inputAdornment}
          >
            {categoriesList.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Material3Button onClick={closeDialog}>Close</Material3Button>
      </DialogActions>
    </Dialog>
  );
}

function CategorySelection(props) {
  const [modal, setModal] = React.useState(null);
  const { showModal } = useModal();
  const { config } = useConfig();

  const { name, info, get, set, onConfigUpdate } = props;

  const handleTextFieldFocus = (event) => {
    event.preventDefault();

    if (modal !== null) {
      // If there is already a modal open, close it
      modal.destroy();
      setModal(null);
      event.target.blur();
      return;
    }

    const _modal = showModal(CategorySelectionModal, {
      name: name,
      get: get,
      set: set,
      onConfigUpdate: onConfigUpdate,
    });
    setModal(_modal);
  };

  const _getLabel = () => {
    const length = (get(config) || []).length;
    return `${length} categor${length === 1 ? "y" : "ies"} selected`;
  };

  return (
    <TextFieldTooltip
      variant="filled"
      fullWidth
      tooltip={info}
      label={name}
      value={_getLabel()}
      inputProps={{
        onFocus: handleTextFieldFocus,
      }}
    />
  );
}

export default CategorySelection;
