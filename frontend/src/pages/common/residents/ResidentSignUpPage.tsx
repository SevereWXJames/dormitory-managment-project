import {CommonFrame} from "../../../components/common/CommonFrame.tsx";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card.tsx"
import {ResidentSignUpForm} from "@/components/residents/ResidentSignUpForm.tsx";
import {Link} from "react-router-dom";

export function ResidentSignUpPage() {
    return (
        <>
            <CommonFrame commonFrameType="UNAUTHENTICATED">
                <h1>SmartAPT</h1>
                <p>Create a new Resident account</p>
                <main className="sign-page">
                    <Card className="flex flex-col gap-4 p-4 m-4 w-fit mx-auto">
                        <CardTitle className="text-2xl">Sign Up</CardTitle>
                        <CardContent className="flex flex-col gap-4">
                            <ResidentSignUpForm/>
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