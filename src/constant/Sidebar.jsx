import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/small_logo.png";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";
function Sidebar(props) {
  const { children } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken.geometry");
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ borderRight: "1px solid black", paddingTop: "20px" }}>
        <Box>
          <img
            src={logo}
            alt="logo"
            style={{ width: "50px", height: "auto" }}
          />
        </Box>
        <Divider />

        <List
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}>
          <Divider />

          {[
            [<RecentActorsIcon />, "Organisation Profile"],
            [<PeopleAltIcon />, "/projects/management"],
            [<LockPersonIcon />, "/create"],
            [<LocalOfferIcon />, "/user/management"],
          ].map((el, index) => (
            <Link
              to={el[1]}
              style={{
                textDecoration: "none",
                color: "black",
              }}>
              <ListItem key={index} disablePadding>
                <Tooltip title={el[1]} placement="right-start">
                  <ListItemButton>{el[0]}</ListItemButton>
                </Tooltip>
              </ListItem>
              <Divider />
            </Link>
          ))}
          <ListItem>
            <ListItemButton>
              <LogoutIcon onClick={handleLogout} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}

export default Sidebar;
