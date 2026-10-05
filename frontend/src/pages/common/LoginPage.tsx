import {CommonFrame} from "../../components/common/CommonFrame";
import {LoginForm} from "../../components/common/Auth/LoginForm.tsx";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import {Link} from "react-router-dom";
export function LoginPage() {
    return (
        <>
            <CommonFrame commonFrameType="UNAUTHENTICATED">
                <h1>SmartAPT</h1>
                <p>Log in to access your building's portal.</p>
                <main className="login-page">
                    <Card className="flex flex-col gap-4 p-4 m-4 w-fit mx-auto">
                        <CardTitle className="text-2xl">Log in</CardTitle>
                        <CardContent className="flex flex-col gap-4">
                            <LoginForm/>
                        </CardContent>
                        <Link to="/resident-signup">
                            Create a new resident account
                        </Link>
                    </Card>
                </main>
            </CommonFrame>
        </>
    )
}