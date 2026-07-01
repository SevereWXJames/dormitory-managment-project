// import { CommonFrame } from "../../components/common/CommonFrame";
import {LoginPage} from "@/pages/common/LoginPage.tsx";

/**
 * Home page React component, for unauthenticated users.
 *
 * @returns JSX for the home page.
 */
export function HomePage() {
    return (
        <>
            <LoginPage/>
        </>
    );
}

//
// /**
//  * Home page React component, for unauthenticated users.
//  *
//  * @returns JSX for the home page.
//  */
// export function HomePage() {
// 	return (
// 		<>
// 			<CommonFrame commonFrameType="UNAUTHENTICATED">
// 			<main>
// 				<h1>SmartAPT</h1>
// 				<p>Log in to access your building's portal.</p>
// 			</main>
//             </CommonFrame>
// 		</>
// 	);
// }