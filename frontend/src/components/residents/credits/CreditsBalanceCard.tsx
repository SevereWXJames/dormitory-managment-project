import { Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import { getCreditsString } from "../../../context/residents/creditsSlice";

/**
 * React components for the Credits display.
 * 
 * @returns JSX for the Credits card.
 */
export function CreditsBalanceCard() {
	const credits = useSelector(getCreditsString);

	return (
		<Card id="credits-balance-card" className="card top">
			<CardContent id="credits-balance-card-content" sx={{fontSize: 'x-large'}}>
				{credits}
			</CardContent>
		</Card>
	);
}