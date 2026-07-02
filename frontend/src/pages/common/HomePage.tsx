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