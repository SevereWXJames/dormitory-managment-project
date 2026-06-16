import { AppBar, Avatar, Button } from "@mui/material";
import { default as logo } from "../../assets/common/logo.svg";
import type { UserType } from "../../app/types";

import "../../assets/common/common.css";

type HeaderProps = {userType: UserType};

/**
 * Page header React component.
 * 
 * @param props Element properties: userType.
 * @returns JSX for the page header.
 */
export function Header(props: HeaderProps) {
	const headerUserTypeMessage = (props.userType == "BUILDING_MANAGER") ? "Building manager view" : "";
	const avatar = (props.userType == "UNAUTHENTICATED") ? <Button id="log-in-button" variant="contained">Log in</Button> : <Avatar id="header-avatar"></Avatar>;

	return (
		<AppBar className="header-appbar">
			<img id="header-logo" className="header-logo" src={logo} />
			<div id="header-user-type-message" className="header-user-type">{headerUserTypeMessage}</div>
			{avatar}
		</AppBar>
	);
}