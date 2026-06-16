import { AppBar, Avatar } from "@mui/material";
import { default as logo } from "../../assets/common/logo.svg";
import type { UserType } from "../../app/types";

type HeaderProps = {userType: UserType};

/**
 * Page header react component.
 * 
 * @param props Element properties: userType.
 * @returns JSX page header.
 */
export function Header(props: HeaderProps) {
	const headerUserTypeMessage = (props.userType == "BUILDING_MANAGER") ? "Building manager view" : "";

	return (
		<AppBar className="header-ppbar">
			<img src={logo} />
			<div className="header-user-type">{headerUserTypeMessage}</div>
			<Avatar></Avatar>
		</AppBar>
	);
}