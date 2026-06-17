import { useState } from "react";
import { Link, Link as RouterLink } from 'react-router-dom';
import type { CommonFrameType } from "../../app/types";
import { AppBar, Avatar, Button, Divider, Drawer, List } from "@mui/material";
import { NavBarButton } from "./NavBarButton";
import logo from "../../assets/common/logo.svg";

type CommonFrameProps = {commonFrameType: CommonFrameType};

/**
 * React component for the “common frame”, consisting of the page header and
 * navigation sidebar common to all pages.
 *
 * @returns JSX for the “common frame”.
 */
export function CommonFrame(props: CommonFrameProps) {
	const headerUserTypeMessage = (props.commonFrameType == "BUILDING_MANAGER") ? "Building manager view" : "";
	const avatar = (props.commonFrameType == "UNAUTHENTICATED") ? <Button id="log-in-button" variant="contained" component={RouterLink} to="/login">Log in</Button> : <Avatar id="header-avatar"></Avatar>;

	const [navBarOpen, setNavBarOpen] = useState(false);

	const toggleNavBar = (openValue: boolean) => () => {
		setNavBarOpen(openValue);
	}

	let buttons;
	switch (props.commonFrameType) {
		case "RESIDENT":
			buttons = <>
				<NavBarButton id="dashboard-nav-bar-button" label="Dashboard" to="/dashboard" />
				<NavBarButton id="facilities-nav-bar-button" label="Facilities" to="/facilities"/>
				<NavBarButton id="maintenance-nav-bar-button" label="Maintenance" to="/maintenance"/>
				<NavBarButton id="notices-nav-bar-button" label="Notices" to="/notices"/>
				<NavBarButton id="credits-nav-bar-button" label="Credits" to="/credits"/>
				<Divider />
				<NavBarButton id="settings-nav-bar-button" label="Settings" to="/settings"/>
				<NavBarButton id="help-nav-bar-button" label="Help" to="/help"/>
				<NavBarButton id="logout-nav-bar-button" label="Logout" to="#"/>
			</>;
			break;
		case "BUILDING_MANAGER":
			buttons = <>
				<NavBarButton id="dashboard-nav-bar-button" label="Dashboard" to="#"/>
				<NavBarButton id="facilities-nav-bar-button" label="Facilities" to="#"/>
				<NavBarButton id="maintenance-nav-bar-button" label="Maintenance" to="#"/>
				<NavBarButton id="notices-nav-bar-button" label="Notices" to="#"/>
				<NavBarButton id="residents-nav-bar-button" label="Residents" to="#"/>
				<Divider />
				<NavBarButton id="settings-nav-bar-button" label="Settings" to="#"/>
				<NavBarButton id="help-nav-bar-button" label="Help" to="#"/>
				<NavBarButton id="logout-nav-bar-button" label="Logout" to="#"/>
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
			<AppBar className="header-appbar" position="sticky" sx={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", padding: "4px" }}>
				<Button id="open-nav-bar-button" variant="contained" onClick={toggleNavBar(true)}>Menu</Button>
				<Link to="/"><img id="header-logo" className="header-logo" src={logo} style={{ height: 48 }}/></Link>
				<div id="header-user-type-message" className="header-user-type" style={{ flex: 1, textAlign: "left" }}>{headerUserTypeMessage}</div>
				{avatar}
			</AppBar>
			<Drawer id="nav-bar-drawer" open={navBarOpen} onClose={toggleNavBar(false)}>
				<List id="nav-bar-list">
					{buttons}
				</List>
			</Drawer>
		</>
	);
}