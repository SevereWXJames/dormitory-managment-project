import { CommonFrame } from "../../components/common/CommonFrame";

/**
 * Home page React component, for unauthenticated users.
 * 
 * @returns JSX for the home page.
 */
export function HomePage() {
	return (
		<>
			<CommonFrame commonFrameType="UNAUTHENTICATED"></CommonFrame>
			<main>
				<h1>SmartAPT</h1>
				<p>Log in to access your building's portal.</p>
			</main>
		</>
	);
}