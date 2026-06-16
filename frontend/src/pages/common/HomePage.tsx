import { Header } from "../../components/common/Header";
import { NavBar } from "../../components/common/NavBar";

/**
 * Home page React component, for unauthenticated users.
 * 
 * @returns JSX for the home page.
 */
export function HomePage() {
	return (
		<>
			<Header userType="UNAUTHENTICATED"/>
			<NavBar userType="UNAUTHENTICATED"/>
			<main>
				<h1>SmartAPT</h1>
				<p>Log in to access your building's portal.</p>
			</main>
		</>
	);
}