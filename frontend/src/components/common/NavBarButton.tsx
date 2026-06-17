import { ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

type NavBarButtonProps = {id: string, label: string, to: string};

/**
 * Navigation sidebar button React component.
 * 
 * @param props Properties: id, the id of the ListItemButton element;
 * label, the button's label to be displayed to the user; and href, the link to
 * which the button leads.
 * @returns JSX for a navigation sidebar button.
 */
export function NavBarButton(props: NavBarButtonProps) {
	return (
		<ListItemButton component={Link} id={props.id} className="nav-bar-button" to={props.to}>
			<ListItemText primary={props.label}/>
		</ListItemButton>
	);
}