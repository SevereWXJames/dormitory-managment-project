import {CommonFrame} from "@/components/common/CommonFrame.tsx";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card.tsx"
import {Link} from "react-router-dom";
import {SignUpForm} from "@/components/common/Auth/SignUpForm.tsx";
import {Role} from "@/dataTypes/user.ts";

export function AdminSignUpPage() {
    return (
        <>
            <CommonFrame commonFrameType="UNAUTHENTICATED">
                <h1>SmartAPT</h1>
                <p>Create a new Admin account</p>
                <main className="sign-page">
                    <Card className="flex flex-col gap-4 p-4 m-4 w-fit mx-auto">
                        <CardTitle className="text-2xl">Sign Up</CardTitle>
                        <CardContent className="flex flex-col gap-4">
                            <SignUpForm role={Role.ADMIN}/>
                        </CardContent>
                    </Card>
                </main>
                <Link to="/login">
                    Log in as a user
                </Link>
            </CommonFrame>
        </>
    )
}