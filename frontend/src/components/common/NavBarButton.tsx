import { ListItemButton, ListItemText } from "@mui/material";

type NavBarButtonProps = {id: string, label: string, href: string};

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
		<ListItemButton id={props.id} className="nav-bar-button" href={props.href}>
			<ListItemText primary={props.label}/>
		</ListItemButton>
	);
}