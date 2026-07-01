import React, {useState} from "react";
import {Link} from 'react-router-dom';
import type {CommonFrameType} from "../../app/types";
import {AppBar, Avatar, Box, Divider, Drawer, IconButton, List} from "@mui/material";
import {NavBarButton} from "./NavBarButton";
import logo from "../../assets/common/logo.svg";
import {LogoutDialog} from "./LogoutDialog.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

type CommonFrameProps = {
    commonFrameType: CommonFrameType,
    children?: React.ReactNode;
};

/**
 * React component for the “common frame”, consisting of the page header and
 * navigation sidebar common to all pages.
 *
 * @returns JSX for the “common frame”.
 */
export function CommonFrame(props: CommonFrameProps) {
    const headerUserTypeMessage = (props.commonFrameType == "BUILDING_MANAGER") ? "Building manager view" : "";
    const avatar = (props.commonFrameType == "UNAUTHENTICATED") ?
        <></> :
        <Avatar id="header-avatar"></Avatar>;
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [mobileOpen, setMobileOpen] = useState(false);
    const toggleDrawer = () => setMobileOpen((prev) => !prev);

    let buttons;
    switch (props.commonFrameType) {
        case "RESIDENT":
            buttons = <>
                <NavBarButton id="dashboard-nav-bar-button" label="Dashboard" to="/dashboard"/>
                <NavBarButton id="facilities-nav-bar-button" label="Facilities" to="/facilities"/>
                <NavBarButton id="maintenance-nav-bar-button" label="Maintenance" to="/maintenance"/>
                <NavBarButton id="notices-nav-bar-button" label="Notices" to="/notices"/>
                <NavBarButton id="credits-nav-bar-button" label="Credits" to="/credits"/>
                <Divider/>
                <NavBarButton id="settings-nav-bar-button" label="Settings" to="/settings"/>
                <NavBarButton id="help-nav-bar-button" label="Help" to="/help"/>
                <NavBarButton id="logout-nav-bar-button" label="Logout" to="#"
                              onClick={() => {
                                  console.log("Dialog opens!");
                                  setLogoutDialogOpen(true)
                              }}/>
            </>;
            break;
        case "BUILDING_MANAGER":
            buttons = <>
                <NavBarButton id="dashboard-nav-bar-button" label="Dashboard" to="/admin/dashboard"/>
                <NavBarButton id="facilities-nav-bar-button" label="Facilities" to="/admin/facilities"/>
                <NavBarButton id="maintenance-nav-bar-button" label="Maintenance" to="/admin/maintenance"/>
                <NavBarButton id="notices-nav-bar-button" label="Notices" to="/admin/notices"/>
                <NavBarButton id="residents-nav-bar-button" label="Residents" to="/admin/residents"/>
                <NavBarButton id="access-codes-nav-bar-button" label="Access Codes" to="/admin/access-codes"/>
                <Divider/>
                <NavBarButton id="settings-nav-bar-button" label="Settings" to="/admin/settings"/>
                <NavBarButton id="help-nav-bar-button" label="Help" to="/admin/help"/>
                <NavBarButton id="logout-nav-bar-button" label="Logout" to="#"
                              onClick={() => {
                                  console.log("Dialog opens!");
                                  setLogoutDialogOpen(true)
                              }}/>
            </>;
            break;
        default:
            buttons = <>
                <NavBarButton id="settings-nav-bar-button" label="Settings" to="#"/>
                <NavBarButton id="help-nav-bar-button" label="Help" to="#"/>
            </>;
    }

    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column", height: "100vh"}}>
            <AppBar className="header-appbar" position="sticky"
                    sx={{display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", padding: "4px"}}>
                {isMobile && (
                    <IconButton id="open-nav-bar-button" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                )}
                <Link to="/"><img id="header-logo" className="header-logo" src={logo} style={{height: 48}}/></Link>
                <div id="header-user-type-message" className="header-user-type"
                     style={{flex: 1, textAlign: "left"}}>{headerUserTypeMessage}</div>
                {avatar}
            </AppBar>
            <Box sx={{display: "flex", flex: 1, overflow: "hidden"}}>
                <Drawer id="nav-bar-drawer"
                        variant={isMobile ? "temporary" : "permanent"}
                        open={isMobile ? mobileOpen : true}
                        onClose={toggleDrawer}
                        sx={{
                    "& .MuiDrawer-paper": {
                        position: isMobile ? "fixed" : "relative", // overlay on mobile, in-flow on desktop
                    },
                }}  >
                    <List id="nav-bar-list">
                        {buttons}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        overflow: "auto",
                        p: 2,
                        transition: theme => theme.transitions.create("margin"),
                    }}
                >
                    {props.children}
                </Box>
            </Box>
            <LogoutDialog
                open={logoutDialogOpen}
                onClose={() => setLogoutDialogOpen(false)}
            />
            </Box>
        </>
    );
}