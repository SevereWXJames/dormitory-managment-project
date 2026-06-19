import { Card, CardContent, CardHeader } from "@mui/material";
import type { JSX } from "@emotion/react/jsx-runtime";

type NoticeCardProps = {
	title: string,
	children: JSX.Element | string;
}

/**
 * React components for a single notice.
 * 
 * @returns JSX for a notice card.
 */
export function NoticeCard(props: NoticeCardProps) {
	return (
		<Card className="notice-card card">
			<CardHeader className="notice-card-header" title={props.title}></CardHeader>
			<CardContent className="notice-card-content">
				{props.children}
			</CardContent>
		</Card>
	);
}