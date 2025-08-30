import * as React from "react";
import { Box, Typography, Stack } from "@mui/material";
import SearchDrawer from "../drawer/SearchDrawer";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { SmnkErrorBoundary, theme } from "@/pages/_app";

export default function SearchBox() {
  const [value, setValue] = React.useState("Homes");
  const [open, setOpen] = React.useState(false);
  return (
    <SmnkErrorBoundary>
      <Box
        sx={{ minWidth: 500, maxWidth: "100%" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <SearchDrawer searchOption={value} />
        {/* <List>
          <ListItemButton
            sx={{ ml: 0 }}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <ListItemText
              primary={<Typography variant="body2">Home</Typography>}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              display={open ? "block" : "none"}
              bgcolor="whitesmoke"
              minWidth={150}
              position={"absolute"}
              left={15}
              top={50}
              zIndex={99}
              color={theme.rent[1200]}
            >
              <ListItemButton
                onClick={(event) => {
                  setValue("Homes");
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">All homes</Typography>}
                />
              </ListItemButton>
              <ListItemButton
                onClick={(event) => {
                  setValue("Homes");
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary={<Typography variant="body2">Categories</Typography>}
                />
              </ListItemButton>
            </Box>
          </Collapse>
        </List> */}
      </Box>
    </SmnkErrorBoundary>
  );
}
