import { Divider, Drawer, List } from "@mui/material";
import type { UserType } from "../../app/types";
import { NavBarButton } from "./NavBarButton";

type NavBarProps = {userType: UserType};

/**
 * Navigation sidebar React component.
 * 
 * @param props Properties: buttons, a series of NavBarButtons.
 * @returns JSX for the navigation sidebar.
 */
export function NavBar(props: NavBarProps) {
	var buttons = <></>;
	switch (props.userType) {
		case "RESIDENT":
			buttons = <>
				<NavBarButton id="dashboard-nav-bar-button" label="Dashboard" href="#"/>
				<NavBarButton id="facilities-nav-bar-button" label="Facilities" href="#"/>
				<NavBarButton id="maintenance-nav-bar-button" label="Maintenance" href="#"/>
				<NavBarButton id="notices-nav-bar-button" label="Notices" href="#"/>
				<NavBarButton id="credits-nav-bar-button" label="Credits" href="#"/>
				<Divider />
				<NavBarButton id="settings-nav-bar-button" label="Settings" href="#"/>
				<NavBarButton id="help-nav-bar-button" label="Help" href="#"/>
				<NavBarButton id="logout-nav-bar-button" label="Logout" href="#"/>
			</>;
			break;
		case "BUILDING_MANAGER":
			buttons = <>
				<NavBarButton id="dashboard-nav-bar-button" label="Dashboard" href="#"/>
				<NavBarButton id="facilities-nav-bar-button" label="Facilities" href="#"/>
				<NavBarButton id="maintenance-nav-bar-button" label="Maintenance" href="#"/>
				<NavBarButton id="notices-nav-bar-button" label="Notices" href="#"/>
				<NavBarButton id="residents-nav-bar-button" label="Residents" href="#"/>
				<Divider />
				<NavBarButton id="settings-nav-bar-button" label="Settings" href="#"/>
				<NavBarButton id="help-nav-bar-button" label="Help" href="#"/>
				<NavBarButton id="logout-nav-bar-button" label="Logout" href="#"/>
			</>;
			break;
		default:
			buttons = <>
				<NavBarButton id="settings-nav-bar-button" label="Settings" href="#"/>
				<NavBarButton id="help-nav-bar-button" label="Help" href="#"/>
			</>;
	}

	return (
		<Drawer id="nav-bar-drawer">
			<List id="nav-bar-list">
				{buttons}
			</List>
		</Drawer>
	);
}