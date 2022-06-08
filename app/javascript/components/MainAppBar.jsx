import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LoginForm from "./LoginForm";
import { Favorite } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));

/*
 * props: {
 *   onLogin: callback({
 *     token: string,
 *     role: admin | user | "",
 *   }),
 *   onLogout: callback(),
 *   onFavorite: callback(),
 *   authToken: string
 * }
 */

export default function PrimarySearchAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState(null);

  const isLoginDialogOpen = Boolean(anchorEl);

  const handleLoginDialogOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleFavoriteList = (e) => {
    if (props.onFavoriteList) {
      props.onFavoriteList()
    }
  }

  const handleLogoClick = (e) => {
    if (props.onLogoClick) {
      props.onLogoClick()
    }
  }

  const handleLogin = (user, pass) => {
    let data = {email: user, password: pass};
    let opt = {method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json"}};
    fetch('/api/v1/users/sign_in', opt).then((res) => {
      res.json().then((data) => {
        if (props.onLogin) {
          props.onLogin(data);
        }
        setAnchorEl(null);
      }).catch((reason) => {
        // TODO show alert
      });
    });
  }

  const handleLogout = () => {
    // 'cuz API is stateless, clear token data instead of delete session
    if (props.onLogout) {
      props.onLogout();
    }
  }

  const handleLoginFormClose = () => {
    setAnchorEl(null);
  }

  const menuId = "primary-search-account-menu";
  const renderLoginForm = (
    <LoginForm open={isLoginDialogOpen} onSubmit={handleLogin} onClose={handleLoginFormClose} />
  );

  const renderDrawerIcon = (
    <IconButton
    size="large"
    edge="start"
    color="inherit"
    aria-label="open drawer"
    sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
  )

  const renderLogo = (
    <Typography
    variant="h6"
    noWrap
    component="div"
    onClick={handleLogoClick}
    sx={{ display: { xs: "none", sm: "block" } }}
    >
      UrBetterHouse
    </Typography>
  )

  const renderSearchBar = (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  )

  const renderAccountIcon = (
    <Box sx={{ display: { xs: "flex" } }}>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={props.authToken ? handleLogout : handleLoginDialogOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </Box>
  )

  const renderFavoriteListIcon = (
    <Box sx={{ display: { xs: "flex" } }}>
      <IconButton
        size="large"
        edge="end"
        aria-label="favorite list by me"
        onClick={props.authToken ? handleFavoriteList : handleLoginDialogOpen}
        color="inherit"
      >
        <Favorite />
      </IconButton>
    </Box>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={props.role == "admin" ? "secondary" : "primary"}>
        <Toolbar>
          {renderDrawerIcon}
          {renderLogo}
          {renderSearchBar}

          <Box sx={{ flexGrow: 1 }} />

          {props.authToken ? "(User Logged In)" : "(Logged Out)"}
          {renderFavoriteListIcon}
          {renderAccountIcon}
        </Toolbar>
      </AppBar>
      {renderLoginForm}
    </Box>
  );
}
