import {CommonFrame} from "../../components/common/CommonFrame";
import {LoginForm} from "../../components/common/LoginForm";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"

export function LoginPage() {
    return (
        <>
            <CommonFrame commonFrameType="LOGIN">
            <main className="login-page">
                <Card className="flex flex-col gap-4 p-4 m-4 w-fit mx-auto">
                    <CardTitle className="text-2xl">Log in</CardTitle>
                    <CardContent className="flex flex-col gap-4">
                        <LoginForm/>
                    </CardContent>
                </Card>
            </main>
            </CommonFrame>
        </>
    )
}